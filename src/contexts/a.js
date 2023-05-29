import { createContext, useContext } from "react";

const funcContext = createContext();

export function FuncProvider({ onRemove, onEdit, children }) {
  return (
    <funcContext.Provider value={{ onRemove, onEdit }}>
      {children}
    </funcContext.Provider>
  );
}

export function useRemove() {
  const context = useContext(funcContext);

  return context.onRemove;
}

export function useEdit() {
  const context = useContext(funcContext);
  return context.onEdit;
}
