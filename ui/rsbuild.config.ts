import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  root: './ui',
  source: {
    entry: {
      index: './main/Main.tsx',
      public: './public/Public.tsx',
    },
    tsconfigPath: './main/tsconfig.json',
  },
  dev: {
    client: {
      port: 4002,
    },
  },
  server: {
    base: '/v2',
    port: 4002,
  },

  plugins: [pluginReact()],
});
