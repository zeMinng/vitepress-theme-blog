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
  locales: {
    root: { label: '简体中文' },
    en: { label: 'English', link: 'https://vitejs.dev' },
  },
  markdown: {
    lineNumbers: true,
    config: createMarkdownPlugins as any,
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    ...themeConfig,
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '返回顶部',
    outlineTitle: '本页目录',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '切换外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    notFound: {
      title: '',
      quote: '曾经有个页面摆在你面前你没有珍惜，直到它404了...',
      linkLabel: 'go home',
      linkText: '回到首页',
      code: '404',
    },
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
