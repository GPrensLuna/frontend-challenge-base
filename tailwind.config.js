/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      lightBackground: '#F9F9F9', // Fondo del panel
      lightPanel: '#FFFFFF', // Panel claro
      lightTitle: '#FF6600', // Título claro (más oscuro)
      lightSubtitle: '#7A4A28', // Subtítulo claro (más oscuro)
      lightText: '#333333', // Texto normal
      lightButton: '#F79950', // Botón claro (más oscuro)
      lightBorder: '#FF6600', // Botón claro (más oscuro)
      lightNavBar: '#FF6600', // Botón claro (más oscuro)
      lightButtonHover: '#FF6600', // Hover del botón claro

      // Colores del modo oscuro
      darkBackground: '#121212', // Fondo oscuro
      darkPanel: '#1E1E1E', // Panel oscuro
      darkTitle: '#FF6600', // Título oscuro (más claro)
      darkSubtitle: '#FFB74D', // Subtítulo oscuro
      darkText: '#E0E0E0', // Texto oscuro
      darkNavBar: '#F79950', // Texto oscuro
      darkButton: '#FF6600', // Botón oscuro
      darkBorder: '#f79950', // Botón oscuro
      darkButtonHover: '#F79950', // Hover botón oscuro

      error: '#FF0000',
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

