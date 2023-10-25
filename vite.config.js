/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite';

export default defineConfig({
  // Other Vite configurations...

  build: {
    // Set the target to the latest ECMAScript version
    target: 'esnext',
  },

});

