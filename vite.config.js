import { fileURLToPath, URL } from 'node:url'
import { visualizer } from "rollup-plugin-visualizer";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    visualizer({
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用,相当于开关在这里
      emitFile: false,
      threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
      file: "stats.html", //分析图生成的文件名
      algorithm: 'gzip',//压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz',
      open:true //如果存在本地服务端口，将在打包后自动展示
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
