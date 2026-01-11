import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false, // Disabled to unblock Vercel builds - will investigate DTS issue separately
  splitting: false,
  sourcemap: true,
  clean: true,
  banner: {
    js: '"use client";',
  },
});
