import { useState } from "react";
import "./BuscadorPacientes.css";

export default function BuscadorPacientes({ onFiltrar }) {
  const [texto, setTexto] = useState("");

  function handleChange(e) {
    setTexto(e.target.value);
    onFiltrar(e.target.value);
  }

  function limpiar() {
    setTexto("");
    onFiltrar("");
  }

  return (
    <div className="buscador">
      <input
        placeholder="Buscar por nombre o DNI"
        value={texto}
        onChange={handleChange}
      />
      <button onClick={limpiar}>Limpiar</button>
    </div>
  );
}