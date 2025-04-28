declare global {
    interface Window {
        showDirectoryPicker: ((options?: DirectoryPickerOpts) => Promise<FileSystemDirectoryHandle>) | undefined;
    }
}

export type DirectoryPickerOpts = {
    /**
     * By specifying an ID, the browser can remember different directories for different IDs. If the same ID is used for another picker, the picker opens in the same directory.
     */
    id?: string;
    /**
     * A string that defaults to "read" for read-only access or "readwrite" for read and write access to the directory.
     * @default read
     */
    mode?: 'read' | 'readwrite';

    /**
     * A FileSystemHandle or a well known directory ("desktop", "documents", "downloads", "music", "pictures", or "videos") to open the dialog in.
     */
    startIn?: FileSystemHandle | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos';

}

window.showDirectoryPicker = window.showDirectoryPicker || null;