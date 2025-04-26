import { Node } from "@xyflow/react";
import { NodeTypes } from "./nodeTypes";
import { BaseExpect } from "./baseExpect";

export type FlowFragment = {
    name: string;
    gameObject: string;
    expect: BaseExpect;
};

export type OnFragmentUpdate = (newData: Partial<FlowFragment>, nodeId: string) => void;

export type FlowFragmentNode = Node<FlowFragment, NodeTypes>;
