import { createContext } from "react";
import { ReactFlowUtilsContextData } from "../../types/reactFlowContext";

export const ReactFlowUtilsContext = createContext<ReactFlowUtilsContextData | null>(null);
