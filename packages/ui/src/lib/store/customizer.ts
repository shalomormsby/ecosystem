import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { computeDerivedTokens } from '@sage/tokens';
import {
  generateColorScale,
  getOptimalForeground,
} from '../colors';

export type CustomizationMode = 'simple' | 'advanced';

export interface ColorPalette {
  primary: string;                          // Base hex
  primaryForeground: string;                // Calculated contrast
  secondary?: string;                       // Optional secondary color
  secondaryForeground?: string;             // Calculated contrast
  accent?: string;                          // Optional accent color
  accentForeground?: string;                // Calculated contrast
  scale: Record<number, string>;            // 50-900 tints/shades
  derivedTokens: Record<string, string>;    // Computed dependent tokens
}

export interface ColorCustomization {
  mode: CustomizationMode;
  palette: ColorPalette | null;
}

export type ThemeName = 'studio' | 'sage' | 'volt';
export type ColorMode = 'light' | 'dark';

interface CustomizerState {
  // Motion settings
  motion: number; // 0-10
  prefersReducedMotion: boolean;

  // Color customization
  customizationMode: CustomizationMode;
  customColors: {
    [theme in ThemeName]?: {
      [mode in ColorMode]?: ColorPalette;
    };
  };

  // Motion actions
  setMotion: (level: number) => void;
  setPrefersReducedMotion: (value: boolean) => void;

  // Color customization actions
  setCustomizationMode: (mode: CustomizationMode) => void;

  setCustomPrimaryColor: (
    theme: ThemeName,
    mode: ColorMode,
    hexColor: string
  ) => void;

  setCustomSecondaryColor: (
    theme: ThemeName,
    mode: ColorMode,
    hexColor: string
  ) => void;

  setCustomAccentColor: (
    theme: ThemeName,
    mode: ColorMode,
    hexColor: string
  ) => void;

  resetCustomColors: (theme: ThemeName, mode?: ColorMode) => void;

  getActiveColorPalette: (theme: ThemeName, mode: ColorMode) => ColorPalette | null;
}

export const useCustomizer = create<CustomizerState>()(
  persist(
    (set, get) => ({
      motion: 5,
      prefersReducedMotion: false,
      customizationMode: 'simple',
      customColors: {},

      setMotion: (level) => set({ motion: level }),
      setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
      setCustomizationMode: (mode) => set({ customizationMode: mode }),

      setCustomPrimaryColor: (theme, mode, hexColor) => {
        const state = get();
        const currentPalette = state.customColors[theme]?.[mode];

        // Generate complete color palette
        const scale = generateColorScale(hexColor);
        const primaryForeground = getOptimalForeground(hexColor);

        // Compute all derived tokens based on dependency graph
        const derivedTokens = computeDerivedTokens('--color-primary', hexColor, mode);

        // In simple mode, generate secondary/accent from primary
        const isSimple = state.customizationMode === 'simple';

        const palette: ColorPalette = {
          primary: hexColor,
          primaryForeground,
          secondary: isSimple ? undefined : currentPalette?.secondary,
          secondaryForeground: isSimple ? undefined : currentPalette?.secondaryForeground,
          accent: isSimple ? undefined : currentPalette?.accent,
          accentForeground: isSimple ? undefined : currentPalette?.accentForeground,
          scale,
          derivedTokens,
        };

        set((state) => ({
          customColors: {
            ...state.customColors,
            [theme]: {
              ...state.customColors[theme],
              [mode]: palette,
            },
          },
        }));
      },

      setCustomSecondaryColor: (theme, mode, hexColor) => {
        const state = get();
        const currentPalette = state.customColors[theme]?.[mode];

        if (!currentPalette) return;

        const secondaryForeground = getOptimalForeground(hexColor);
        const derivedTokens = computeDerivedTokens('--color-secondary', hexColor, mode);

        set((state) => ({
          customColors: {
            ...state.customColors,
            [theme]: {
              ...state.customColors[theme],
              [mode]: {
                ...currentPalette,
                secondary: hexColor,
                secondaryForeground,
                derivedTokens: {
                  ...currentPalette.derivedTokens,
                  ...derivedTokens,
                },
              },
            },
          },
        }));
      },

      setCustomAccentColor: (theme, mode, hexColor) => {
        const state = get();
        const currentPalette = state.customColors[theme]?.[mode];

        if (!currentPalette) return;

        const accentForeground = getOptimalForeground(hexColor);
        const derivedTokens = computeDerivedTokens('--color-accent', hexColor, mode);

        set((state) => ({
          customColors: {
            ...state.customColors,
            [theme]: {
              ...state.customColors[theme],
              [mode]: {
                ...currentPalette,
                accent: hexColor,
                accentForeground,
                derivedTokens: {
                  ...currentPalette.derivedTokens,
                  ...derivedTokens,
                },
              },
            },
          },
        }));
      },

      resetCustomColors: (theme, mode) => {
        if (mode) {
          // Reset specific mode
          set((state) => ({
            customColors: {
              ...state.customColors,
              [theme]: {
                ...state.customColors[theme],
                [mode]: undefined,
              },
            },
          }));
        } else {
          // Reset entire theme
          set((state) => {
            const { [theme]: _, ...rest } = state.customColors;
            return { customColors: rest };
          });
        }
      },

      getActiveColorPalette: (theme, mode) => {
        return get().customColors[theme]?.[mode] || null;
      },
    }),
    {
      name: 'ecosystem-customizer',
      version: 2,
      partialize: (state) => ({
        motion: state.motion,
        prefersReducedMotion: state.prefersReducedMotion,
        customizationMode: state.customizationMode,
        customColors: state.customColors,
      }),
    }
  )
);
