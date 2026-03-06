import { createContentLoader } from 'vitepress'

export default createContentLoader('resources/**/*.md', {
  transform(raw): ResourceItem[] {
    return raw
      .filter(({ url }) => {
        const u = url.replace(/\/$/, '')
        return u !== '/resources'
      })
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || '未命名资源',
        description: frontmatter.description || '',
        link: frontmatter.link || '',
        download: frontmatter.download || '',
        category: frontmatter.category || '其他',
        url
      }))
      .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title))
  }
})

export interface ResourceItem {
  title: string
  description: string
  link: string
  download: string
  category: string
  url: string
}
