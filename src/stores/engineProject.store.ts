import { create } from "zustand";
import { Action, State } from "../types/stores/engineProject.store.types";

export const useEngineProjectStore = create<State & Action>((set) => ({
    loadedProject: null,
    loadProject: (project) => set(() => ({ loadedProject: project })),
}));
