import Dexie, { EntityTable } from "dexie";
import { CursorData } from "./types/cursorData";

export const cursorData: CursorData = {
    currentHeld: null,
};

interface EngineProject {
  engineProject: number;
  handle: FileSystemDirectoryHandle;
}

export const db = new Dexie('engine-project-db') as Dexie & {
  engineProj: EntityTable<EngineProject, 'engineProject'>
};
db.version(1).stores({
  engineProj: '++engineProject'
});
