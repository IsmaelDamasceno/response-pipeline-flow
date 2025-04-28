import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { FlowFragment } from "../../types/flowFragment";
import { ExpectedOutputselector } from "../form/expectedOutputSelector";
import { DataInputGrid } from "../layout/data-input-grid";
import { EditablePreviewInput } from "../form/editablePreviewInput";
import { MdOutlineEdit } from "react-icons/md";
import { useCallback, useContext } from "react";
import { ReactFlowUtilsContext } from "../../context/react-flow/reactFlow.context";
import { DataPicker } from "../layout/data-picker";
import { IoIosCube } from "react-icons/io";

export function BaseFlowFragment({ data, id }: NodeProps<Node<FlowFragment>>) {
  const { onFragmentUpdate, toggleGameObjectModalReferenceDialog } = useContext(ReactFlowUtilsContext) ?? {};

  const handleNameChange = useCallback(
    (newVal: React.SetStateAction<string>) => {
      if (!onFragmentUpdate) {
        return;
      }

      if (typeof newVal === "function") {
        onFragmentUpdate({ name: newVal(data.name) }, id);
      } else {
        onFragmentUpdate({ name: newVal }, id);
      }
    },
    [onFragmentUpdate, data.name, id]
  );

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div className="base-node-wrapper">
        <div className="base-node-header w-full bg-amber-300 px-3 py-1 text-neutral-950">
          <EditablePreviewInput
            content={data.name}
            setContent={handleNameChange}
            icon={<MdOutlineEdit />}
            nativeProps={{
              input: {
                className: "!bg-yellow-200",
              },
            }}
          />
        </div>
        <div className="base-node-body p-2">
          <DataInputGrid className="p-2 gap-1 ">
            <p>Game Object Reference</p>
            <DataPicker
              content="Unasigned"
              icon={() => <IoIosCube />}
              nativeProps={{
                button: {
                  className: "text-blue-600",
                },
              }}
              onClick={() => toggleGameObjectModalReferenceDialog?.(true)}
            />
            <p>gameObject:</p>
            <input id="text" name="text" className="nodrag" />
            <p>expectedOutput:</p>
            <ExpectedOutputselector />
          </DataInputGrid>
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
