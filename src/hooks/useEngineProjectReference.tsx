import { useCallback, useEffect, useState } from "react";
import { useEngineProjectStore } from "../stores/engineProject.store";
import { getFilesRecursively } from "../utils/getFilesRecursively";
import { db } from "../globals";
import { LoadState } from "../types/loadState";
import { requestFileSystemPermission } from "../utils/requestfileSystemPermission";
import { useConfirmationModal } from "../async-confirm";
import { EngineProjectFolderConfirmDialog } from "../components/engine-project-folder-confirm-dialog";

export function useEngineProjectReference() {

    const [projectLoadingState, setProjectLoadState] = useState<LoadState>(LoadState.LOADING);

    const loadedProject = useEngineProjectStore((state) => state.loadedProject);
    const loadProject = useEngineProjectStore((state) => state.loadProject);

    const { waitConfirmation } = useConfirmationModal<boolean, { handleName: string }>({
        Component: EngineProjectFolderConfirmDialog
    });

    const handleLoadProject = useCallback(async () => {
        try {
            const directoryHandle = await getHandleFromDirectory();
            if (!directoryHandle) {
                throw new Error("Failed to load project: could not get handle from directory");
            }
            loadProject(directoryHandle);
            await handleProcessProject(directoryHandle);
        } catch (e) {
            console.error("failed to load project:", e);
            alert("Failed to load project");
        }
    }, [loadProject]);

    useEffect(() => {
        const initializeProject = async () => {
            try {
                const directoryHandle = await getHandleFromDb();
                if (!directoryHandle) {
                    throw new Error("Failed to load project handle from db");
                }
                if (!(await requestFileSystemPermission(directoryHandle, (handleName) => waitConfirmation({handleName}))))
                loadProject(directoryHandle);
                await handleProcessProject(directoryHandle);
                setProjectLoadState(LoadState.READY);
            }
            catch(e) {
                console.error("Failed to initialize project:", e);
                setProjectLoadState(LoadState.READY);
            }
        };
        initializeProject();
    }, [loadProject, waitConfirmation]);

    return { handleLoadProject, loadedProject, projectLoadingState }
}

const getHandleFromDirectory = async () => {
    if (!window.showDirectoryPicker) {
        return null;
    }

    try {
        const directoryHandle = await window.showDirectoryPicker({
            id: "choose-engine-project-folder",
        });
        db.engineProj.add({ handle: directoryHandle });
        return directoryHandle;
    }
    catch(e) {
        console.error("[LOG] failed to load project from directory:", e);
        return null;
    }
};

const getHandleFromDb = async () => {
    const directoryHandle = (await db.engineProj.toCollection().first())?.handle;
    return directoryHandle ?? null;
};

const handleProcessProject = async (directoryHandle: FileSystemDirectoryHandle) => {
    for await (const fileHandle of getFilesRecursively(directoryHandle)) {
        console.log(fileHandle);
    }
};
