/**
 * Curated Font Theme Library
 * Pre-designed, harmonious font pairings for quick customization
 *
 * Philosophy: Provide expert font pairings with clear guidance (constraints),
 * while enabling creative freedom through custom themes. Typography is as
 * crucial to brand identity as color—treat it with systematic rigor.
 */

export interface FontTheme {
  id: string;                      // Unique identifier
  name: string;                     // Display name
  description: string;              // Brief description
  category: FontThemeCategory;      // Categorization

  // Font families
  heading: string;                  // Heading font family (e.g., "Space Grotesk")
  body: string;                     // Body font family
  mono: string;                     // Monospace font family

  // Font weights (optional)
  headingWeight?: string;           // Default weight (e.g., "700")
  bodyWeight?: string;              // Default weight (e.g., "400")

  // Typography settings (optional)
  letterSpacing?: {
    heading?: string;               // e.g., "-0.03em"
    body?: string;                  // e.g., "0"
  };
  lineHeight?: {
    heading?: string;               // e.g., "1.2"
    body?: string;                  // e.g., "1.6"
  };

  // Metadata
  isCustom?: boolean;               // User-created theme
  wcagReadable?: boolean;           // Good for accessibility (readable at small sizes)
  mood?: string[];                  // e.g., ["modern", "clean", "professional"]
  bestFor?: string;                 // e.g., "SaaS products, landing pages"
  pairing?: string;                 // Pairing strategy (e.g., "Serif + Sans", "Mono Everything")

  // Detailed Typography Scale (optional)
  scale?: TypographyScale;          // Full type scale with granular control for all 8 levels
}

export type FontThemeCategory =
  | 'professional'
  | 'creative'
  | 'editorial'
  | 'tech'
  | 'friendly'
  | 'minimal'
  | 'luxury'
  | 'playful'
  | 'custom';

/**
 * Type Level
 * Detailed properties for a single type level (Display, H1, Body, etc.)
 */
export interface TypeLevel {
  fontFamily: string;          // Font family name (e.g., "Inter")
  weight: number;              // Font weight: 300 | 400 | 500 | 600 | 700 | 800
  size: number;                // Font size in pixels (e.g., 48)
  lineHeight: number;          // Line height as unitless number (e.g., 1.2)
  letterSpacing: string;       // Letter spacing in em (e.g., "-0.02em")
}

/**
 * Typography Scale
 * Complete type scale with all 8 levels for granular control
 */
export interface TypographyScale {
  display: TypeLevel;          // Hero text, large headings (96px default)
  h1: TypeLevel;               // Page titles, section headers (64px default)
  h2: TypeLevel;               // Major sections (48px default)
  h3: TypeLevel;               // Subsections (36px default)
  h4: TypeLevel;               // Minor headings (24px default)
  body: TypeLevel;             // Paragraphs, content (16px default)
  small: TypeLevel;            // Captions, metadata (14px default)
  code: TypeLevel;             // Code blocks, monospace (14px default)
}

/**
 * Curated Font Theme Collection
 *
 * Each theme represents a carefully chosen font pairing that works well together.
 * Pairings consider contrast (serif vs sans), readability, mood, and use case.
 */
