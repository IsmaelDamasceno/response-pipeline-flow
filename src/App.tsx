import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback, useEffect } from "react";
import { FlowFragmentNode, OnFragmentUpdate } from "./types/flowFragment";
import { BaseFlowFragment } from "./components/nodes/baseFragment.node";
import { NodeTypes as NodeType } from "./types/nodeTypes";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = {
  [NodeType.BaseFlowFragment]: BaseFlowFragment
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowFragmentNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const handleFragmentUpdate: OnFragmentUpdate = (data, nodeid) => {
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
    };

    setNodes([
      {
        id: "1",
        position: { x: 0, y: 100 },
        type: NodeType.BaseFlowFragment,
        data: {
          name: "Rogers",
          expect: "bool",
          gameObject: "<Inspector>",
          onFragmentUpdate: handleFragmentUpdate
        },
      },
      {
        id: "2",
        position: { x: 0, y: 100 },
        type: NodeType.BaseFlowFragment,
        data: {
          name: "Rogers",
          expect: "bool",
          gameObject: "<Inspector>",
          onFragmentUpdate: handleFragmentUpdate
        },
      },
    ]);
  }, [setNodes]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode="dark"
      >
        <Background color="#ccc" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}

export default App;
