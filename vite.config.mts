// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import fs from "node:fs"

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
    }),
    [
      {
        name: 'watch-golang-websocket-routes-files',
        handleHotUpdate({ file }) {
          // websoket.go
          if (file.endsWith("server/router/websoket.go")) {
            const code = fs.readFileSync(file, 'utf8')
            const regex = /WSEventMapper\s*\[\s*("?[\w_]+"?)\s*\]\s*=/g

            const keys = new Set()
            let match

            while ((match = regex.exec(code)) !== null) {
              let key = match[1]
              key = key.replace(/^"|"$/g, '') // 去掉引号
              keys.add(key)
            }

            const ts = `
// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
export const WSEvents = ${JSON.stringify([...keys], null, 2)} as const

export type WSEvent = typeof WSEvents[number]
`.trimStart()
            // 3. 写入文件
            const outDir = path.resolve('src/types')
            fs.mkdirSync(outDir, { recursive: true })
            fs.writeFileSync(path.join(outDir, 'ws-events.ts'), ts, 'utf8')
          }
        },
      },
    ],
  ],
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
