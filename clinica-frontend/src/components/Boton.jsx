import "./Boton.css";

export default function Boton({ texto, variante = "primario", onClick, children, disabled }) {
  return (
    <button className={`boton boton-${variante}`} onClick={onClick} disabled={disabled}>
      {children || texto}
    </button>
  );
}