import { defineConfig } from 'vitepress'
import { SITE } from '../config'

export default defineConfig({
  lang: SITE.lang,
  title: SITE.title || 'zeMinng',
  description: SITE.description,
  cleanUrls: SITE.cleanUrls,
  base: '/',
  // ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
