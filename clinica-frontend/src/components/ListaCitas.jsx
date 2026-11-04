import ItemCita from "./ItemCita";

export default function ListaCitas({ citas, onSeleccionar }) {
  return (
    <div>
      <h3>Lista de citas</h3>
      <ul className="lista-citas">
        {citas.map((c) => (
          <ItemCita key={c.id} cita={c} onSeleccionar={onSeleccionar} />
        ))}
      </ul>
    </div>
  );
}