/// <reference types="vitest" />
// vite.config.ts

// fix para configuração do alias
/* https://stackoverflow.com/questions/72468249/vitest-src-folder-alias-not-resolved-in-test-files */

import path from 'path'
import { defineConfig } from 'vitest/config';
// import '@testing-library/jest-dom';

export default defineConfig({
    test: {
        globals: true,
        alias: { "@": path.resolve(__dirname, './src') },
    },
})