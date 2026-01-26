/**
 * Font Theme Loader Hook
 * Manages dynamic font loading and application for typography themes
 */

import { useEffect, useState, useCallback } from 'react';
import type { FontTheme } from '@sage/tokens';
import {
  getFontThemeFamilies,
  markFontsAsLoaded,
  areFontsLoaded,
  isSystemFont,
  getFontVariable,
} from '../lib/fonts-dynamic';

export type FontLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface UseFontThemeLoaderOptions {
  /**
   * Whether to auto-apply fonts to the document
   * @default true
   */
  autoApply?: boolean;

  /**
   * CSS selector for the element to apply fonts to
   * @default ':root'
   */
  targetSelector?: string;

  /**
   * Callback when fonts finish loading
   */
  onLoaded?: () => void;

  /**
   * Callback when fonts fail to load
   */
  onError?: (error: Error) => void;
}

interface UseFontThemeLoaderResult {
  /**
   * Current loading status
   */
  status: FontLoadingStatus;

  /**
   * Whether fonts are currently loading
   */
  isLoading: boolean;

  /**
   * Whether fonts have loaded successfully
   */
  isLoaded: boolean;

  /**
   * Error if loading failed
   */
  error: Error | null;

  /**
   * Apply the font theme to the target element
   */
  applyFontTheme: () => void;

  /**
   * Reset fonts to defaults
   */
  resetFonts: () => void;
}

/**
 * Hook to load and apply font themes dynamically
 *
 * @example
 * ```tsx
 * const { status, applyFontTheme } = useFontThemeLoader(fontTheme);
 *
 * useEffect(() => {
 *   if (status === 'loaded') {
 *     console.log('Fonts ready!');
 *   }
 * }, [status]);
 * ```
 */
export function useFontThemeLoader(
  fontTheme: FontTheme | null,
  options: UseFontThemeLoaderOptions = {}
): UseFontThemeLoaderResult {
  const {
    autoApply = true,
    targetSelector = ':root',
    onLoaded,
    onError,
  } = options;

  const [status, setStatus] = useState<FontLoadingStatus>('idle');
  const [error, setError] = useState<Error | null>(null);

  /**
   * Apply font theme CSS variables to target element
   */
  const applyFontTheme = useCallback(() => {
    if (!fontTheme) return;

    try {
      const target = document.querySelector(targetSelector);
      if (!target) {
        throw new Error(`Target element "${targetSelector}" not found`);
      }

      // Get CSS font-family values
      const headingFamily = getFontVariable(fontTheme.heading);
      const bodyFamily = getFontVariable(fontTheme.body);
      const monoFamily = getFontVariable(fontTheme.mono);

      // Apply CSS variables
      const element = target as HTMLElement;
      element.style.setProperty('--font-heading', headingFamily);
      element.style.setProperty('--font-body', bodyFamily);
      element.style.setProperty('--font-mono', monoFamily);

      // Apply weights if specified
      if (fontTheme.headingWeight) {
        element.style.setProperty('--font-heading-weight', fontTheme.headingWeight);
      }
      if (fontTheme.bodyWeight) {
        element.style.setProperty('--font-body-weight', fontTheme.bodyWeight);
      }

      // Apply letter spacing if specified
      if (fontTheme.letterSpacing?.heading) {
        element.style.setProperty('--font-heading-letter-spacing', fontTheme.letterSpacing.heading);
      }
      if (fontTheme.letterSpacing?.body) {
        element.style.setProperty('--font-body-letter-spacing', fontTheme.letterSpacing.body);
      }

      // Apply line height if specified
      if (fontTheme.lineHeight?.heading) {
        element.style.setProperty('--font-heading-line-height', fontTheme.lineHeight.heading);
      }
      if (fontTheme.lineHeight?.body) {
        element.style.setProperty('--font-body-line-height', fontTheme.lineHeight.body);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to apply font theme');
      setError(error);
      setStatus('error');
      onError?.(error);
    }
  }, [fontTheme, targetSelector, onError]);

  /**
   * Reset fonts to defaults by removing custom properties
   */
  const resetFonts = useCallback(() => {
    try {
      const target = document.querySelector(targetSelector);
      if (!target) return;

      const element = target as HTMLElement;
      element.style.removeProperty('--font-heading');
      element.style.removeProperty('--font-body');
      element.style.removeProperty('--font-mono');
      element.style.removeProperty('--font-heading-weight');
      element.style.removeProperty('--font-body-weight');
      element.style.removeProperty('--font-heading-letter-spacing');
      element.style.removeProperty('--font-body-letter-spacing');
      element.style.removeProperty('--font-heading-line-height');
      element.style.removeProperty('--font-body-line-height');

      setStatus('idle');
      setError(null);
    } catch (err) {
      console.error('Failed to reset fonts:', err);
    }
  }, [targetSelector]);

  /**
   * Load fonts when font theme changes
   */
  useEffect(() => {
    if (!fontTheme) {
      setStatus('idle');
      return;
    }

    const fontFamilies = getFontThemeFamilies(fontTheme);

    // Check if fonts are already loaded
    if (areFontsLoaded(fontFamilies)) {
      setStatus('loaded');
      if (autoApply) {
        applyFontTheme();
      }
      onLoaded?.();
      return;
    }

    // Start loading
    setStatus('loading');
    setError(null);

    // In Next.js, fonts loaded via next/font/google are automatically available
    // We just need to mark them as loaded and apply them
    const loadFonts = async () => {
      try {
        // Simulate async loading check
        await new Promise(resolve => setTimeout(resolve, 100));

        // Mark fonts as loaded
        const nonSystemFonts = fontFamilies.filter(f => !isSystemFont(f));
        markFontsAsLoaded(nonSystemFonts);

        setStatus('loaded');
        if (autoApply) {
          applyFontTheme();
        }
        onLoaded?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load fonts');
        setError(error);
        setStatus('error');
        onError?.(error);
      }
    };

    loadFonts();
  }, [fontTheme, autoApply, applyFontTheme, onLoaded, onError]);

  return {
    status,
    isLoading: status === 'loading',
    isLoaded: status === 'loaded',
    error,
    applyFontTheme,
    resetFonts,
  };
}

/**
 * Hook to preload fonts for a font theme without applying them
 * Useful for preloading fonts before user selects them
 */
export function usePreloadFontTheme(fontTheme: FontTheme | null): void {
  useEffect(() => {
    if (!fontTheme) return;

    const fontFamilies = getFontThemeFamilies(fontTheme);
    const nonSystemFonts = fontFamilies.filter(f => !isSystemFont(f));

    // Mark as loaded (fonts are loaded via next/font/google at build time)
    markFontsAsLoaded(nonSystemFonts);
  }, [fontTheme]);
}
