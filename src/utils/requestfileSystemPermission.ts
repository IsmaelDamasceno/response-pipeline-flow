
export async function requestFileSystemPermission(fileHandle: FileSystemHandle, requestModalConfirmation: (resourceName: string) => Promise<boolean>, withWrite = false) {
    const opts: FileSystemHandlePermissionDescriptor | undefined = withWrite ? { mode: 'readwrite' } : undefined;

    try {

        if (!('queryPermission' in fileHandle) || (!('requestPermission' in fileHandle))) {
            throw new Error("FEATURE NOT SUPPORTED");
        }

        if (!fileHandle.queryPermission || !fileHandle.requestPermission) {
            throw new Error("FEATURE NOT SUPPORTED");
        }

        // Check if we already have permission, if so, return true.
        if ((await fileHandle.queryPermission(opts)) === "granted") {
            return true;
        }

        // Request permission to the file, if the user grants permission, return true.
        if ((await fileHandle.requestPermission(opts)) === "granted") {
            return true;
        }

        return false;
    }
    catch(e) {
        console.log("[LOG] CATCH ERROR:", e instanceof Error);
        if (!(e instanceof Error)) {
            return;
        }
        if (e.message.includes("User activation is required")) {
            console.log("[LOG] AWAITING CONFIRM:", fileHandle.name);
            await requestModalConfirmation(fileHandle.name);
            console.log("[LOG] CONFIRMED");
            requestFileSystemPermission(fileHandle, requestModalConfirmation, withWrite);
            return;
        }
        throw e;
    }
}
