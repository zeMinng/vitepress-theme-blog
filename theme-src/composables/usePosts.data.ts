import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  excerpt: true, // 如果你想在列表显示摘要
  transform(raw): PostData[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || '无题',
        url,
        date: formatDate(frontmatter.date),
        excerpt: frontmatter.description // 或者使用自动生成的 excerpt
      }))
      .sort((a, b) => b.date.time - a.date.time) // 按时间倒序排序
  }
})

function formatDate(raw: string | number | Date) {
  const date = new Date(raw)
  return {
    time: +date,
    string: date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
}

interface PostData {
  title: string
  url: string
  date: { time: number; string: string }
  excerpt: string
}