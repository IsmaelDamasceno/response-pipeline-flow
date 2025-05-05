
export async function requestFileSystemPermission(fileHandle: FileSystemHandle, requestModalConfirmation: (resourceName: string) => Promise<boolean>, withWrite = false): Promise<boolean> {
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
        if (!(e instanceof DOMException)) {
            return false;
        }
        if (e.message.includes("User activation is required")) {
            const userConfirmedModal = await requestModalConfirmation(fileHandle.name);
            if (!userConfirmedModal) {
                return false;
            }
            const result = await requestFileSystemPermission(fileHandle, requestModalConfirmation, withWrite);
            return result;
        }
        throw e;
        return false;
    }
}
