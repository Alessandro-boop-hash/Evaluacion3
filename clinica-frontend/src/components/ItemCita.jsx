export default function ItemCita({ cita, onSeleccionar }) {
  return (
    <li className="item-cita">
      <span>
        {cita.fecha} {cita.hora} - {cita.paciente_nombre} con {cita.medico_nombre}
      </span>
      <button onClick={() => onSeleccionar(cita.id)}>Ver detalle</button>
    </li>
  );
}