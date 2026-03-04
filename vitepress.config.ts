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
    outline: [2, 4],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zeMinng' }
    ],
    footer: {
      message: 'CC BY-NC-SA 4.0 协议',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} zeMinng | 保留所有权利` 
    }
  }
} as const
