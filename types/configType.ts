/**
 * @description 站点配置
 */
export interface SiteConfig {
  author: string // 作者
  lang: string // 语言
  title: string // 标题
  description: string // 描述
  cleanUrls?: boolean // 干净的 URL
  watermark?: boolean // 水印
  favicon?: string // favicon
  ogImage?: string // ogImage
}
