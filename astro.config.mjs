import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rizzercloud.web.id',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        if (url === 'https://rizzercloud.web.id') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (url === 'https://rizzercloud.web.id/produk') {
          item.changefreq = 'daily';
          item.priority = 0.9;
        } else if (url.startsWith('https://rizzercloud.web.id/produk/')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else if (url.includes('/order')) {
          item.changefreq = 'weekly';
          item.priority = 0.7;
        }
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
