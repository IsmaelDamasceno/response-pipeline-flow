

export type State = {
    loadedProject: FileSystemDirectoryHandle | null;
}

export type Action = {
    loadProject: (project: State['loadedProject']) => void;
}
