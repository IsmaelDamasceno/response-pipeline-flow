import { ReactNode } from "react";
import { ReactFlowUtilsContext } from "./reactFlow.context";
import { ReactFlowUtilsContextData } from "../../types/reactFlowContext";

interface Props extends ReactFlowUtilsContextData {
  children: ReactNode;
}

export function ReactFlowUtilsProvider({ children, screenToFlowPosition, setNodes, onFragmentUpdate }: Props) {
  return <ReactFlowUtilsContext.Provider value={{ screenToFlowPosition, setNodes, onFragmentUpdate }}>
    {children}
  </ReactFlowUtilsContext.Provider>;
}
