import { XYPosition } from "@xyflow/react";
import { FlowFragmentNode, OnFragmentUpdate } from "./flowFragment";

export type ReactFlowUtilsContextData = {
    screenToFlowPosition: (clientPosition: XYPosition, options?: {
        snapToGrid: boolean;
    }) => XYPosition;
    setNodes: React.Dispatch<React.SetStateAction<FlowFragmentNode[]>>
    onFragmentUpdate: OnFragmentUpdate
}
