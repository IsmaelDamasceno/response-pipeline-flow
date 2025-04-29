import { useEngineProjectReference } from "../../hooks/useEngineProjectReference";
import { useEngineProjectStore } from "../../stores/engineProject.store";
import { LoadState } from "../../types/loadState";
import { OpenToggle } from "../../types/openToggle";
import Dialog from "../layout/dialog";

export function GameObjectReferenceDialog(toggleProps: OpenToggle) {
  
  const { loadedProject, handleLoadProject, projectLoadingState } = useEngineProjectReference();

  if (projectLoadingState !== LoadState.READY) {
    <Dialog {...toggleProps}>
      <div
        className="rounded-xl bg-[#1e1e1e] p-6 "
        style={{
          width: "min(45rem, 90vw)",
          height: "min(30rem, 90vh)",
        }}
      >
        <h2>Project is still loading...</h2>
      </div>
    </Dialog> 
  }

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
