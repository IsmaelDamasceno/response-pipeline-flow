import { db } from "../../globals";
import { useEngineProjectStore } from "../../stores/engineProject.store";
import { OpenToggle } from "../../types/openToggle";
import { getFilesRecursively } from "../../utils/getFilesRecursively";
import Dialog from "../layout/dialog";

export function GameObjectReferenceDialog(toggleProps: OpenToggle) {
  const loadedProject = useEngineProjectStore((state) => state.loadedProject);
  const loadProject = useEngineProjectStore((state) => state.loadProject);

  const handleLoadProject = async () => {
    try {
      if (!window.showDirectoryPicker) {
        throw new Error("Directory picker feature not supported");
      }

      const directoryHandle = await window.showDirectoryPicker({
        id: "choose-engine-project-folder",
      });

      db.engineProj.add({ directoryHandle });

      for await (const fileHandle of getFilesRecursively(directoryHandle)) {
        console.log(fileHandle);
      }

      loadProject(directoryHandle);
    } catch (e) {
      console.error("failed to load project:", e);
      alert("Failed to load project");
    }
  };

  return (
    <Dialog {...toggleProps}>
      <div
        className="rounded-xl bg-[#1e1e1e] p-6 "
        style={{
          width: "min(45rem, 90vw)",
          height: "min(30rem, 90vh)",
        }}
      >
        {loadedProject ? (
          <h2>Game Object Reference</h2>
        ) : (
          <div>
            <h2>Game Object No project loaded</h2>
            <button onClick={handleLoadProject} type="button">
              Load project
            </button>
          </div>
        )}
      </div>
    </Dialog>
  );
}
