const BASE_URL = "http://localhost:8000/api/";

export async function getEspecialidades() {
  const res = await fetch(`${BASE_URL}especialidades/`);
  if (!res.ok) throw new Error("Error al cargar especialidades");
  return res.json();
}

export async function getMedicos(especialidadId = null) {
  let url = `${BASE_URL}medicos/`;
  if (especialidadId) url += `?especialidad=${especialidadId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al cargar medicos");
  return res.json();
}

export async function getPacientes() {
  const res = await fetch(`${BASE_URL}pacientes/`);
  if (!res.ok) throw new Error("Error al cargar pacientes");
  return res.json();
}

export async function getCitas() {
  const res = await fetch(`${BASE_URL}citas/`);
  if (!res.ok) throw new Error("Error al cargar citas");
  return res.json();
}

export async function crearCita(data) {
  const res = await fetch(`${BASE_URL}citas/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.detail || JSON.stringify(body);
    throw new Error(msg);
  }
  return body;
}

export async function crearPaciente(data) {
  const res = await fetch(`${BASE_URL}pacientes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(JSON.stringify(body));
  return body;
}

export async function eliminarPaciente(id) {
  const res = await fetch(`${BASE_URL}pacientes/${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar");
  return true;
}

export async function cambiarEstadoCita(id, estadoId) {
  const res = await fetch(`${BASE_URL}citas/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: estadoId }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(JSON.stringify(body));
  return body;
}