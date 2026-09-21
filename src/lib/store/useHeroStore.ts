import { create } from "zustand";

interface State {
    ready: boolean;
    isReady: () => void;
}

export const useHeroStore = create<State>((set) => ({
    ready: false,
    isReady: () => set({ ready: true })
}));