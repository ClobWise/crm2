import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  root: './ui',
  source: {
    entry: {
      library: './ui/lib/Keystone.ts',
    },
    tsconfigPath: './ui/lib/tsconfig.json',
  },
  lib: [
    {
      bundle: true,
      dts: {
        autoExtension: true,
        abortOnError: false,
        bundle: true,
      },
      format: 'esm',
    },
  ],
  output: {
    cleanDistPath: false,
    distPath: {
      root: './keystone/admin/generated',
    },
    target: 'web',
  },
  plugins: [pluginReact()],
});
