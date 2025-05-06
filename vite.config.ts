import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Función para copiar los temas de PrimeReact
const copyPrimeReactThemes = () => {
  const themesDir = path.resolve(__dirname, 'public/themes');
  const sourceDir = path.resolve(__dirname, 'node_modules/primereact/resources/themes');

  // Crear el directorio de temas si no existe
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  // Copiar los temas necesarios
  ['lara-light-blue', 'soho-dark'].forEach(theme => {
    const sourcePath = path.join(sourceDir, theme);
    const targetPath = path.join(themesDir, theme);
    if (fs.existsSync(sourcePath)) {
      fs.cpSync(sourcePath, targetPath, { recursive: true });
    }
  });
};

// Ejecutar la copia de temas
copyPrimeReactThemes();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@constants': path.resolve(__dirname, './src/config/constants'),
      '@context': path.resolve(__dirname, './src/layout/context'),
      '@features': path.resolve(__dirname, './src/features'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@router': path.resolve(__dirname, './src/router'),
      '@styles': path.resolve(__dirname, './src/ui/styles'),
      '@themes': path.resolve(__dirname, './src/ui/themes'),
      '@utilities': path.resolve(__dirname, './src/utilities'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@common': path.resolve(__dirname, './src/common'),
      '@langs': path.resolve(__dirname, './src/langs'),
    },
  },
});
