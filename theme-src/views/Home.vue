<template>
  <main class="home">
    <section class="home-hero">
      <div class="home-hero__avatar">
        <img :src="avatarWithBase" alt="avatar" />
      </div>
      <h1 class="home-hero__title">{{ heroName }}</h1>
      <p class="home-hero__subtitle">{{ tagline }}</p>
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
</script>

<style lang="scss" scoped>
.home {
  padding: 3.5rem 24px 2.5rem;
  max-width: 720px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
}

.home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 0.5rem;
}

.home-hero__avatar {
  margin-bottom: 1.25rem;

  img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    object-fit: cover;
  }
}

.home-hero__title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  margin: 0 0 0.4rem;
  color: var(--vp-c-text-1);

  @media (min-width: 960px) {
    font-size: 2.4rem;
  }
}

.home-hero__subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.6rem;
}

.home-hero__desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 30rem;
  margin: 0 auto 1.1rem;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.1rem;
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
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
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
  justify-content: center;
  margin-top: 0.4rem;
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
</style>