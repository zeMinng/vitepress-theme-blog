<script setup>
import { computed } from 'vue'
import { data as allPosts } from '../../composables/usePosts.data'

// 按标签聚合：{ tagName: [post, ...] }，按标签名排序
const tagsWithPosts = computed(() => {
  const map = {}
  for (const post of allPosts) {
    const tags = post.tags && post.tags.length ? post.tags : ['未分类']
    for (const tag of tags) {
      if (!map[tag]) map[tag] = []
      map[tag].push(post)
    }
  }
  // 未分类放最后，其余按名称排序
  const entries = Object.entries(map).sort((a, b) => {
    if (a[0] === '未分类') return 1
    if (b[0] === '未分类') return -1
    return a[0].localeCompare(b[0])
  })
  return entries
})
</script>

<template>
  <section class="tags-page">
    <header class="tags-page__header">
      <h1 class="tags-page__title">标签</h1>
      <p v-if="tagsWithPosts.length" class="tags-page__count">
        共 {{ tagsWithPosts.length }} 个标签
      </p>
    </header>

    <div v-if="!tagsWithPosts.length" class="tags-page__empty">
      暂无标签
    </div>

    <div v-else class="tags-page__list">
      <section
        v-for="[tagName, posts] in tagsWithPosts"
        :key="tagName"
        class="tag-section"
      >
        <h2 class="tag-section__name">
          {{ tagName }}
          <span class="tag-section__count">{{ posts.length }}</span>
        </h2>
        <ul class="tag-section__posts">
          <li v-for="post in posts" :key="post.url" class="tag-section__item">
            <a :href="post.url" class="tag-section__link">
              {{ post.title }}
            </a>
            <time
              v-if="post.date && post.date.string"
              class="tag-section__date"
            >
              {{ post.date.string }}
            </time>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tags-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 1.5rem 0;

  &__header {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    margin-bottom: 1.4rem;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
  }

  &__count {
    font-size: 0.8rem;
    color: var(--vp-c-text-3);
    margin: 0;
  }

  &__empty {
    padding: 2rem;
    color: var(--vp-c-text-2);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
}

.tag-section {
  &__name {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--vp-c-text-1);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  &__count {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--vp-c-text-3);
    padding: 0.1rem 0.4rem;
    border-radius: 999px;
    background: var(--vp-c-bg-soft, rgba(128, 128, 128, 0.1));
  }

  &__posts {
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    overflow: hidden;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.5rem 0.85rem;
    border-bottom: 1px solid var(--vp-c-divider);

    &:last-child {
      border-bottom: none;
    }
  }

  &__link {
    font-size: 0.9rem;
    color: var(--vp-c-text-1);
    text-decoration: none;
    flex: 1;
    min-width: 0;

    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  &__date {
    font-size: 0.75rem;
    color: var(--vp-c-text-3);
    flex-shrink: 0;
  }
}
</style>
