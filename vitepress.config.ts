import type { VitePressConfigType } from '~/types/configType'

const AUTHOR_NAME = 'zeMinng'

export const VitePressConfig: VitePressConfigType = {
  author: AUTHOR_NAME,
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
      { text: '归档', link: '/archives/' },
      { text: '资源', link: '/resources/' },
      { text: '关于', link: '/about/' },
    ],
    socialLinks: [
      { icon: 'github', link: `https://github.com/${AUTHOR_NAME}` },
      { icon: 'x', link: 'https://twitter.com/xiaoxiaoemil' }
    ],
    footer: {
      message: 'CC BY-NC-SA 4.0 协议',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} ${AUTHOR_NAME} | 保留所有权利` 
    },
  },
  homeConfig: {
    heroName: 'vitepress-theme-blog',
    tagline: AUTHOR_NAME,
    description: 'A minimalist blog theme for VitePress. | 一款为 VitePress 设计的极简博客主题',
    avatar: '/logo.png',
    actions: [
      { theme: 'brand', text: '开始阅读', link: '/posts/' },
      { theme: 'alt', text: '关于作者', link: '/about/' },
    ],
    features: [
      { icon: '✍️', title: '文章', details: '沉淀技术实践，分享学习心得与深度思考', },
      { icon: '🏷️', title: '标签', details: '按技术领域与主题精准检索，快速定位内容', },
      { icon: '👨‍💻', title: '关于', details: '探索作者的技术成长之路与专业背景', }
    ],
    socials: [
      { label: 'GitHub', url: 'https://github.com/zeMinng' },
      { label: 'X / Twitter', url: 'https://twitter.com/xiaoxiaoemil' },
    ],
  },
  watermarkConfig: {
    enable: false,
    text: 'vitepress-theme-blog',
    darkColor: 'rgba(0,0,0,.7)',
    lightColor: 'rgba(0,0,0,.15)',
    fontSize: 16,
  },
} as const
