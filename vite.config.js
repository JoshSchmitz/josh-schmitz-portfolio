import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: { plugins: [] },
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    assetsInlineLimit: 2048, // never inline any asset — emit all as separate files
  },
});
