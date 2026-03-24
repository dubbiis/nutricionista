import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@/components': path.resolve(__dirname, 'resources/js/Components'),
            '@/lib': path.resolve(__dirname, 'resources/js/lib'),
            '@/hooks': path.resolve(__dirname, 'resources/js/hooks'),
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
});