export const fontThemes: FontTheme[] = [
  // === PROFESSIONAL ===
  {
    id: 'studio',
    name: 'Studio',
    description: 'Professional and balanced, perfect for modern SaaS products',
    category: 'professional',
    heading: 'Outfit',
    body: 'Manrope',
    mono: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.02em', body: '0' },
    lineHeight: { heading: '1.2', body: '1.6' },
    wcagReadable: true,
    mood: ['professional', 'modern', 'clean'],
    bestFor: 'SaaS products, business sites, dashboards',
    pairing: 'Sans + Sans (Geometric + Humanist)',
  },
  {
    id: 'modern-swiss',
    name: 'Modern Swiss',
    description: 'Clean and neutral, maximum readability',
    category: 'professional',
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.02em', body: '0' },
    lineHeight: { heading: '1.2', body: '1.7' },
    wcagReadable: true,
    mood: ['minimal', 'clean', 'modern'],
    bestFor: 'Documentation, dashboards, data-heavy UIs',
    pairing: 'Sans (Single Font)',
  },
  {
    id: 'corporate-authority',
    name: 'Corporate Authority',
    description: 'Classic sans-serif with technical precision',
    category: 'professional',
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto Mono',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.01em', body: '0' },
    lineHeight: { heading: '1.2', body: '1.6' },
    wcagReadable: true,
    mood: ['corporate', 'reliable', 'neutral'],
    bestFor: 'Enterprise software, Google-style products, admin panels',
    pairing: 'Sans (Roboto Family)',
  },

  // === EDITORIAL ===
  {
    id: 'sage',
    name: 'Sage',
    description: 'Elegant serif heading with clean sans body',
    category: 'editorial',
    heading: 'Lora',
    body: 'Instrument Sans',
    mono: 'Fira Code',
    headingWeight: '600',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.01em', body: '0' },
    lineHeight: { heading: '1.3', body: '1.7' },
    wcagReadable: true,
    mood: ['elegant', 'warm', 'organic'],
    bestFor: 'Editorial sites, blogs, portfolios',
    pairing: 'Serif + Sans (Classic Editorial)',
  },
  {
    id: 'editorial-classic',
    name: 'Editorial Classic',
    description: 'Timeless serif pairing for long-form content',
    category: 'editorial',
    heading: 'Playfair Display',
    body: 'Source Sans Pro',
    mono: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '0', body: '0' },
    lineHeight: { heading: '1.2', body: '1.7' },
    wcagReadable: true,
    mood: ['classic', 'elegant', 'readable'],
    bestFor: 'Magazines, blogs, long-form articles',
    pairing: 'Serif + Sans (High Contrast)',
  },
  {
    id: 'literary',
    name: 'Literary',
    description: 'Sophisticated serif pairing for premium content',
    category: 'editorial',
    heading: 'Merriweather',
    body: 'Lato',
    mono: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '0', body: '0' },
    lineHeight: { heading: '1.3', body: '1.7' },
    wcagReadable: true,
    mood: ['sophisticated', 'literary', 'warm'],
    bestFor: 'Publishing, literary journals, premium blogs',
    pairing: 'Serif + Sans (Warm & Readable)',
  },

  // === TECH ===
  {
    id: 'volt',
    name: 'Volt',
    description: 'Bold and electric, one font for everything',
    category: 'tech',
    heading: 'Space Grotesk',
    body: 'Space Grotesk',
    mono: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.03em', body: '0' },
    lineHeight: { heading: '1.2', body: '1.6' },
    wcagReadable: true,
    mood: ['bold', 'modern', 'tech'],
    bestFor: 'Tech startups, developer tools, portfolios',
    pairing: 'Sans (Single Font)',
  },
  {
    id: 'tech-mono',
    name: 'Tech Monospace',
    description: 'Monospace everything, for the hackers',
    category: 'tech',
    heading: 'JetBrains Mono',
    body: 'JetBrains Mono',
    mono: 'JetBrains Mono',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '0', body: '0' },
    lineHeight: { heading: '1.2', body: '1.6' },
    wcagReadable: true,
    mood: ['tech', 'hacker', 'minimal'],
    bestFor: 'Developer tools, coding tutorials, terminal UIs',
    pairing: 'Mono (Single Font)',
  },
  {
    id: 'dev-tools',
    name: 'Dev Tools',
    description: 'GitHub-inspired clean technical aesthetic',
    category: 'tech',
    heading: 'IBM Plex Sans',
    body: 'IBM Plex Sans',
    mono: 'IBM Plex Mono',
    headingWeight: '600',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.01em', body: '0' },
    lineHeight: { heading: '1.2', body: '1.6' },
    wcagReadable: true,
    mood: ['technical', 'precise', 'modern'],
    bestFor: 'Developer platforms, code editors, documentation',
    pairing: 'Sans (IBM Plex Family)',
  },

  // === FRIENDLY ===
  {
    id: 'friendly-rounded',
    name: 'Friendly & Rounded',
    description: 'Approachable and warm, great for consumer apps',
    category: 'friendly',
    heading: 'Quicksand',
    body: 'Open Sans',
    mono: 'Fira Code',
    headingWeight: '600',
    bodyWeight: '400',
    letterSpacing: { heading: '0', body: '0' },
    lineHeight: { heading: '1.3', body: '1.7' },
    wcagReadable: true,
    mood: ['friendly', 'approachable', 'warm'],
    bestFor: 'Consumer apps, education, healthcare',
    pairing: 'Rounded Sans + Humanist Sans',
  },
  {
    id: 'warm-welcome',
    name: 'Warm Welcome',
    description: 'Inviting and accessible for all audiences',
    category: 'friendly',
    heading: 'Nunito',
    body: 'Nunito Sans',
    mono: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.01em', body: '0' },
    lineHeight: { heading: '1.3', body: '1.7' },
    wcagReadable: true,
    mood: ['welcoming', 'friendly', 'accessible'],
    bestFor: 'Community platforms, education, non-profits',
    pairing: 'Rounded Sans (Nunito Family)',
  },

  // === MINIMAL ===
  {
    id: 'minimal-sans',
    name: 'Minimal Sans',
    description: 'Pure simplicity with Work Sans',
    category: 'minimal',
    heading: 'Work Sans',
    body: 'Work Sans',
    mono: 'Fira Code',
    headingWeight: '600',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.02em', body: '0' },
    lineHeight: { heading: '1.2', body: '1.6' },
    wcagReadable: true,
    mood: ['minimal', 'clean', 'efficient'],
    bestFor: 'Minimalist sites, portfolios, agencies',
    pairing: 'Sans (Single Font)',
  },
  {
    id: 'system-ui',
    name: 'System UI',
    description: 'Native system fonts for instant familiarity',
    category: 'minimal',
    heading: 'System UI',
    body: 'System UI',
    mono: 'SF Mono',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.01em', body: '0' },
    lineHeight: { heading: '1.2', body: '1.6' },
    wcagReadable: true,
    mood: ['native', 'fast', 'familiar'],
    bestFor: 'Performance-critical apps, utilities, system tools',
    pairing: 'System Fonts (Zero Load Time)',
  },

  // === LUXURY ===
  {
    id: 'luxury-serif',
    name: 'Luxury Serif',
    description: 'Sophisticated and high-end',
    category: 'luxury',
    heading: 'Cormorant Garamond',
    body: 'Raleway',
    mono: 'Fira Code',
    headingWeight: '600',
    bodyWeight: '300',
    letterSpacing: { heading: '0.02em', body: '0.01em' },
    lineHeight: { heading: '1.3', body: '1.7' },
    wcagReadable: false, // Thinner weights
    mood: ['luxury', 'elegant', 'sophisticated'],
    bestFor: 'Fashion, luxury brands, high-end services',
    pairing: 'Serif + Thin Sans',
  },
  {
    id: 'prestige',
    name: 'Prestige',
    description: 'Refined elegance with Bodoni-inspired display',
    category: 'luxury',
    heading: 'Libre Bodoni',
    body: 'Montserrat',
    mono: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '300',
    letterSpacing: { heading: '0.03em', body: '0.02em' },
    lineHeight: { heading: '1.2', body: '1.7' },
    wcagReadable: false, // Display font + thin weight
    mood: ['prestige', 'refined', 'luxurious'],
    bestFor: 'Luxury fashion, jewelry, premium services',
    pairing: 'Serif Display + Geometric Sans',
  },

  // === CREATIVE ===
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Strong personality with Poppins',
    category: 'creative',
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '-0.01em', body: '0' },
    lineHeight: { heading: '1.2', body: '1.6' },
    wcagReadable: true,
    mood: ['bold', 'creative', 'energetic'],
    bestFor: 'Creative agencies, portfolios, marketing sites',
    pairing: 'Geometric Sans (Single Font)',
  },
  {
    id: 'artistic-flair',
    name: 'Artistic Flair',
    description: 'Expressive serif with modern sans',
    category: 'creative',
    heading: 'Abril Fatface',
    body: 'Work Sans',
    mono: 'Fira Code',
    headingWeight: '400',
    bodyWeight: '400',
    letterSpacing: { heading: '0', body: '0' },
    lineHeight: { heading: '1.1', body: '1.6' },
    wcagReadable: true,
    mood: ['artistic', 'expressive', 'bold'],
    bestFor: 'Art galleries, creative studios, designer portfolios',
    pairing: 'Display Serif + Neutral Sans',
  },

  // === PLAYFUL ===
  {
    id: 'playful-rounded',
    name: 'Playful Rounded',
    description: 'Fun and energetic for youth audiences',
    category: 'playful',
    heading: 'Fredoka',
    body: 'Karla',
    mono: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: { heading: '0', body: '0' },
    lineHeight: { heading: '1.3', body: '1.6' },
    wcagReadable: true,
    mood: ['playful', 'fun', 'youthful'],
    bestFor: 'Kids apps, games, entertainment',
    pairing: 'Rounded Display + Grotesque Sans',
  },
];

