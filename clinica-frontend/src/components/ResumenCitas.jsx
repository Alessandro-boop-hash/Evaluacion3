export default function ResumenCitas({ citas }) {
  const resumen = {};
  citas.forEach((c) => {
    const nombre = c.estado_nombre || "sin estado";
    resumen[nombre] = (resumen[nombre] || 0) + 1;
  });
  return (
    <div className="resumen">
      <h3>Resumen por estado</h3>
      <ul>
        {Object.entries(resumen).map(([k, v]) => (
          <li key={k}>{k}: {v}</li>
        ))}
      </ul>
      <p>Total: {citas.length}</p>
    </div>
  );
}