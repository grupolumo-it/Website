/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // primary/15
        input: 'var(--color-input)', // primary/15
        ring: 'var(--color-ring)', // teal-900
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // gray-900
        primary: {
          DEFAULT: 'var(--color-primary)', // teal-900
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // teal-600
          foreground: 'var(--color-secondary-foreground)', // white
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // blue-200
          foreground: 'var(--color-accent-foreground)', // teal-900
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-100
          foreground: 'var(--color-muted-foreground)', // gray-500
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // gray-900
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // gray-900
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-600
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-600
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600
          foreground: 'var(--color-error-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)', // white
        },
        'text-primary': 'var(--color-text-primary)', // gray-900
        'text-secondary': 'var(--color-text-secondary)', // gray-500
      },
      fontFamily: {
        heading: ['Inter Tight', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['IBM Plex Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'heading-1': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-2': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],
        'heading-4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'heading-5': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body-base': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0.025em' }],
      },
      spacing: {
        'xs': 'var(--spacing-xs)', // 8px
        'sm': 'var(--spacing-sm)', // 16px
        'md': 'var(--spacing-md)', // 24px
        'lg': 'var(--spacing-lg)', // 32px
        'xl': 'var(--spacing-xl)', // 48px
        '2xl': 'var(--spacing-2xl)', // 64px
        '3xl': 'var(--spacing-3xl)', // 80px
        '4xl': 'var(--spacing-4xl)', // 96px
      },
      borderRadius: {
        'xs': 'var(--radius-xs)', // 2px
        'sm': 'var(--radius-sm)', // 4px
        'md': 'var(--radius-md)', // 8px
        'lg': 'var(--radius-lg)', // 12px
      },
      boxShadow: {
        'elevation-0': 'var(--shadow-sm)',
        'elevation-1': 'var(--shadow-sm)',
        'elevation-2': 'var(--shadow-md)',
        'elevation-3': 'var(--shadow-lg)',
        'elevation-4': 'var(--shadow-xl)',
        'elevation-5': 'var(--shadow-2xl)',
      },
      transitionDuration: {
        'smooth': '250ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
      },
      zIndex: {
        'base': '0',
        'card': '1',
        'dropdown': '50',
        'navigation': '100',
        'modal': '200',
        'toast': '300',
      },
      maxWidth: {
        'prose': '70ch',
      },
    },
  },
  plugins: [],
}