import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomizerState {
    motion: number; // 0-10
    prefersReducedMotion: boolean;
    setMotion: (level: number) => void;
    setPrefersReducedMotion: (value: boolean) => void;
}

export const useCustomizer = create<CustomizerState>()(
    persist(
        (set) => ({
            motion: 5,
            prefersReducedMotion: false,
            setMotion: (level) => set({ motion: level }),
            setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
        }),
        {
            name: 'ecosystem-customizer',
        }
    )
);
