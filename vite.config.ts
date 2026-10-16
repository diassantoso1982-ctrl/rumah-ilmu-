import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { handleGenerateMateri, handleGenerateLkpd, handleSahabatChat } from './server/apiHandler';

function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/ai/')) {
          return next();
        }

        try {
          // Read request body
          const chunks: any[] = [];
          for await (const chunk of req) {
            chunks.push(chunk);
          }
          const bodyStr = Buffer.concat(chunks).toString();
          const body = bodyStr ? JSON.parse(bodyStr) : {};

          res.setHeader('Content-Type', 'application/json');

          if (req.url === '/api/ai/generate-materi') {
            const result = await handleGenerateMateri(body);
            res.end(JSON.stringify(result));
            return;
          }

          if (req.url === '/api/ai/generate-lkpd') {
            const result = await handleGenerateLkpd(body);
            res.end(JSON.stringify(result));
            return;
          }

          if (req.url === '/api/ai/chat-sahabat') {
            const result = await handleSahabatChat(body);
            res.end(JSON.stringify(result));
            return;
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Endpoint not found' }));
        } catch (error: any) {
          console.error('API Error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error?.message || 'Server error' }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
