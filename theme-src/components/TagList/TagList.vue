<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as allPosts } from '../../composables/usePosts.data'

const props = defineProps({
  tag: {
    type: String,
    default: ''
  }
})

const currentTag = computed(() => (props.tag || '').trim())

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
  return Object.entries(map).sort((a, b) => {
    if (a[0] === '未分类') return 1
    if (b[0] === '未分类') return -1
    return a[0].localeCompare(b[0])
  })
})

const tagTiles = computed(() => {
  return tagsWithPosts.value.map(([tagName, posts]) => ({
    tagName,
    count: posts.length,
    href: withBase(`/tags/${encodeURIComponent(tagName)}/`)
  }))
})

const currentPosts = computed(() => {
  if (!currentTag.value) return []
  const found = tagsWithPosts.value.find(([tagName]) => tagName === currentTag.value)
  return found ? found[1] : []
})

const backHref = computed(() => withBase('/tags/'))
</script>

<template>
  <section class="tags-page">
    <header class="tags-page__header">
      <div class="tags-page__header-main">
        <h1 class="tags-page__title">
          {{ currentTag ? currentTag : '标签' }}
        </h1>
        <p v-if="!currentTag && tagsWithPosts.length" class="tags-page__count">
          共 {{ tagsWithPosts.length }} 个标签
        </p>
        <p v-else-if="currentTag" class="tags-page__count">
          共 {{ currentPosts.length }} 篇文章
        </p>
      </div>

      <a v-if="currentTag" class="tags-page__back" :href="backHref">全部标签</a>
    </header>

    <div v-if="!tagsWithPosts.length" class="tags-page__empty">
      暂无标签
    </div>

    <template v-else>
      <!-- 标签主页：只显示标签磁贴 -->
      <div v-if="!currentTag" class="tags-page__tiles">
        <a
          v-for="t in tagTiles"
          :key="t.tagName"
          class="tag-tile"
          :href="t.href"
        >
          <span class="tag-tile__name">{{ t.tagName }}</span>
          <span class="tag-tile__count">{{ t.count }}</span>
        </a>
      </div>

      <!-- 标签详情页：显示该标签下的文章 -->
      <div v-else class="tags-page__detail">
        <div v-if="!currentPosts.length" class="tags-page__empty">
          该标签下暂无文章
        </div>
        <ul v-else class="tag-section__posts">
          <li v-for="post in currentPosts" :key="post.url" class="tag-section__item">
            <a :href="post.url" class="tag-section__link">
              {{ post.title }}
            </a>
            <time v-if="post.date && post.date.string" class="tag-section__date">
              {{ post.date.string }}
            </time>
          </li>
        </ul>
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
.tags-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 1.5rem 0;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 1.4rem;
  }

  &__header-main {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    min-width: 0;
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

  &__back {
    flex-shrink: 0;
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
    text-decoration: none;

    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  &__tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
  }

  &__detail {
    margin-top: 0.25rem;
  }
}

/* 标签磁贴 */
.tag-tile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  text-decoration: none;
  color: var(--vp-c-text-1);

  &:hover {
    border-color: var(--vp-c-brand-1);
  }

  &__name {
    font-size: 0.95rem;
    font-weight: 600;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__count {
    flex-shrink: 0;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--vp-c-text-3);
    padding: 0.1rem 0.45rem;
    border-radius: 999px;
    background: var(--vp-c-bg-soft, rgba(128, 128, 128, 0.1));
  }
}

/* 文章列表（标签详情页复用） */
.tag-section {
  &__posts {
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 10px;
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
