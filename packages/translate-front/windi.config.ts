import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: '640px',
        },
      },
    },
  },
});
