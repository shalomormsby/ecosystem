/**
 * Font Loader for Sage Studio
 * Loads documentation fonts, theme fonts, and additional fonts for typography system
 */

import {
  Nunito,
  Nunito_Sans,
  Outfit,
  Manrope,
  Lora,
  Instrument_Sans,
  Space_Grotesk,
  Fira_Code,
  // Additional fonts for typography system
  Inter,
  Roboto,
  Roboto_Mono,
  Open_Sans,
  Lato,
  Montserrat,
  Source_Sans_3,
  Raleway,
  Poppins,
  Work_Sans,
  Playfair_Display,
  Merriweather,
  Quicksand,
  Karla,
  Cormorant_Garamond,
  Libre_Bodoni,
  Abril_Fatface,
  Fredoka,
  JetBrains_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from 'next/font/google';

/**
 * Documentation Fonts (for the docs UI itself)
 */
export const nunito = Nunito({
    subsets: ['latin'],
    variable: '--font-nunito',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});

export const nunitoSans = Nunito_Sans({
    subsets: ['latin'],
    variable: '--font-nunito-sans',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

/**
 * Studio Theme Fonts
 */
export const studioHeading = Outfit({
    subsets: ['latin'],
    variable: '--font-studio-heading',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

export const studioBody = Manrope({
    subsets: ['latin'],
    variable: '--font-studio-body',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

/**
 * Sage Theme Fonts
 */
export const sageHeading = Lora({
    subsets: ['latin'],
    variable: '--font-sage-heading',
    display: 'swap',
    weight: ['400', '600', '700'],
});

export const sageBody = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-sage-body',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

/**
 * Volt Theme Fonts
 */
export const voltHeading = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-volt-heading',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});

/**
 * Monospace (all themes)
 */
export const mono = Fira_Code({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

/**
 * Header Component Fonts
 * Independent of theme fonts - used specifically for Header organism
 */
export const headerFont = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-header',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

/**
 * Typography System Fonts
 * Additional fonts for font theme presets
 */
export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800'],
});

export const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    display: 'swap',
    weight: ['300', '400', '500', '700', '900'],
});

export const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

export const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

export const lato = Lato({
    subsets: ['latin'],
    variable: '--font-lato',
    display: 'swap',
    weight: ['300', '400', '700', '900'],
});

export const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

export const sourceSans3 = Source_Sans_3({
    subsets: ['latin'],
    variable: '--font-source-sans-pro',
    display: 'swap',
    weight: ['300', '400', '600', '700', '900'],
});

export const raleway = Raleway({
    subsets: ['latin'],
    variable: '--font-raleway',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

export const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

export const workSans = Work_Sans({
    subsets: ['latin'],
    variable: '--font-work-sans',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

export const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair-display',
    display: 'swap',
    weight: ['400', '600', '700', '900'],
});

export const merriweather = Merriweather({
    subsets: ['latin'],
    variable: '--font-merriweather',
    display: 'swap',
    weight: ['300', '400', '700', '900'],
});

export const quicksand = Quicksand({
    subsets: ['latin'],
    variable: '--font-quicksand',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});

export const karla = Karla({
    subsets: ['latin'],
    variable: '--font-karla',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

export const cormorantGaramond = Cormorant_Garamond({
    subsets: ['latin'],
    variable: '--font-cormorant-garamond',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});

export const libreBodoni = Libre_Bodoni({
    subsets: ['latin'],
    variable: '--font-libre-bodoni',
    display: 'swap',
    weight: ['400', '600', '700'],
});

export const abrilFatface = Abril_Fatface({
    subsets: ['latin'],
    variable: '--font-abril-fatface',
    display: 'swap',
    weight: ['400'],
});

export const fredoka = Fredoka({
    subsets: ['latin'],
    variable: '--font-fredoka',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});

export const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
    weight: ['400', '500', '600', '700', '800'],
});

export const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    variable: '--font-ibm-plex-sans',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});

export const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    variable: '--font-ibm-plex-mono',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

/**
 * All font variables combined
 * Apply to root HTML element className
 *
 * Note: With 30+ fonts loaded, this may impact initial page load.
 * Consider lazy-loading fonts or using font subsetting in production.
 */
export const allFontVariables = [
    // Core documentation and theme fonts
    nunito.variable,
    nunitoSans.variable,
    studioHeading.variable,
    studioBody.variable,
    sageHeading.variable,
    sageBody.variable,
    voltHeading.variable,
    mono.variable,
    headerFont.variable,
    // Typography system fonts
    inter.variable,
    roboto.variable,
    robotoMono.variable,
    openSans.variable,
    lato.variable,
    montserrat.variable,
    sourceSans3.variable,
    raleway.variable,
    poppins.variable,
    workSans.variable,
    playfairDisplay.variable,
    merriweather.variable,
    quicksand.variable,
    karla.variable,
    cormorantGaramond.variable,
    libreBodoni.variable,
    abrilFatface.variable,
    fredoka.variable,
    jetBrainsMono.variable,
    ibmPlexSans.variable,
    ibmPlexMono.variable,
].join(' ');
