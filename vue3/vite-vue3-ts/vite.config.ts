import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {viteMockServe} from 'vite-plugin-mock'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  css:{},
  esbuild:{},
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src'),
      "apis":path.resolve(__dirname,'src/apis'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
  },
  server:{
    proxy:{
      '/api':{
        target:"https://jsonplaceholder.typicode.com",
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,"")
      }
    }
  },
  // vueCompilerOptions: {
  //   isCustomElement: tag => {
  //     return /^Jsjiajia-/.test(tag)
  //   }
  // },
  plugins: [vue(),vueJsx(),viteMockServe({})]
})

