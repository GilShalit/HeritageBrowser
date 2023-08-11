import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'dns';

// serve dev on "localhost" instead of resolving to 127.0.0.1
dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      'mapbox-gl': 'maplibre-gl'
    }
  },  

  server: {
    open: '/public/index.html',
    proxy: {
      '/api': {
        target: 'https://kimanli7.azurewebsites.net/',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
})