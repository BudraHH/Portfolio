import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // This makes Vite listen on all network interfaces (0.0.0.0)
        port: 5173, // Ensure this is set correctly
    },
    define: {
        'process.env': {},
        global: 'window'
    }
});
