import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  root: './ui',
  source: {
    entry: {
      // The key cannot be `index` here. If `index` is used, then
      // rsbuild doesn't respect the `historyApiFallback` configuration.
      main: './main/Main.tsx',
      public: './public/Public.tsx',
    },
    tsconfigPath: './main/tsconfig.json',
  },
  output: {
    cleanDistPath: true,
    distPath: {
      root: '../dist/ui',
    },
  },
  dev: {
    client: {
      port: 4002,
    },
  },
  server: {
    base: '/v2',
    port: 4002,
    strictPort: true,
    historyApiFallback: {
      index: '/main.html',
      verbose: true,
      rewrites: [
        {
          from: /^\/public/,
          to: '/public.html',
        },
      ],
    },
  },

  plugins: [pluginReact()],
});
