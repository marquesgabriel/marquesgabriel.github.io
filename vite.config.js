import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

export default defineConfig(({ mode }) => {
  // .env is gitignored in this repo (it holds real-looking Supabase
  // values locally), so a fresh clone/fork/CI run without it set has no
  // REACT_APP_ADSENSE_PUBLISHER_ID from any source. Without this default,
  // Vite leaves index.html's %REACT_APP_ADSENSE_PUBLISHER_ID% placeholder
  // completely unresolved in the built HTML instead of substituting an
  // empty string - confirmed locally before this fix. deploy.yml still
  // overrides this with the real value via
  // vars.REACT_APP_ADSENSE_PUBLISHER_ID.
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');
  process.env.REACT_APP_ADSENSE_PUBLISHER_ID ??= env.REACT_APP_ADSENSE_PUBLISHER_ID ?? '';

  return {
    plugins: [react()],
    server: {
      port: 3000, // Optional: Match CRA default
      open: true,
    },
    envPrefix: 'REACT_APP_',
    // Exposes package.json's version as a build-time constant (see
    // src/index.tsx, which sets it on window.APP_VERSION) - the app-version-
    // as-global-console-variable convention, standardized across projects.
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    build: {
      outDir: 'build', // CRA's default build output
    },
    test: {
      // Jest-like globals
      globals: true,
      // Environment
      environment: 'jsdom',
      // Include below if you want code coverage
      coverage: {
        provider: 'v8', // or 'istanbul'
        reporter: ['text', 'json', 'html'],
        include: [
          'src/**/*.{ts,tsx}',
          '!src/index.tsx',
          '!src/reportWebVitals.ts',
          '!src/utils/supabase.ts',
          '!src/**/*.d.ts',
        ],
        thresholds: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
      setupFiles: './src/setupTests.ts',
      clearMocks: true,
      mockReset: true,
      restoreMocks: true,
    },
  };
});
