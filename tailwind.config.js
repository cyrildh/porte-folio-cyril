module.exports = {
  enabled: process.env.NODE_ENV === 'production',
  content: [
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D9488', // Teal plus vibrant (contrôle WCAG)
          light: '#5EEAD4',   // Pour les états hover/light
          dark: '#115E59',    // Pour les textes foncés
        },
        secondary: {
          DEFAULT: '#F59E0B', // Orange ambre pour les accents
          light: '#FCD34D',
          dark: '#D97706',
        },
        background: {
          DEFAULT: '#F8FAFC', // Gris bleuté léger
          dark: '#0F172A',    // Pour le dark mode
        },
        surface: {
          DEFAULT: '#FFFFFF', // Arrière-plans composants
          hover: '#F1F5F9',   // États hover
        },
        border: {
          DEFAULT: '#CBD5E1', // Gris neutre
          accent: '#5EEAD4',  // Bordure accent
        },
        text: {
          primary: '#0F172A',   // Gris anthracite
          secondary: '#64748B', // Gris moyen
          accent: '#008573',    // Teal principal
          inverted: '#F8FAFC',  // Pour fonds foncés
        },
        header: {
          DEFAULT: '#F8FAFC', // Background
          hover: '#E2E8F0',   // Gray-200
          text: '#0F172A',    // Text-primary
          border: '#CBD5E1'   // Border
        },
        // Couleurs sémantiques
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      gradientColorStops: {
        'primary-gradient': ['#5EEAD4', '#0D9488'],
        'secondary-gradient': ['#FCD34D', '#F59E0B'],
      },
      keyframes: {
        floatingLeft: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.7' },
          '50%': { transform: 'translateY(-30px) translateX(-30px)', opacity: '0.9' },
        },
        floatingRight: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.7' },
          '50%': { transform: 'translateY(30px) translateX(30px)', opacity: '0.9' },
        },
      },
      animation: {
        'floating-left': 'floatingLeft 8s ease-in-out infinite',
        'floating-right': 'floatingRight 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // ou 'media' selon votre préférence
}