/**
 * Get font themes by category
 */
export function getFontThemesByCategory(category: FontThemeCategory): FontTheme[] {
  return fontThemes.filter(ft => ft.category === category);
}

/**
 * Get font themes by mood/tag
 */
export function getFontThemesByMood(mood: string): FontTheme[] {
  return fontThemes.filter(ft =>
    ft.description.toLowerCase().includes(mood.toLowerCase()) ||
    ft.bestFor?.toLowerCase().includes(mood.toLowerCase()) ||
    ft.mood?.some(m => m.toLowerCase().includes(mood.toLowerCase()))
  );
}

/**
 * Search font themes by use case
 */
export function getFontThemesForUseCase(useCase: string): FontTheme[] {
  return fontThemes.filter(ft =>
    ft.bestFor?.toLowerCase().includes(useCase.toLowerCase())
  );
}

/**
 * Get accessible font themes only (WCAG-readable)
 */
export function getAccessibleFontThemes(): FontTheme[] {
  return fontThemes.filter(ft => ft.wcagReadable === true);
}

/**
 * Get font theme by ID
 */
export function getFontThemeById(id: string): FontTheme | undefined {
  return fontThemes.find(ft => ft.id === id);
}

/**
 * Generate a detailed typography scale from a simple FontTheme
 * Uses modular scale (1.25 ratio) for sizes and sensible defaults for other properties
 *
 * @param fontTheme - The simple font theme to generate a scale from
 * @returns TypographyScale with all 8 type levels populated with sensible defaults
 */
