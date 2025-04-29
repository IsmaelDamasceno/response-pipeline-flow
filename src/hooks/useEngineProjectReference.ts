import { useCallback, useEffect } from "react";
import { useEngineProjectStore } from "../stores/engineProject.store";
import { getFilesRecursively } from "../utils/getFilesRecursively";
import { db } from "../globals";

export function useEngineProjectReference() {
    const loadedProject = useEngineProjectStore((state) => state.loadedProject);
    const loadProject = useEngineProjectStore((state) => state.loadProject);

    const handleLoadProject = useCallback(async () => {
        try {
            if (!window.showDirectoryPicker) {
                throw new Error("Directory picker feature not supported");
            }

            const directoryHandle = (await db.engineProj.toCollection().first())?.handle || await window.showDirectoryPicker({
                id: "choose-engine-project-folder",
            });
            db.engineProj.add({ handle: directoryHandle });

            for await (const fileHandle of getFilesRecursively(directoryHandle)) {
                console.log(fileHandle);
            }

            loadProject(directoryHandle);
        } catch (e) {
            console.error("failed to load project:", e);
            alert("Failed to load project");
        }
    }, []);

    useEffect(() => {
        
    }, []);

    return { handleLoadProject, loadedProject }
}
