/**
 * Curated Color Palette Library
 * Pre-designed, accessible color schemes for quick customization
 */

export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  category: PaletteCategory;
  mood: string[];  // Tags like "professional", "energetic", "calm"

  // Core colors
  primary: string;
  secondary?: string;  // Optional, can be auto-derived
  accent: string;

  // Metadata
  inspiration?: string;  // "Inspired by Stripe" or "Ocean sunset"
  bestFor?: string[];   // Use cases: ["SaaS", "Finance", "Marketing"]

  // Accessibility
  wcagAA: boolean;
  wcagAAA: boolean;
}

export type PaletteCategory =
  | 'professional'    // Business, corporate, trustworthy
  | 'creative'        // Design, art, agencies
  | 'nature'          // Organic, earth tones, wellness
  | 'vibrant'         // Bold, energetic, modern
  | 'minimal'         // Monochromatic, subtle
  | 'luxury'          // Premium, sophisticated
  | 'playful';        // Fun, friendly, approachable

/**
 * Curated Palette Collection
 */
export const colorPalettes: ColorPalette[] = [
  // === PROFESSIONAL CATEGORY ===
  {
    id: 'midnight-sapphire',
    name: 'Midnight Sapphire',
    description: 'Deep blue with warm accents for professional trust',
    category: 'professional',
    mood: ['trustworthy', 'corporate', 'stable'],
    primary: '#1a365d',
    accent: '#3182ce',
    inspiration: 'Financial institutions',
    bestFor: ['Finance', 'Legal', 'Enterprise SaaS'],
    wcagAA: true,
    wcagAAA: true,
  },

  {
    id: 'graphite-steel',
    name: 'Graphite Steel',
    description: 'Modern neutrals with subtle color for tech products',
    category: 'professional',
    mood: ['modern', 'technical', 'sophisticated'],
    primary: '#2d3748',
    accent: '#4299e1',
    inspiration: 'Developer tools',
    bestFor: ['Dev Tools', 'Tech Startups', 'Analytics'],
    wcagAA: true,
    wcagAAA: false,
  },

  {
    id: 'obsidian-amber',
    name: 'Obsidian Amber',
    description: 'Black primary with warm gold accents',
    category: 'professional',
    mood: ['premium', 'elegant', 'authoritative'],
    primary: '#000000',
    accent: '#f59e0b',
    inspiration: 'Luxury brands',
    bestFor: ['Luxury', 'Fashion', 'Premium Products'],
    wcagAA: true,
    wcagAAA: true,
  },

  // === CREATIVE CATEGORY ===
  {
    id: 'coral-sunset',
    name: 'Coral Sunset',
    description: 'Warm coral with purple accents for creative energy',
    category: 'creative',
    mood: ['energetic', 'warm', 'inviting'],
    primary: '#ff6b6b',
    accent: '#9f7aea',
    inspiration: 'Design studios',
    bestFor: ['Design Agencies', 'Creative Portfolios', 'Art Platforms'],
    wcagAA: true,
    wcagAAA: false,
  },

  {
    id: 'violet-tangerine',
    name: 'Violet Tangerine',
    description: 'Bold purple with orange contrast for creative punch',
    category: 'creative',
    mood: ['bold', 'creative', 'unique'],
    primary: '#7c3aed',
    accent: '#fb923c',
    inspiration: 'Modern art',
    bestFor: ['Portfolios', 'Events', 'Entertainment'],
    wcagAA: true,
    wcagAAA: false,
  },

  {
    id: 'indigo-rose',
    name: 'Indigo Rose',
    description: 'Deep indigo with rose accents for sophisticated creativity',
    category: 'creative',
    mood: ['sophisticated', 'artistic', 'feminine'],
    primary: '#4c1d95',
    accent: '#ec4899',
    inspiration: 'Fashion & beauty',
    bestFor: ['Beauty', 'Fashion', 'Lifestyle Brands'],
    wcagAA: true,
    wcagAAA: true,
  },

  // === NATURE CATEGORY ===
  {
    id: 'forest-moss',
    name: 'Forest Moss',
    description: 'Deep green with earthy accents for natural calm',
    category: 'nature',
    mood: ['calm', 'organic', 'grounded'],
    primary: '#2f5233',
    accent: '#92703f',
    inspiration: 'Wellness brands',
    bestFor: ['Wellness', 'Sustainability', 'Outdoor'],
    wcagAA: true,
    wcagAAA: true,
  },

  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Teal and aqua for fresh, clean interfaces',
    category: 'nature',
    mood: ['fresh', 'clean', 'tranquil'],
    primary: '#0d9488',
    accent: '#06b6d4',
    inspiration: 'Health & water',
    bestFor: ['Healthcare', 'Clean Tech', 'Water/Ocean'],
    wcagAA: true,
    wcagAAA: false,
  },

  {
    id: 'lavender-sage',
    name: 'Lavender Sage',
    description: 'Soft purple and green for gentle, calming experiences',
    category: 'nature',
    mood: ['gentle', 'soothing', 'mindful'],
    primary: '#8b7fa8',
    accent: '#7a9b7f',
    inspiration: 'Meditation & mindfulness',
    bestFor: ['Meditation', 'Wellness', 'Personal Growth'],
    wcagAA: true,
    wcagAAA: false,
  },

  // === VIBRANT CATEGORY ===
  {
    id: 'electric-neon',
    name: 'Electric Neon',
    description: 'Bright cyan and magenta for high-energy brands',
    category: 'vibrant',
    mood: ['energetic', 'modern', 'bold'],
    primary: '#00d9ff',
    accent: '#ff0080',
    inspiration: 'Gaming & tech',
    bestFor: ['Gaming', 'Music', 'Youth Brands'],
    wcagAA: false,
    wcagAAA: false,
  },

  {
    id: 'lime-punch',
    name: 'Lime Punch',
    description: 'Vibrant lime with electric purple for maximum impact',
    category: 'vibrant',
    mood: ['energetic', 'youthful', 'playful'],
    primary: '#84cc16',
    accent: '#a855f7',
    inspiration: 'Energy drinks',
    bestFor: ['Sports', 'Energy', 'Youth Marketing'],
    wcagAA: false,
    wcagAAA: false,
  },

  {
    id: 'ruby-fire',
    name: 'Ruby Fire',
    description: 'Deep red with orange accents for passion and energy',
    category: 'vibrant',
    mood: ['passionate', 'bold', 'dynamic'],
    primary: '#dc2626',
    accent: '#f97316',
    inspiration: 'Sports & action',
    bestFor: ['Sports', 'Action', 'Emergency Services'],
    wcagAA: true,
    wcagAAA: false,
  },

  // === MINIMAL CATEGORY ===
  {
    id: 'pure-mono',
    name: 'Pure Mono',
    description: 'Classic black and white for timeless elegance',
    category: 'minimal',
    mood: ['timeless', 'elegant', 'focused'],
    primary: '#000000',
    accent: '#ffffff',
    inspiration: 'Apple, minimalist design',
    bestFor: ['Luxury', 'Photography', 'Minimal Apps'],
    wcagAA: true,
    wcagAAA: true,
  },

  {
    id: 'charcoal-cloud',
    name: 'Charcoal Cloud',
    description: 'Soft grays with minimal color for understated design',
    category: 'minimal',
    mood: ['subtle', 'sophisticated', 'quiet'],
    primary: '#52525b',
    accent: '#a1a1aa',
    inspiration: 'Scandinavian design',
    bestFor: ['Minimalist Apps', 'Journals', 'Reading Apps'],
    wcagAA: true,
    wcagAAA: true,
  },

  {
    id: 'slate-whisper',
    name: 'Slate Whisper',
    description: 'Cool slate with subtle blue for quiet sophistication',
    category: 'minimal',
    mood: ['quiet', 'professional', 'refined'],
    primary: '#475569',
    accent: '#64748b',
    inspiration: 'Architecture',
    bestFor: ['Architecture', 'Consulting', 'Editorial'],
    wcagAA: true,
    wcagAAA: true,
  },

  // === LUXURY CATEGORY ===
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    description: 'Deep purple with gold accents for premium experiences',
    category: 'luxury',
    mood: ['premium', 'royal', 'exclusive'],
    primary: '#581c87',
    accent: '#fbbf24',
    inspiration: 'Royal brands',
    bestFor: ['Luxury', 'Premium Services', 'Exclusive Clubs'],
    wcagAA: true,
    wcagAAA: true,
  },

  {
    id: 'champagne-noir',
    name: 'Champagne Noir',
    description: 'Rich black with champagne gold for sophisticated luxury',
    category: 'luxury',
    mood: ['sophisticated', 'elegant', 'exclusive'],
    primary: '#18181b',
    accent: '#d4af37',
    inspiration: 'High-end fashion',
    bestFor: ['Fashion', 'Jewelry', 'Hotels'],
    wcagAA: true,
    wcagAAA: true,
  },

  {
    id: 'emerald-bronze',
    name: 'Emerald Bronze',
    description: 'Deep emerald with bronze accents for rich elegance',
    category: 'luxury',
    mood: ['rich', 'elegant', 'prestigious'],
    primary: '#065f46',
    accent: '#cd7f32',
    inspiration: 'Luxury hotels',
    bestFor: ['Hotels', 'Spas', 'Premium Dining'],
    wcagAA: true,
    wcagAAA: true,
  },

  // === PLAYFUL CATEGORY ===
  {
    id: 'bubblegum-pop',
    name: 'Bubblegum Pop',
    description: 'Soft pink with bright yellow for friendly, fun experiences',
    category: 'playful',
    mood: ['fun', 'friendly', 'cheerful'],
    primary: '#f472b6',
    accent: '#fbbf24',
    inspiration: 'Candy & toys',
    bestFor: ['Kids', 'Toys', 'Fun Apps'],
    wcagAA: false,
    wcagAAA: false,
  },

  {
    id: 'sky-sunshine',
    name: 'Sky Sunshine',
    description: 'Bright blue with sunny yellow for optimistic energy',
    category: 'playful',
    mood: ['optimistic', 'cheerful', 'bright'],
    primary: '#3b82f6',
    accent: '#facc15',
    inspiration: 'Education & learning',
    bestFor: ['Education', 'Kids Apps', 'Social Good'],
    wcagAA: true,
    wcagAAA: false,
  },

  {
    id: 'mint-berry',
    name: 'Mint Berry',
    description: 'Fresh mint with berry accents for playful sweetness',
    category: 'playful',
    mood: ['fresh', 'sweet', 'lighthearted'],
    primary: '#6ee7b7',
    accent: '#db2777',
    inspiration: 'Ice cream & sweets',
    bestFor: ['Food', 'Lifestyle', 'Social Apps'],
    wcagAA: false,
    wcagAAA: false,
  },
];

/**
 * Get palettes by category
 */
export function getPalettesByCategory(category: PaletteCategory): ColorPalette[] {
  return colorPalettes.filter(p => p.category === category);
}

/**
 * Get palettes by mood/tag
 */
export function getPalettesByMood(mood: string): ColorPalette[] {
  return colorPalettes.filter(p => p.mood.includes(mood));
}

/**
 * Search palettes by use case
 */
export function getPalettesForUseCase(useCase: string): ColorPalette[] {
  return colorPalettes.filter(p =>
    p.bestFor?.some(uc => uc.toLowerCase().includes(useCase.toLowerCase()))
  );
}

/**
 * Get accessible palettes only
 */
export function getAccessiblePalettes(level: 'AA' | 'AAA' = 'AA'): ColorPalette[] {
  return colorPalettes.filter(p =>
    level === 'AAA' ? p.wcagAAA : p.wcagAA
  );
}
