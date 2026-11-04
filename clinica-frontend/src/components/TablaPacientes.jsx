import { useState } from "react";
import "./TablaPacientes.css";
import { eliminarPaciente } from "../services/api";
import Boton from "./Boton";

export default function TablaPacientes({ pacientes, setPacientes }) {
  async function eliminar(id) {
    if (!window.confirm("Eliminar paciente?")) return;
    try {
      await eliminarPaciente(id);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert("Error al eliminar");
    }
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>DNI</th><th>Nombres</th><th>Telefono</th><th>Correo</th><th></th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((p) => (
          <tr key={p.id}>
            <td>{p.dni}</td>
            <td>{p.nombres}</td>
            <td>{p.telefono}</td>
            <td>{p.correo}</td>
            <td>
              <Boton texto="Eliminar" variante="peligro" onClick={() => eliminar(p.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}