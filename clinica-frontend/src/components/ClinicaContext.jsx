import { createContext, useState } from "react";

export const ClinicaContext = createContext();

export function ClinicaProvider({ children }) {
  const [recepcionista] = useState("Maria Recepcion");
  const [fechaTrabajo] = useState(new Date().toISOString().slice(0, 10));
  return (
    <ClinicaContext.Provider value={{ recepcionista, fechaTrabajo }}>
      {children}
    </ClinicaContext.Provider>
  );
}