import { create } from 'zustand';

interface SkillFilterStore {
  hoveredCategory: string | null;
  setHoveredCategory: (cat: string | null) => void;
}

export const useSkillFilterStore = create<SkillFilterStore>((set) => ({
  hoveredCategory: null,
  setHoveredCategory: (cat) => set({ hoveredCategory: cat }),
}));
