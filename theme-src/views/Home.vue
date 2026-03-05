<template>
  <main class="home">
    <div class="home-layout">
      <!-- 左侧：作者信息（更加极简） -->
      <section class="home-hero">
        <div class="home-hero__header">
          <div class="home-hero__avatar">
            <img :src="avatarWithBase" alt="avatar" />
          </div>
          <div class="home-hero__title-block">
            <h1 class="home-hero__title">{{ heroName }}</h1>
            <p class="home-hero__subtitle">{{ tagline }}</p>
          </div>
        </div>
        <p class="home-hero__desc">
          {{ description }}
        </p>
        <div class="home-hero__actions">
          <a class="home-hero__btn home-hero__btn--primary" href="/posts/">
            开始阅读
          </a>
          <a class="home-hero__btn home-hero__btn--ghost" href="/about/">
            关于作者
          </a>
        </div>
        <div class="home-hero__socials" v-if="socials.length">
          <a
            v-for="item in socials"
            :key="item.label"
            class="home-hero__social-link"
            :href="item.url"
            target="_blank"
            rel="noreferrer"
          >
            {{ item.label }}
          </a>
        </div>
      </section>

      <!-- 右侧：最近文章 / 动态 -->
      <section v-if="posts.length" class="home-recent">
        <header class="home-recent__header">
          <h2 class="home-recent__title">最近更新</h2>
          <a href="/posts/" class="home-recent__more">查看全部文章</a>
        </header>
        <ul class="home-recent__list">
          <li v-for="post in posts" :key="post.url" class="home-recent__item">
            <a :href="post.url" class="home-recent__item-title">
              {{ post.title }}
            </a>
            <p class="home-recent__item-meta">
              <span v-if="post.date">{{ post.date }}</span>
              <span v-if="post.description"> · {{ post.description }}</span>
            </p>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { VitePressConfig } from '~/vitepress.config'

const {
  author,
  ogImage,
  themeConfig: { home },
} = VitePressConfig

const heroName = home?.heroName || author
const tagline = home?.tagline || '好奇心驱动的开发者'
const description =
  home?.description ||
  '记录关于前端开发、VitePress 主题设计与日常思考的文字。'

const avatarWithBase = computed(() => withBase(home?.avatar || `/${ogImage}`))
const socials = home?.socials || []

// 最近文章：从 /posts 目录读取 frontmatter
interface PostMeta {
  title: string
  date?: string
  description?: string
}

interface PostModule {
  url: string
  frontmatter: PostMeta
}

// 扫描站点里所有 markdown，然后只保留 /posts/ 下的
const postModules = import.meta.glob<PostModule>('/**/*.md', {
  eager: true,
})

const posts = computed(() => {
  const list: { title: string; date?: string; description?: string; url: string }[] = []

  for (const path in postModules) {
    // 只关注 /posts/ 开头的路径
    if (!path.startsWith('/posts/')) continue

    const mod = postModules[path] as any

    // 兼容不同导出形式：frontmatter 或 __pageData.frontmatter
    const fm = (mod && (mod.frontmatter || mod.__pageData?.frontmatter)) as PostMeta | undefined
    if (!fm?.title) continue

    // VitePress 通常会提供 url 或者可以通过路径自己拼
    const url = (mod && mod.url) || path.replace(/\.md$/, '')

    list.push({
      title: fm.title,
      date: fm.date,
      description: fm.description,
      url,
    })
  }

  return list
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 3)
})
</script>

<style lang="scss" scoped>
.home {
  padding: 4.5rem 1.5rem 3.5rem;
}

.home-layout {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.8fr);
  gap: 2.5rem;

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.home-hero {
  padding-right: 1rem;
}

.home-hero__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.home-hero__avatar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.2rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.5);
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);
    object-fit: cover;
    background: radial-gradient(circle at 30% 0, #e0f2fe, #f8fafc);
  }
}

.home-hero__title {
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin: 0 0 0.6rem;
  color: var(--vp-c-text-1);

  @media (min-width: 960px) {
    font-size: 2.4rem;
  }
}

.home-hero__subtitle {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.6rem;
}

.home-hero__desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 28rem;
  margin: 0 0 1rem;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
}

.home-hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease,
    transform 0.12s ease;
  border: 1px solid transparent;
}

.home-hero__btn--primary {
  background-color: var(--vp-c-brand);
  color: white;
  box-shadow: 0 14px 30px rgba(56, 189, 248, 0.35);

  &:hover {
    background-color: var(--vp-c-brand-3);
    transform: translateY(-1px);
  }
}

.home-hero__btn--ghost {
  border-color: rgba(148, 163, 184, 0.6);
  color: var(--vp-c-text-1);
  background-color: transparent;

  &:hover {
    background-color: rgba(148, 163, 184, 0.1);
  }
}

.home-hero__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-start;
  margin-top: 0.3rem;
}

.home-hero__social-link {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-bottom: 1px dashed rgba(148, 163, 184, 0.6);
  padding-bottom: 1px;

  &:hover {
    color: var(--vp-c-brand-1);
    border-color: var(--vp-c-brand-1);
  }
}

.home-recent__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.9rem;
}

.home-recent__title {
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.home-recent__more {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-decoration: none;

  &:hover {
    color: var(--vp-c-brand-1);
  }
}

.home-recent__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.home-recent__item {
  padding: 0.55rem 0;
}

.home-recent__item + .home-recent__item {
  border-top: 1px dashed rgba(148, 163, 184, 0.35);
}

.home-recent__item-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;

  &:hover {
    color: var(--vp-c-brand-1);
  }
}

.home-recent__item-meta {
  margin-top: 0.1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>