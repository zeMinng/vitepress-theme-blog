/**
 * @description 站点配置
 */
export interface SiteConfig {
  author: string
  lang: string
  title: string
  description: string
  cleanUrls: boolean
  watermark?: boolean
  ogImage?: string
}
