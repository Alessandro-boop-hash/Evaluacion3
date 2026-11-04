import { useState, useEffect } from "react";
import { getEspecialidades, getMedicos } from "../services/api";
import TarjetaMedico from "./TarjetaMedico";
import "./FiltroEspecialidad.css";

export default function FiltroEspecialidad() {
  const [especialidades, setEspecialidades] = useState([]);
  const [seleccionada, setSeleccionada] = useState("");
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    getEspecialidades().then(setEspecialidades);
  }, []);

  async function handleChange(e) {
    const id = e.target.value;
    setSeleccionada(id);
    if (id) {
      const data = await getMedicos(id);
      setMedicos(data);
    } else {
      setMedicos([]);
    }
  }

  return (
    <div className="filtro-esp">
      <h3>Filtrar medicos por especialidad</h3>
      <select value={seleccionada} onChange={handleChange}>
        <option value="">-- Todas --</option>
        {especialidades.map((e) => (
          <option key={e.id} value={e.id}>{e.nombre}</option>
        ))}
      </select>
      <p>Medicos mostrados: {medicos.length}</p>
      <div className="medicos-grid">
        {medicos.map((m) => {
          const esp = especialidades.find((e) => e.id === m.especialidad);
          return (
            <TarjetaMedico
              key={m.id}
              nombres={m.nombres}
              cmp={m.cmp}
              especialidad={esp ? esp.nombre : m.especialidad}
            />
          );
        })}
      </div>
    </div>
  );
}