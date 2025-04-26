import { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { PanelItem } from "./panel-item";

export function NodePanel() {
  const [open, setOpen] = useState(true);

  const Icon = open ? BiRightArrow : BiLeftArrow;

  return (
    <div
      className={`node-panel unselectable flex flex-col absolute right-0 top-0 h-full p-5 min-w-3/12 transition-all`}
      id="node-panel"
      style={{
        transform: `translateX(${open ? '0' : '100%'})`
      }}
    >
      <button
        type="button"
        className="node-panel node-panel-toggle rounded-s-2xl absolute left-0 transform-[translateX(-100%)] p-3 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Icon size="1.5rem" />
      </button>
      <div className="node-panel node-panel-content">
        <h1 className="text-center w-full">Drag and Drop to add</h1>
        <PanelItem />
      </div>
    </div>
  );
}
