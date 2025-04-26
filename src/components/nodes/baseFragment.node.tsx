import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { FlowFragment } from "../../types/flowFragment";
import { ExpectedOutputselector } from "../form/expectedOutputSelector";
import { DataInputGrid } from "../layout/dataInputGrid";
import { EditablePreviewInput } from "../form/editablePreviewInput";
import { MdOutlineEdit } from "react-icons/md";

export function BaseFlowFragment({ data, id }: NodeProps<Node<FlowFragment>>) {
  const handleNameChange = (newVal: React.SetStateAction<string>) => {
    if (typeof newVal === "function") {
      data.onFragmentUpdate({ name: newVal(data.name) }, id);
    } else {
      data.onFragmentUpdate({ name: newVal }, id);
    }
  };

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
                className: '!bg-yellow-200'
              }
            }}
          />
        </div>
        <div className="base-node-body p-2">
          <DataInputGrid className="p-2 gap-1">
            <p>gameObject:</p>
            <input
              id="text"
              name="text"
              onChange={(e) =>
                data.onFragmentUpdate({ name: e.target.value }, id)
              }
              className="nodrag"
            />
            <p>expectedOutput:</p>
            <ExpectedOutputselector />
          </DataInputGrid>
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
