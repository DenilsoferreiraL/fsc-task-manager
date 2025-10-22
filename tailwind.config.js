/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: {
          // Tons principais — roxo moderno com contraste ideal
          primary: '#7C3AED', // roxo vibrante e moderno
          'primary-hover': '#6D28D9',
          secondary: '#EDE9FE', // lilás suave para fundos

          // Tons neutros — equilibram contraste e legibilidade
          'dark-blue': '#312E81', // azul escuro profundo (substitui o roxo acinzentado)
          'dark-gray': '#6B7280',
          'text-gray': '#9CA3AF',
          'light-gray': '#F3F4F6',
          border: '#E5E7EB',
          white: '#FFFFFF',
          background: '#F9FAFB',

          // Status colors — para tarefas
          success: '#10B981', // verde para concluídas
          process: '#F59E0B', // amarelo para em progresso
          danger: '#EF4444', // vermelho para erro/exclusão
          info: '#3B82F6', // azul para informações
        },
      },
    },
  },
  plugins: [],
}
