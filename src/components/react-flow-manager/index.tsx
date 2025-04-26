import { addEdge, Background, BackgroundVariant, Connection, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { ReactFlowUtilsProvider } from "../../context/react-flow/reactFlow.context.provider";
import { NodePanel } from "../node-panel";
import { useCallback, useEffect } from "react";
import { NodeTypes } from "../../types/nodeTypes";
import { FlowFragmentNode, OnFragmentUpdate } from "../../types/flowFragment";
import { BaseFlowFragment } from "../nodes/baseFragment.node";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = {
  [NodeTypes.BaseFlowFragment]: BaseFlowFragment,
};

export function ReactFlowManager() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowFragmentNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { screenToFlowPosition } = useReactFlow();

  const handleFragmentUpdate: OnFragmentUpdate = useCallback(
    (data, nodeid) => {
      setNodes((n) => {
        const newNodeList = n.slice();
        const fragmentIndex = newNodeList.findIndex(
          (node) => node.id === nodeid
        );
        if (fragmentIndex === -1) {
          console.error("Trying to update target not present in list:", {
            list: n,
            nodeid,
            data,
          });
          return n;
        }

        const fragment = newNodeList[fragmentIndex];
        newNodeList[fragmentIndex] = {
          ...fragment,
          data: { ...fragment.data, ...data },
        };

        return newNodeList;
      });
    },
    [setNodes]
  );

  useEffect(() => {
    setNodes([
      {
        id: "1",
        position: { x: 0, y: 100 },
        type: NodeTypes.BaseFlowFragment,
        data: {
          name: "Rogers",
          expect: "bool",
          gameObject: "<Inspector>",
        },
      },
    ]);
  }, [setNodes, handleFragmentUpdate]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowUtilsProvider
      screenToFlowPosition={screenToFlowPosition}
      setNodes={setNodes}
      onFragmentUpdate={handleFragmentUpdate}
    >
      <div className="w-full h-full overflow-hidden relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          colorMode="dark"
          id="react-flow-root"
        >
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
        </ReactFlow>
        <NodePanel />
      </div>
    </ReactFlowUtilsProvider>
  );
}
