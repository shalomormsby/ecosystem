/**
 * Token Dependency Graph
 * Defines which tokens are computed from other tokens for "change once, ripple everywhere"
 */

import {
  adjustLightness,
  adjustSaturation,
  adjustOpacity,
  rotateHue,
  getOptimalForeground,
} from './color-utils';

export type TokenDerivation = {
  source: string;           // Which token it derives from
  transform: (sourceValue: string) => string;  // How to compute it
  description: string;      // Why this derivation exists
};

/**
 * Primary Color Derivations
 * These tokens automatically update when primary color changes
 */
export const primaryColorDerivations: Record<string, TokenDerivation> = {
  // Links use primary color
  '--color-link': {
    source: '--color-primary',
    transform: (primary) => primary,
    description: 'Links inherit primary brand color',
  },

  // Focus ring uses primary color
  '--color-ring': {
    source: '--color-primary',
    transform: (primary) => primary,
    description: 'Focus rings use primary for brand consistency',
  },

  // Link hover is slightly darker primary
  '--color-link-hover': {
    source: '--color-primary',
    transform: (primary) => adjustLightness(primary, -10),
    description: 'Link hover is 10% darker for visual feedback',
  },

  // Chart primary series
  '--chart-1': {
    source: '--color-primary',
    transform: (primary) => primary,
    description: 'First chart series uses primary',
  },

  // Chart secondary series (lighter tint)
  '--chart-2': {
    source: '--color-primary',
    transform: (primary) => adjustLightness(primary, 20),
    description: 'Second chart series is lighter tint of primary',
  },

  // Chart tertiary series (darker shade)
  '--chart-3': {
    source: '--color-primary',
    transform: (primary) => adjustLightness(primary, -15),
    description: 'Third chart series is darker shade of primary',
  },

  // Chart quaternary (desaturated primary)
  '--chart-4': {
    source: '--color-primary',
    transform: (primary) => adjustSaturation(primary, -30),
    description: 'Fourth chart series is muted primary',
  },

  // Chart quinary (complementary color)
  '--chart-5': {
    source: '--color-primary',
    transform: (primary) => rotateHue(primary, 180),
    description: 'Fifth chart series is complementary to primary',
  },
};

/**
 * Secondary Color Derivations
 * These derive from secondary color
 */
export const secondaryColorDerivations: Record<string, TokenDerivation> = {
  // Hover states
  '--color-hover': {
    source: '--color-secondary',
    transform: (secondary) => secondary,
    description: 'Hover backgrounds use secondary',
  },

  // Active states
  '--color-active': {
    source: '--color-secondary',
    transform: (secondary) => adjustLightness(secondary, -5),
    description: 'Active state is slightly darker secondary',
  },

  // Muted backgrounds
  '--color-muted': {
    source: '--color-secondary',
    transform: (secondary) => secondary,
    description: 'Muted sections use secondary color',
  },
};

/**
 * Accent Color Derivations
 * These derive from accent (used for highlights and CTAs)
 */
export const accentColorDerivations: Record<string, TokenDerivation> = {
  // Info semantic color uses accent
  '--color-info': {
    source: '--color-accent',
    transform: (accent) => accent,
    description: 'Info semantic color uses accent',
  },

  // Info foreground calculated for contrast
  '--color-info-foreground': {
    source: '--color-accent',
    transform: (accent) => getOptimalForeground(accent),
    description: 'Info foreground calculated for contrast',
  },
};

/**
 * Mode-Specific Derivations
 * These need different transforms for light vs dark mode
 */
export const modeSpecificDerivations: Record<string, {
  light: TokenDerivation;
  dark: TokenDerivation;
}> = {
  '--color-primary-muted': {
    light: {
      source: '--color-primary',
      transform: (primary) => adjustLightness(primary, 40),
      description: 'Muted primary for light backgrounds',
    },
    dark: {
      source: '--color-primary',
      transform: (primary) => adjustLightness(primary, -20),
      description: 'Muted primary for dark backgrounds',
    },
  },

  '--color-primary-subtle': {
    light: {
      source: '--color-primary',
      transform: (primary) => adjustOpacity(primary, 0.1),
      description: 'Subtle primary background for light mode',
    },
    dark: {
      source: '--color-primary',
      transform: (primary) => adjustOpacity(primary, 0.2),
      description: 'Subtle primary background for dark mode',
    },
  },
};

/**
 * Complete dependency graph
 */
export const tokenDependencyGraph = {
  primary: primaryColorDerivations,
  secondary: secondaryColorDerivations,
  accent: accentColorDerivations,
  modeSpecific: modeSpecificDerivations,
};

/**
 * Get all tokens that depend on a source token
 */
export function getDependentTokens(sourceToken: string): string[] {
  const dependents: string[] = [];

  Object.entries(primaryColorDerivations).forEach(([token, config]) => {
    if (config.source === sourceToken) {
      dependents.push(token);
    }
  });

  Object.entries(secondaryColorDerivations).forEach(([token, config]) => {
    if (config.source === sourceToken) {
      dependents.push(token);
    }
  });

  Object.entries(accentColorDerivations).forEach(([token, config]) => {
    if (config.source === sourceToken) {
      dependents.push(token);
    }
  });

  return dependents;
}

/**
 * Compute all derived tokens from a source
 */
export function computeDerivedTokens(
  sourceToken: string,
  sourceValue: string,
  mode: 'light' | 'dark'
): Record<string, string> {
  const derived: Record<string, string> = {};

  // Compute from primary derivations
  Object.entries(primaryColorDerivations).forEach(([token, config]) => {
    if (config.source === sourceToken) {
      derived[token] = config.transform(sourceValue);
    }
  });

  // Compute from secondary derivations
  Object.entries(secondaryColorDerivations).forEach(([token, config]) => {
    if (config.source === sourceToken) {
      derived[token] = config.transform(sourceValue);
    }
  });

  // Compute from accent derivations
  Object.entries(accentColorDerivations).forEach(([token, config]) => {
    if (config.source === sourceToken) {
      derived[token] = config.transform(sourceValue);
    }
  });

  // Compute mode-specific derivations
  Object.entries(modeSpecificDerivations).forEach(([token, configs]) => {
    const config = configs[mode];
    if (config.source === sourceToken) {
      derived[token] = config.transform(sourceValue);
    }
  });

  return derived;
}
