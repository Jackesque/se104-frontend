// import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";
import sveltePreprocess from 'svelte-preprocess';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
  },
  
  // preprocess: [vitePreprocess()],
  preprocess: sveltePreprocess({ 
    postcss: {
      configFilePath: join(__dirname, 'postcss.config.cjs'),
    },
  }),
  onwarn: (warning, handler) => {
    if (warning.code === ('a11y-click-events-have-key-events' || 'a11y-no-static-element-interactions' || 'a11y-autofocus')) return handler(warning);
  },
};

export default config;
