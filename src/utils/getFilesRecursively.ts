export async function* getFilesRecursively(entry: FileSystemHandle, currentPath: string = ""): AsyncIterableIterator<{file: File, currentPath: string}> {
  if (entry.kind === "file" && entry instanceof FileSystemFileHandle) {
    const file = await entry.getFile();
    if (file !== null) {
      yield {
        file, currentPath: currentPath || '/'
      };
    }
  } else if (entry.kind === "directory" && entry instanceof FileSystemDirectoryHandle) {
    for await (const handle of entry.values()) {
      console.log("values:", handle);
      yield* getFilesRecursively(handle, handle.kind === 'directory' ? currentPath + `/${handle.name}` : currentPath);
    }
  }
}