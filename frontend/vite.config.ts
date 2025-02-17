import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    rollupOptions: {
        input: {
            index: path.resolve(__dirname, 'index.html'),
            about: path.resolve(__dirname, 'login.html'),
        }, output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: "static/js/[name]-[hash].js",
            assetFileNames: "static/[ext]/name-[hash].[ext]"
        }
    },
  }
})
