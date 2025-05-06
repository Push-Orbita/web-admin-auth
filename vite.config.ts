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
      '@': path.resolve(__dirname, './src'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@service': path.resolve(__dirname, './src/service'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@utilities': path.resolve(__dirname, './src/utilities'),
      '@router': path.resolve(__dirname, './src/router'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@langs': path.resolve(__dirname, './src/langs'),
      '@config': path.resolve(__dirname, './src/config'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@assets': path.resolve(__dirname, './src/assets')
    },
  },
});
