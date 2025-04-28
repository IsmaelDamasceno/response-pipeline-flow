import { ReactNode } from "react";
import { ReactFlowUtilsContext } from "./reactFlow.context";
import { ReactFlowUtilsContextData } from "../../types/reactFlowContext";

interface Props extends ReactFlowUtilsContextData {
  children: ReactNode;
}

export function ReactFlowUtilsProvider({ children, ...dataProps }: Props) {
  return <ReactFlowUtilsContext.Provider value={dataProps}>
    {children}
  </ReactFlowUtilsContext.Provider>;
}
