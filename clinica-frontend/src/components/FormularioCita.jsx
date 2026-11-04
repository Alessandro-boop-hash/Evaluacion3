import { useState, useContext } from "react";
import { ClinicaContext } from "./ClinicaContext";
import { crearCita } from "../services/api";
import "./FormularioCita.css";

export default function FormularioCita({ medicos, pacientes, estados, onCitaCreada }) {
  const { recepcionista, fechaTrabajo } = useContext(ClinicaContext);
  const [form, setForm] = useState({
    paciente: "", medico: "", fecha: "", hora: "", motivo: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const pendiente = estados.find((x) => x.nombre === "pendiente");
    const payload = {
      ...form,
      paciente: Number(form.paciente),
      medico: Number(form.medico),
      estado: pendiente ? pendiente.id : 1,
    };
    try {
      const cita = await crearCita(payload);
      onCitaCreada(cita);
      setForm({ paciente: "", medico: "", fecha: "", hora: "", motivo: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="form-cita" onSubmit={handleSubmit}>
      <h3>Nueva cita (recepcionista: {recepcionista}, fecha trabajo: {fechaTrabajo})</h3>
      <select name="paciente" value={form.paciente} onChange={handleChange} required>
        <option value="">Paciente</option>
        {pacientes.map((p) => <option key={p.id} value={p.id}>{p.nombres}</option>)}
      </select>
      <select name="medico" value={form.medico} onChange={handleChange} required>
        <option value="">Medico</option>
        {medicos.map((m) => <option key={m.id} value={m.id}>{m.nombres}</option>)}
      </select>
      <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
      <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
      <input name="motivo" placeholder="Motivo" value={form.motivo} onChange={handleChange} />
      <button type="submit">Registrar cita</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}