import { create } from 'zustand'

interface StatePet {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
}

export const usePetStore = create<StatePet>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))