import { useContext } from "react";
import { Context } from "./Provider";

export default function useProvider() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useProvider must be used within a Provider");
  }

  return context;
}
