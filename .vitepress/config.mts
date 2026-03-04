import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { VitePressConfig } from '../vitepress.config'
import { createVitePlugins } from '../build/vite/index'
import { createMarkdownPlugins } from '../build/vite/markdown'

const {
  siteConfig,
  themeConfig,
} = VitePressConfig

export default defineConfig({
  ...siteConfig,
  base: '/',
  markdown: {
    lineNumbers: true,
    config: createMarkdownPlugins as any,
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    ...themeConfig,
  },
  vite: {
    plugins: createVitePlugins(),
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./', import.meta.url)) },
        { find: '~', replacement: fileURLToPath(new URL('../', import.meta.url)) },
      ]
    }
  }
})
