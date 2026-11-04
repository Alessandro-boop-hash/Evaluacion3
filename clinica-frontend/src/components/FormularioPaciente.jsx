import { useState } from "react";
import { crearPaciente } from "../services/api";
import "./FormularioPaciente.css";

export default function FormularioPaciente() {
  const [form, setForm] = useState({
    dni: "", nombres: "", fecha_nacimiento: "", telefono: "", correo: "",
  });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validar() {
    const errs = {};
    if (!/^\d{8}$/.test(form.dni)) errs.dni = "DNI debe tener 8 digitos";
    if (!form.nombres.trim()) errs.nombres = "Nombres obligatorios";
    if (!form.fecha_nacimiento) errs.fecha_nacimiento = "Fecha obligatoria";
    if (!form.correo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      errs.correo = "Correo invalido";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validar();
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      await crearPaciente(form);
      setMensaje("Paciente registrado con exito");
      setForm({ dni: "", nombres: "", fecha_nacimiento: "", telefono: "", correo: "" });
    } catch (err) {
      setMensaje("Error: " + err.message);
    }
  }

  return (
    <form className="form-paciente" onSubmit={handleSubmit}>
      <h3>Registrar paciente</h3>
      <div className="campo">
        <label>DNI</label>
        <input name="dni" value={form.dni} onChange={handleChange} />
        {errores.dni && <span className="error">{errores.dni}</span>}
      </div>
      <div className="campo">
        <label>Nombres</label>
        <input name="nombres" value={form.nombres} onChange={handleChange} />
        {errores.nombres && <span className="error">{errores.nombres}</span>}
      </div>
      <div className="campo">
        <label>Fecha nacimiento</label>
        <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
        {errores.fecha_nacimiento && <span className="error">{errores.fecha_nacimiento}</span>}
      </div>
      <div className="campo">
        <label>Telefono</label>
        <input name="telefono" value={form.telefono} onChange={handleChange} />
      </div>
      <div className="campo">
        <label>Correo</label>
        <input name="correo" value={form.correo} onChange={handleChange} />
        {errores.correo && <span className="error">{errores.correo}</span>}
      </div>
      <button type="submit">Registrar</button>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}