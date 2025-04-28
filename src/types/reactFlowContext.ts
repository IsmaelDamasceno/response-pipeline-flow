import { XYPosition } from "@xyflow/react";
import { FlowFragmentNode, OnFragmentUpdate } from "./flowFragment";
import { Dispatch, SetStateAction } from "react";

export type ReactFlowUtilsContextData = {
    screenToFlowPosition: (clientPosition: XYPosition, options?: {
        snapToGrid: boolean;
    }) => XYPosition;
    setNodes: React.Dispatch<React.SetStateAction<FlowFragmentNode[]>>
    onFragmentUpdate: OnFragmentUpdate;
    toggleGameObjectModalReferenceDialog: Dispatch<SetStateAction<boolean>>;
}
