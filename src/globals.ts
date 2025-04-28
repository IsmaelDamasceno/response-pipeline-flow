import Dexie from "dexie";
import { CursorData } from "./types/cursorData";

export const cursorData: CursorData = {
    currentHeld: null,
};

export const db = new Dexie('engine-project-db');
db.version(1).stores({
  engineProj: '++engineProject'
});
