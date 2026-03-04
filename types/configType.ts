// import { DefaultTheme } from 'vitepress'

/**
 * @description 站点配置
 */
export interface VitePressConfigType {
  author: string // 作者
  watermark: boolean // 水印
  ogImage: string // logo
  siteConfig: SiteConfig // 站点配置
  themeConfig: any
}

interface SiteConfig {
  title: string // 站点元数据
  description: string // 站点的描述。这将呈现为页面 HTML 中的 <meta> 标签
  lang: string // 站点的 lang 属性
  cleanUrls: boolean // 干净的 URL
  lastUpdated: boolean // 使用 Git 获取每个页面的最后更新时间戳，可通过 useData 访问
}

// interface themeConfig {
//   siteTitle: string | boolean // 是否显示站点名称
//   logo: string // logo
//   nav: Array<{ text: string; link: string }> // 导航栏
//   socialLinks: Array<{ icon: string; link: string }> // 社交链接
// }
