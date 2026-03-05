import type { VitePressConfigType } from '~/types/configType'

export const VitePressConfig: VitePressConfigType = {
  author: 'zeMinng',
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
      { text: '文章', link: '/posts/' },
      { text: '标签', link: '/tags/' },
      { text: '关于', link: '/about/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zeMinng' },
      { icon: 'x', link: 'https://twitter.com/xiaoxiaoemil' }
    ],
    footer: {
      message: 'CC BY-NC-SA 4.0 协议',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} zeMinng | 保留所有权利` 
    },
    home: {
      heroName: 'zeMinng',
      tagline: '好奇心驱动的前端开发者',
      description:
        '专注于 Vue、TypeScript 与工程化，也记录一些对前端生态、效率工具和生活灵感的思考。',
      avatar: '/logo.png',
      socials: [
        { label: 'GitHub', url: 'https://github.com/zeMinng' },
        { label: 'X / Twitter', url: 'https://twitter.com/xiaoxiaoemil' },
      ],
    },
  },
  watermarkConfig: {
    enable: true,
    text: 'vitepress-theme-blog',
    darkColor: 'rgba(0,0,0,.7)',
    lightColor: 'rgba(0,0,0,.15)',
    fontSize: 16,
  },
} as const
