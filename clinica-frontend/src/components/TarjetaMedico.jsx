import "./TarjetaMedico.css";

export default function TarjetaMedico({ nombres, cmp, especialidad, foto }) {
  const img = foto || "https://via.placeholder.com/80?text=Medico";
  return (
    <div className="tarjeta-medico">
      <img src={img} alt={nombres} />
      <h4>{nombres}</h4>
      <p>CMP: {cmp}</p>
      <p>{especialidad}</p>
    </div>
  );
}