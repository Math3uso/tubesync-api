import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [tsconfigPaths()],
    test: {
        dir: 'src',
        workspace: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    dir: 'src/services/test'
                }
            },
            {
                extends: true,
                test: {
                    name: 'e2e',
                    dir: './src/http/controllers',
                    environment: './prisma/vitest-environment/test.environment.ts'
                }
            }
        ]
    }
})