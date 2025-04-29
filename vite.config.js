import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入Vue相关API，像ref、computed这些都能自动用啦
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
    }),
    // 自动导入Vue组件，Element Plus的组件也能自动导入
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
