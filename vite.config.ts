import vue from '@vitejs/plugin-vue';
import path from "path";
import { defineConfig } from 'vite';
// 加载svg文件
import { svgBuilder } from './src/icons/index';


// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 引用文件使用相对路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  plugins: [svgBuilder('./src/icons/svg/'),vue()]
})
