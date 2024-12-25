import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    css: {
      //  The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or 'modern'
          additionalData: `@use "@renderer/styles/element.scss" as *;` // element-plus 修改主题 自动导入
        }
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@main': resolve('src/main')
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // element-plus 自动导入
      AutoImport({
        // 使用预处理样式 不添加将会导致使用ElMessage ElNotification等组件时默认的主题色会覆盖自定义的主题色
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
      }),
      Components({
        // 配置 { importStyle: 'sass' } 使用预处理样式 让 element-plus 修改主题生效
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
      })
    ],
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:8889',
          changeOrigin: true
        }
      }
    }
  }
});
