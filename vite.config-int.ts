/// <reference types="vitest" />
// vite.config.ts

import { defineConfig } from 'vitest/config';
// import '@testing-library/jest-dom';

// default => include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
export default defineConfig({
    test: {
        globals: true,
        include: [
            '**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
        ],
    },
})
