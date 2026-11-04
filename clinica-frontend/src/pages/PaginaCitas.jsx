import { useState, useEffect } from "react";
import { getCitas, getMedicos, getPacientes } from "../services/api";
import FormularioCita from "../components/FormularioCita";
import ListaCitas from "../components/ListaCitas";
import DetalleCita from "../components/DetalleCita";
import ResumenCitas from "../components/ResumenCitas";

export default function PaginaCitas() {
  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [seleccionadaId, setSeleccionadaId] = useState(null);

  useEffect(() => {
    getCitas().then(setCitas);
    getMedicos().then(setMedicos);
    getPacientes().then(setPacientes);
    fetch("http://localhost:8000/api/estados/").then((r) => r.json()).then(setEstados);
  }, []);

  function onCitaCreada(cita) {
    setCitas((prev) => [...prev, cita]);
  }

  function onSeleccionar(id) {
    setSeleccionadaId(id);
  }

  function onCambiarEstado(actualizada) {
    setCitas((prev) => prev.map((c) => (c.id === actualizada.id ? actualizada : c)));
  }

  const seleccionada = citas.find((c) => c.id === seleccionadaId);

  return (
    <div className="pagina-citas">
      <FormularioCita medicos={medicos} pacientes={pacientes} estados={estados} onCitaCreada={onCitaCreada} />
      <ListaCitas citas={citas} onSeleccionar={onSeleccionar} />
      <DetalleCita cita={seleccionada} estados={estados} onCambiarEstado={onCambiarEstado} />
      <ResumenCitas citas={citas} />
    </div>
  );
}