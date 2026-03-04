import type { VitePressConfigType } from '~/types/configType'

export const VitePressConfig: VitePressConfigType = {
  author: 'zeMinng',
  watermark: true,
  ogImage: 'logo.png',
  siteConfig: {
    title: 'vitepress-theme-blog',
    description: 'A minimalist blog theme for VitePress. | 一款为 VitePress 设计的极简博客主题',
    lang: 'zh-CN',
    cleanUrls: true,
    lastUpdated: true,
  },
  themeConfig: {
    siteTitle: 'vitepress-theme-blog',
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zeMinng' }
    ],
  }
} as const
