import { create } from "zustand";

const useRoadmapStore = create((set) => ({
  selectedCategory: null,
  selectedTrack: null,
  activeLayer: null,
  isPanelOpen: false,
  setCategory: (category) =>
    set({
      selectedCategory: category,
      selectedTrack: null,
      activeLayer: null,
      isPanelOpen: false,
    }),

  setTrack: (track) =>
    set({ selectedTrack: track, activeLayer: null, isPanelOpen: false }),

  setActiveLayer: (layer) => set({ activeLayer: layer, isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false }),
  reset: () =>
    set({
      selectedCategory: null,
      selectedTrack: null,
      activeLayer: null,
      isPanelOpen: false,
    }),
}));

export default useRoadmapStore;
