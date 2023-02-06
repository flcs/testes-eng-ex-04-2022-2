/// <reference types="vitest" />
// vite.config.ts

import path from 'path'
import { defineConfig } from 'vitest/config';
// import '@testing-library/jest-dom';

export default defineConfig({
    test: {
        globals: true,
        alias: { "@": path.resolve(__dirname, './src') },
    },
})