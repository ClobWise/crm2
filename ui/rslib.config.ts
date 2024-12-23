import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';
import { pluginDts } from 'rsbuild-plugin-dts';

export default defineConfig({
  root: './ui',
  source: {
    entry: {
      index: './lib/**',
    },
    tsconfigPath: './ui/lib/tsconfig.json',
  },
  lib: [
    {
      bundle: false,
      autoExternal: true,
      dts: {
        autoExtension: true,
        abortOnError: false,
        bundle: false,
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
  plugins: [
    pluginReact(),
    pluginDts({
      bundle: false,
    }),
  ],
});
