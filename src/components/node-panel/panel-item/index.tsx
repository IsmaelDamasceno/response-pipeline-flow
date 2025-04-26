import { useCallback, useContext, useRef, useState } from "react";
import { cursorData } from "../../../globals";
import { IoIosCube } from "react-icons/io";
import { ReactFlowUtilsContext } from "../../../context/react-flow/reactFlow.context";
import { NodeTypes } from "../../../types/nodeTypes";
import { FlowFragmentNode } from "../../../types/flowFragment";

export function PanelItem() {
  const idRef = useRef((Math.random() * 10000).toString());
  const [dragged, setDragged] = useState(false);

  const { screenToFlowPosition, setNodes } =
    useContext(ReactFlowUtilsContext) ?? {};

  const handleDragStart = useCallback(() => {
    cursorData.currentHeld = idRef.current;
    setDragged(true);
  }, []);

  const handleDragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (
        cursorData.currentHeld !== idRef.current ||
        !screenToFlowPosition ||
        !setNodes
      ) {
        console.error("Error: failed to drop node:", e);
        cursorData.currentHeld = null;
        return;
      }

      const dragPanel = (e.target as HTMLElement).closest("#node-panel");
      if (!dragPanel) {
        return;
      }

      setDragged(false);
      cursorData.currentHeld = null;

      const bounds = dragPanel.getBoundingClientRect();
      const isCursorInsidePanelRect =
        e.clientX > bounds.left &&
        e.clientX < bounds.right &&
        e.clientY > bounds.top &&
        e.clientY < bounds.bottom;

      if (isCursorInsidePanelRect) {
        return;
      }

      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });
      const newNode: FlowFragmentNode = {
        id: (Math.random() * 99999).toString(),
        type: NodeTypes.BaseFlowFragment,
        position,
        data: {
          expect: "bool",
          gameObject: "",
          name: "",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    <div
      className="w-full hoverable cursor-pointer flex items-center gap-x-3 h-10 p-3"
      style={{
        opacity: dragged ? "0.5" : "1",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <IoIosCube className="text-blue-600" />
      <p>Base flow node</p>
    </div>
  );
}
