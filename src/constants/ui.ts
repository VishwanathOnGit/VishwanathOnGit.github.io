/**
 * UI constants and design tokens
 * Centralized values to eliminate primitive obsession
 */

export const COLORS = {
  GRADIENTS: {
    PRIMARY: 'from-blue-600 to-purple-600',
    SECONDARY: 'from-blue-400 to-purple-500',
    ACCENT: 'from-blue-500 to-purple-500',
    SUCCESS: 'from-green-500 to-emerald-500',
    WARNING: 'from-yellow-500 to-orange-500',
    ERROR: 'from-red-500 to-rose-500',
    INFO: 'from-cyan-400 to-blue-500',
    COSMIC: 'from-slate-900 via-purple-900 to-slate-900',
    BACKGROUND_LIGHT: 'from-slate-50 via-blue-50/30 to-indigo-50',
    BACKGROUND_DARK: 'from-slate-900 via-slate-800 to-indigo-950',
  },
  SHADOWS: {
    GLOW_BLUE: '0 0 30px rgba(59, 130, 246, 0.3)',
    GLOW_PURPLE: '0 0 30px rgba(168, 85, 247, 0.3)',
    CARD: '0 10px 25px rgba(0, 0, 0, 0.1)',
    ELEVATED: '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
} as const;

export const SPACING = {
  CONTAINER_PADDING: 'px-4 sm:px-6 lg:px-8',
  SECTION_PADDING: 'py-20',
  CARD_PADDING: 'p-6',
  BUTTON_PADDING: 'px-6 py-3',
  ICON_PADDING: 'p-2',
} as const;

export const TYPOGRAPHY = {
  SIZES: {
    HERO_TITLE: 'text-4xl md:text-5xl lg:text-6xl',
    SECTION_TITLE: 'text-4xl md:text-5xl lg:text-6xl',
    CARD_TITLE: 'text-xl',
    BUTTON_TEXT: 'text-lg',
    BODY: 'text-lg',
    SMALL: 'text-sm',
    TINY: 'text-xs',
  },
  WEIGHTS: {
    NORMAL: 'font-normal',
    MEDIUM: 'font-medium',
    SEMIBOLD: 'font-semibold',
    BOLD: 'font-bold',
  },
} as const;

export const BORDERS = {
  RADIUS: {
    SMALL: 'rounded-lg',
    MEDIUM: 'rounded-xl',
    LARGE: 'rounded-2xl',
    FULL: 'rounded-full',
  },
  WIDTHS: {
    THIN: 'border',
    MEDIUM: 'border-2',
    THICK: 'border-4',
  },
} as const;

export const GRID = {
  LAYOUTS: {
    RESPONSIVE_2: 'grid grid-cols-1 md:grid-cols-2',
    RESPONSIVE_3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    RESPONSIVE_4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    AUTO_FIT: 'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
  },
  GAPS: {
    SMALL: 'gap-4',
    MEDIUM: 'gap-6',
    LARGE: 'gap-8',
    EXTRA_LARGE: 'gap-12',
  },
} as const;

export const FORM = {
  INPUT_CLASSES: 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
  LABEL_CLASSES: 'text-sm font-medium text-gray-700 dark:text-gray-300',
  ERROR_CLASSES: 'text-red-500 text-sm mt-1',
} as const;
