<script setup>
import { ref, computed } from 'vue'
import { data as allPosts } from '../../composables/usePosts.data'

const pageSize = 5
const currentPage = ref(1)

const total = computed(() => allPosts.length)
const totalPages = computed(() =>
  total.value === 0 ? 1 : Math.ceil(total.value / pageSize),
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return allPosts.slice(start, start + pageSize)
})

const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= totalPages.value; i++) arr.push(i)
  return arr
})

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="posts">
    <header class="posts__header">
      <h1 class="posts__title">文章</h1>
      <span v-if="total > 0" class="posts__count">
        {{ total }} 篇
      </span>
    </header>
    <div v-if="total === 0" class="posts__empty">
      暂时还没有文章
    </div>
    <ol v-else class="posts__list">
      <li
        v-for="post in paginatedPosts"
        :key="post.url"
        class="post-card"
      >
        <a :href="post.url" class="post-card__link">
          <h2 class="post-card__title">
            {{ post.title }}
          </h2>
          <p
            v-if="post.excerpt"
            class="post-card__excerpt"
          >
            {{ post.excerpt }}
          </p>
          <time
            v-if="post.date && post.date.string"
            class="post-card__date"
          >
            {{ post.date.string }}
          </time>
        </a>
      </li>
    </ol>

    <nav
      v-if="totalPages > 1"
      class="posts__pagination"
    >
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        上一页
      </button>
      <button
        v-for="page in pages"
        :key="page"
        class="pagination-btn"
        :class="{ 'is-active': page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        下一页
      </button>
    </nav>
  </section>
</template>

<style scoped lang="scss">
.posts {
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
  }

  &__empty {
    padding: 2rem;
    color: var(--vp-c-text-2);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  &__pagination {
    margin-top: 1.6rem;
    display: flex;
    justify-content: center;
    gap: 0.3rem;
  }
}
/* 卡片 */
.post-card {
  list-style: none;

  &__link {
    display: block;
    padding: 0.9rem 1rem;
    border-radius: 10px;
    border: 1px solid var(--vp-c-divider);
    text-decoration: none;
    background: var(--vp-c-bg);
  }

  &__title {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.45;
    color: var(--vp-c-text-1);
  }

  &__excerpt {
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
    margin: 0.25rem 0 0.35rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__date {
    font-size: 0.7rem;
    color: var(--vp-c-text-3);
    font-family: var(--vp-font-family-mono);
  }

}

/* 分页 */
.pagination-btn {
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  cursor: pointer;

  &.is-active {
    background: var(--vp-c-brand-1);
    border-color: var(--vp-c-brand-1);
    color: white;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

}
</style>