export function generateScale(fontTheme: FontTheme): TypographyScale {
  // Parse weights from FontTheme (default to sensible values)
  const headingWeight = parseInt(fontTheme.headingWeight || '700', 10);
  const bodyWeight = parseInt(fontTheme.bodyWeight || '400', 10);

  // Parse letter spacing (default to sensible values)
  const headingLetterSpacing = fontTheme.letterSpacing?.heading || '-0.02em';
  const bodyLetterSpacing = fontTheme.letterSpacing?.body || '0';

  // Parse line height (default to sensible values)
  const headingLineHeight = parseFloat(fontTheme.lineHeight?.heading || '1.2');
  const bodyLineHeight = parseFloat(fontTheme.lineHeight?.body || '1.6');

  return {
    display: {
      fontFamily: fontTheme.heading,
      weight: Math.min(headingWeight + 100, 800), // Slightly bolder for display
      size: 96,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },
    h1: {
      fontFamily: fontTheme.heading,
      weight: headingWeight,
      size: 64,
      lineHeight: headingLineHeight,
      letterSpacing: headingLetterSpacing,
    },
    h2: {
      fontFamily: fontTheme.heading,
      weight: Math.max(headingWeight - 100, 600), // Slightly lighter than H1
      size: 48,
      lineHeight: 1.3,
      letterSpacing: headingLetterSpacing === '-0.02em' ? '-0.01em' : headingLetterSpacing,
    },
    h3: {
      fontFamily: fontTheme.heading,
      weight: Math.max(headingWeight - 100, 600),
      size: 36,
      lineHeight: 1.3,
      letterSpacing: '0',
    },
    h4: {
      fontFamily: fontTheme.heading,
      weight: Math.max(headingWeight - 100, 600),
      size: 24,
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    body: {
      fontFamily: fontTheme.body,
      weight: bodyWeight,
      size: 16,
      lineHeight: bodyLineHeight,
      letterSpacing: bodyLetterSpacing,
    },
    small: {
      fontFamily: fontTheme.body,
      weight: bodyWeight,
      size: 14,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    code: {
      fontFamily: fontTheme.mono,
      weight: 400, // Code is typically regular weight
      size: 14,
      lineHeight: 1.4,
      letterSpacing: '0',
    },
  };
}
