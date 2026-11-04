import { cambiarEstadoCita } from "../services/api";
import Boton from "./Boton";

export default function DetalleCita({ cita, estados, onCambiarEstado }) {
  if (!cita) return <p>Seleccione una cita</p>;

  const esFinal = estados.find((e) => e.id === cita.estado)?.es_final;

  async function patch(nombreEstado) {
    const est = estados.find((e) => e.nombre === nombreEstado);
    if (!est) return;
    try {
      const actualizada = await cambiarEstadoCita(cita.id, est.id);
      onCambiarEstado(actualizada);
    } catch (e) {
      alert("Error al cambiar estado");
    }
  }

  return (
    <div className="detalle">
      <h3>Detalle de cita</h3>
      <p>Paciente: {cita.paciente_nombre}</p>
      <p>Medico: {cita.medico_nombre}</p>
      <p>Especialidad: {cita.especialidad}</p>
      <p>Fecha: {cita.fecha}</p>
      <p>Hora: {cita.hora}</p>
      <p>Motivo: {cita.motivo}</p>
      <p>Estado: {cita.estado_nombre}</p>
      <div className="acciones">
        <Boton texto="Confirmar" onClick={() => patch("confirmada")} disabled={esFinal} />
        <Boton texto="Marcar como atendida" onClick={() => patch("atendida")} disabled={esFinal} />
        <Boton texto="Cancelar" variante="peligro" onClick={() => patch("cancelada")} disabled={esFinal} />
      </div>
    </div>
  );
}