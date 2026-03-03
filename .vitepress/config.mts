import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { SITE } from '../vitepress.config'
import { createVitePlugins } from '../build/vite/index'
import { createMarkdownPlugins } from '../build/vite/markdown'

const {
  lang = 'zh-CN',
  title = 'zeMinng',
  description,
  cleanUrls = true,
  favicon
} = SITE

export default defineConfig({
  lang,
  title,
  description,
  cleanUrls,
  base: '/',
  // ignoreDeadLinks: true,
  markdown: {
    lineNumbers: true,
    config: createMarkdownPlugins as any,
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: favicon as string }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
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
