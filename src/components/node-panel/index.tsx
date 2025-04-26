import { useState } from "react";

export function NodePanel() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`node-panel flex flex-col absolute right-0 top-0 h-full p-5 min-w-3/12 transition-all transform-[translateX(${open ? 0 : 100}%)]`}
    >
      <button
        type="button"
        className="node-panel node-panel-toggle absolute left-0 transform-[translateX(-100%)] p-2 cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        +
      </button>
      <div className="node-panel node-panel-content">
        <h1 className="text-center w-full">Drag and Drop to add</h1>
        <p>asfojasfo</p>
        <p>asfojasfo</p>
        <p>asfojasfo</p>
        <p>asfojasfo</p>
      </div>
    </div>
  );
}
