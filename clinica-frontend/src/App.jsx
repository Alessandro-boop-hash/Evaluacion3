import { useState, useEffect } from "react";
import { getEspecialidades, getPacientes } from "./services/api";
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";
import FiltroEspecialidad from "./components/FiltroEspecialidad";
import FormularioPaciente from "./components/FormularioPaciente";
import BuscadorPacientes from "./components/BuscadorPacientes";
import TablaPacientes from "./components/TablaPacientes";
import PaginaCitas from "./pages/PaginaCitas";
import "./App.css";

export default function App() {
  const [especialidades, setEspecialidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);

  useEffect(() => {
    getEspecialidades()
      .then((data) => {
        setEspecialidades(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo conectar con la API");
        setCargando(false);
      });
    getPacientes().then((data) => {
      setPacientes(data);
      setPacientesFiltrados(data);
    });
  }, []);

  function filtrarPacientes(texto) {
    const t = texto.toLowerCase();
    setPacientesFiltrados(
      pacientes.filter(
        (p) => p.nombres.toLowerCase().includes(t) || p.dni.includes(t)
      )
    );
  }

  return (
    <>
      <Encabezado />
      <main className="contenedor">
        <section>
          <h2>Especialidades</h2>
          {cargando && <p>Cargando...</p>}
          {error && <p className="error">{error}</p>}
          {!cargando && !error && (
            <ul>
              {especialidades.map((e) => (
                <li key={e.id}>{e.nombre}</li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2>Pacientes</h2>
          <FormularioPaciente />
          <BuscadorPacientes onFiltrar={filtrarPacientes} />
          <TablaPacientes pacientes={pacientesFiltrados} setPacientes={setPacientes} />
        </section>

        <section>
          <FiltroEspecialidad />
        </section>

        <section>
          <PaginaCitas />
        </section>
      </main>
      <PiePagina />
    </>
  );
}