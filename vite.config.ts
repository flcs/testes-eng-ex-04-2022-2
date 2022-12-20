/// <reference types="vitest" />
// vite.config.ts

import { defineConfig } from 'vitest/config';
// import '@testing-library/jest-dom';

export default defineConfig({
    test: {
        globals: true,
    },
})