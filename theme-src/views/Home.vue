<template>
  <main class="home">
    <div class="home-layout">
      <!-- 左侧：Hero 信息舱 -->
      <section class="home-hero">
        <div class="home-hero__header">
          <div class="home-hero__avatar-wrapper">
            <img class="home-hero__avatar" :src="avatarWithBase" alt="Avatar" />
            <div class="home-hero__avatar-ring"></div>
          </div>
          <div class="home-hero__title-block">
            <h1 class="home-hero__title">
              {{ heroName }}
            </h1>
            <p class="home-hero__subtitle">{{ tagline }}</p>
          </div>
        </div>
        
        <p class="home-hero__desc">
          {{ description }}
        </p>
        
        <div class="home-hero__actions">
          <a class="btn btn--primary" href="/posts/">
            <span class="btn__text">探索文章</span>
            <span class="btn__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>
          <a class="btn btn--ghost" href="/about/">
            <span class="btn__text">了解作者</span>
          </a>
        </div>
        
        <div class="home-hero__socials" v-if="socials.length">
          <a
            v-for="item in socials"
            :key="item.label"
            class="social-link"
            :href="item.url"
            target="_blank"
            rel="noreferrer"
          >
            <span class="social-link__text">{{ item.label }}</span>
            <div class="social-link__underline"></div>
          </a>
        </div>
      </section>

      <!-- 右侧：动态卡片流 -->
      <section v-if="posts.length" class="home-recent">
        <header class="home-recent__header">
          <div class="header-title-wrapper">
            <h2 class="home-recent__title">最近更新</h2>
          </div>
          <a href="/posts/" class="home-recent__more">
            全部
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </header>

        <div class="home-recent__grid">
          <a v-for="(post, index) in posts" :key="post.url" :href="post.url" class="post-card" :style="{ animationDelay: `${index * 100}ms` }">
            <div class="post-card__content">
              <h3 class="post-card__title">{{ post.title }}</h3>
              <p class="post-card__meta">
                <span class="meta-date" v-if="post.date">
                  {{ post.date }}
                </span>
                <span class="meta-desc" v-if="post.description">{{ post.description }}</span>
              </p>
            </div>
            <div class="post-card__arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>
        </div>
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
const tagline = home?.tagline || '探索技术与设计的边界'
const description =
  home?.description ||
  '记录关于前端开发、VitePress 主题设计与日常思考的文字，保持好奇，持续创造。'

const avatarWithBase = computed(() => withBase(home?.avatar || `/${ogImage}`))
const socials = home?.socials || []

interface PostMeta {
  title: string
  date?: string
  description?: string
}

interface PostModule {
  url: string
  frontmatter: PostMeta
}

const postModules = import.meta.glob<PostModule>('/**/*.md', {
  eager: true,
})

const posts = computed(() => {
  const list: { title: string; date?: string; description?: string; url: string }[] = []

  for (const path in postModules) {
    if (!path.startsWith('/posts/')) continue
    const mod = postModules[path] as any
    const fm = (mod && (mod.frontmatter || mod.__pageData?.frontmatter)) as PostMeta | undefined
    if (!fm?.title || fm.title === '文章列表') continue

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
    .slice(0, 4) // Show 4 premium cards minimum
})
</script>

<style lang="scss" scoped>
/* ==================== 动画定义 ==================== */
@keyframes slideUpFade {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* ==================== 全局容器 ==================== */
.home {
  position: relative;
  padding: 6rem 1.5rem 5rem;
  min-height: calc(100vh - var(--vp-nav-height));
  display: flex;
  align-items: center;
  background-color: var(--vp-c-bg); /* 纯粹的背景色 */
}

.home-layout {
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 4rem;
    padding-top: 2rem;
  }
}

/* ==================== Hero Section (左侧信息舱) ==================== */
.home-hero {
  animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.home-hero__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.home-hero__avatar-wrapper {
  position: relative;
  width: 5.5rem;
  height: 5.5rem;
  flex-shrink: 0;
  border-radius: 50%;
}

.home-hero__avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  opacity: 0.5;
  transition: transform 0.4s ease, border-color 0.4s ease;
}

.home-hero__avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 2;
  border: 2px solid var(--vp-c-bg);
}

.home-hero__avatar-wrapper:hover .home-hero__avatar {
  transform: scale(1.05);
}
.home-hero__avatar-wrapper:hover .home-hero__avatar-ring {
  transform: scale(1.1);
  border-color: var(--vp-c-text-2);
}

/* 纯粹排版 */
.home-hero__title-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.home-hero__title {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin: 0;
  line-height: 1.1;
  color: var(--vp-c-text-1); /* 纯色标题 */

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
}

.home-hero__subtitle {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-2); /* 降级处理 */
  margin: 0;
  letter-spacing: 0.02em;
}

.home-hero__desc {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  margin: 0 0 2.5rem;
  max-width: 90%;
  font-weight: 400;
}

/* ==================== 操作按钮 ==================== */
.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.6rem;
  border-radius: 8px; /* 更方正一点，更有设计感 */
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.btn__icon {
  display: inline-flex;
  margin-left: 0.5rem;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn--primary {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg) !important;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    background: var(--vp-c-text-1); /* 保持不变色，更克制 */
    
    .btn__icon { transform: translateX(4px); }
  }
}

.dark .btn--primary:hover {
  box-shadow: 0 8px 20px rgba(255,255,255,0.15);
}

.btn--ghost {
  background: transparent;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  
  &:hover {
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-text-1);
  }
}

/* ==================== 社交链接 ==================== */
.home-hero__socials {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  position: relative;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
  padding: 0.2rem 0;
  transition: color 0.2s ease;

  &:hover {
    color: var(--vp-c-text-1);
  }
}

.social-link__underline {
  position: absolute;
  bottom: 0; left: 0;
  width: 0%; height: 2px;
  background: var(--vp-c-text-1); /* 纯黑/白下划线 */
  transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.social-link:hover .social-link__underline {
  width: 100%;
}

/* ==================== Recent Updates Section (右侧卡片) ==================== */
.home-recent {
  position: relative;
  z-index: 1;
}

.home-recent__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 1rem;
  opacity: 0;
  animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}

.home-recent__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.home-recent__more {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--vp-c-text-1);
    
    svg { transform: translateX(2px); }
  }

  svg { transition: transform 0.3s ease; }
}

/* Minimalist 卡片阵列 */
.home-recent__grid {
  display: flex;
  flex-direction: column;
}

.post-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none;
  opacity: 0;
  animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: padding-left 0.3s ease, border-color 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
}

.post-card:hover {
  padding-left: 1rem;
  border-bottom-color: var(--vp-c-text-1);
}

.post-card__content {
  flex: 1;
  padding-right: 1.5rem;
}

.post-card__title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.post-card__meta {
  margin: 0;
  font-size: 0.9rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  line-height: 1.5;
}

.meta-date {
  color: var(--vp-c-text-3);
  font-family: var(--font-family-number), monospace;
  font-size: 0.85rem;
  white-space: nowrap;
}

.meta-desc {
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '—';
    margin-right: 0.5rem;
    color: var(--vp-c-divider);
  }
}

.post-card__arrow {
  color: var(--vp-c-text-3);
  transition: color 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform: translateX(-10px);
}

.post-card:hover .post-card__arrow {
  color: var(--vp-c-text-1);
  opacity: 1;
  transform: translateX(0);
}
</style>