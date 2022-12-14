import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind()],
  vite: {
    ssr: {
      noExternal: [
        'node_modules/astro-spa/Spa.astro',
      ],
    }
  }
});