import { useContext } from "react";
import { ClinicaContext } from "./ClinicaContext";
import "./Encabezado.css";

export default function Encabezado() {
  const { recepcionista, fechaTrabajo } = useContext(ClinicaContext);
  const hoy = new Date().toLocaleDateString("es-PE");
  return (
    <header className="encabezado">
      <div className="encabezado-logo">Clinica San Gabriel</div>
      <div className="encabezado-info">
        <span>Recepcionista: {recepcionista}</span>
        <span>Fecha de trabajo: {fechaTrabajo}</span>
        <span>Fecha actual: {hoy}</span>
      </div>
    </header>
  );
}