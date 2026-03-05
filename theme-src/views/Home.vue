<template>
  <main class="workbench" @mousemove="handleMouseMove">
    <!-- Ambient Background -->
    <div class="ambient-layer">
      <div class="cursor-glow" :style="cursorGlowStyle"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="workbench-layout">
      <!-- Fixed Sidebar Identity -->
      <aside class="side-panel">
        <div class="sticky-identity">
          <div class="avatar-orbit" @mousemove="handleAvatarMagnetic" @mouseleave="resetAvatar">
            <div class="avatar-magnetic" :style="avatarStyle">
              <img :src="avatarWithBase" alt="Avatar" class="avatar-img" />
              <div class="breathing-ring"></div>
            </div>
          </div>

          <div class="identity-content">
            <h1 class="user-name">
              <span class="reveal-text">{{ heroName }}</span>
            </h1>
            <p class="user-tagline">{{ tagline }}</p>
            <div class="user-description">
              {{ description }}
            </div>
          </div>

          <div class="side-actions">
            <a href="/about/" class="btn-magnetic primary">
              <span>GET IN TOUCH</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <div class="social-links-minimal">
              <a v-for="item in socials" :key="item.label" :href="item.url" target="_blank" class="social-item">
                {{ item.label }}
              </a>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Scrollable Content -->
      <section class="main-content">
        <div class="content-header">
          <div class="indicator">
            <span class="pulse"></span>
            RECENT LOGS
          </div>
          <div class="h-line"></div>
        </div>

        <div class="manuscript-feed">
          <a 
            v-for="(post, index) in posts" 
            :key="post.url" 
            :href="post.url" 
            class="manuscript-entry"
            :style="{ animationDelay: `${0.2 + index * 0.1}s` }"
          >
            <div class="entry-sidebar">
              <span class="entry-index">0{{ index + 1 }}</span>
              <div class="entry-v-line"></div>
            </div>
            <div class="entry-body">
              <div class="entry-meta">
                <span class="entry-date">{{ post.date }}</span>
                <span class="entry-category">Thought</span>
              </div>
              <h3 class="entry-title">{{ post.title }}</h3>
              <p class="entry-excerpt" v-if="post.description">{{ post.description }}</p>
              <div class="entry-footer">
                <span class="read-action">READ ARTICLE</span>
                <div class="read-line"></div>
              </div>
            </div>
          </a>
        </div>

        <footer class="feed-footer">
          <a href="/posts/" class="btn-magnetic secondary">
            <span>EXPLORE FULL ARCHIVE</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </footer>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { VitePressConfig } from '../../vitepress.config'

const {
  author,
  ogImage,
  themeConfig: { home },
} = VitePressConfig

const heroName = home?.heroName || author
const tagline = home?.tagline || 'Thinker, Designer & Developer'
const description = home?.description || 'Crafting digital experiences at the intersection of engineering and human-centered design.'
const avatarWithBase = computed(() => withBase(home?.avatar || `/${ogImage}`))
const socials = home?.socials || []

// Cursor Glow Effect
const mousePos = reactive({ x: 0, y: 0 })
const handleMouseMove = (e: MouseEvent) => {
  mousePos.x = e.clientX
  mousePos.y = e.clientY
}
const cursorGlowStyle = computed(() => ({
  transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
}))

// Avatar Magnetic Effect
const avatarRotation = reactive({ x: 0, y: 0, s: 1 })
const handleAvatarMagnetic = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  avatarRotation.x = -y * 25
  avatarRotation.y = x * 25
  avatarRotation.s = 1.05
}
const resetAvatar = () => {
  avatarRotation.x = 0
  avatarRotation.y = 0
  avatarRotation.s = 1
}
const avatarStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${avatarRotation.x}deg) rotateY(${avatarRotation.y}deg) scale(${avatarRotation.s})`
}))

interface PostMeta { title: string; date?: string; description?: string }
interface PostModule { url: string; frontmatter: PostMeta }
const postModules = import.meta.glob<PostModule>('/**/*.md', { eager: true })

const posts = computed(() => {
  const list: { title: string; date?: string; description?: string; url: string }[] = []
  for (const path in postModules) {
    if (!path.startsWith('/posts/')) continue
    const mod = postModules[path] as any
    const fm = (mod && (mod.frontmatter || mod.__pageData?.frontmatter)) as PostMeta | undefined
    if (!fm?.title || fm.title === '文章列表') continue
    list.push({ title: fm.title, date: fm.date, description: fm.description, url: (mod && mod.url) || path.replace(/\.md$/, '') })
  }
  return list.sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 4)
})
</script>

<style lang="scss" scoped>
.workbench {
  --accent: var(--accent-blue);
  --bg: var(--bg-base);
  --fg: var(--text-main);
  --fg-soft: var(--text-soft);
  --fg-muted: var(--text-muted);
  --brdr: var(--border-thin);

  position: relative;
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--fg);
  overflow-x: hidden;
  transition: background-color 0.4s ease;
}

/* --- Ambient Layer --- */
.ambient-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(var(--brdr) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at center, black, transparent 80%);
    opacity: 0.2;
  }

  .cursor-glow {
    position: fixed;
    width: 600px;
    height: 600px;
    top: -300px;
    left: -300px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
    z-index: 2;
    transition: transform 0.15s cubic-bezier(0.2, 0, 0.2, 1);
  }
}

.workbench-layout {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  min-height: 100vh;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 24px;
  }
}

/* ==================== Side Panel ==================== */
.side-panel {
  flex: 0 0 40%;
  padding: 120px 60px 120px 0;
  border-right: 1px solid var(--brdr);

  @media (max-width: 1024px) {
    flex: none;
    border-right: none;
    border-bottom: 1px solid var(--brdr);
    padding: 80px 0 60px;
  }
}

.sticky-identity {
  position: sticky;
  top: 120px;
}

.avatar-orbit {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 48px;
}

.avatar-magnetic {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.1s ease-out;

  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 36px; /* Squircle */
    object-fit: cover;
    border: 2px solid var(--fg);
    padding: 6px;
    background: var(--bg);
    position: relative;
    z-index: 2;
    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
  }

  .breathing-ring {
    position: absolute;
    inset: -8px;
    border: 2px solid var(--accent);
    border-radius: 44px;
    opacity: 0.2;
    animation: breathe 4s ease-in-out infinite;
    z-index: 1;
  }
}

.user-name {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  margin: 0 0 20px;
  
  .reveal-text {
    background: linear-gradient(180deg, var(--fg) 50%, var(--fg-soft));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.user-tagline {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.01em;
  margin-bottom: 24px;
}

.user-description {
  max-width: 400px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--fg-soft);
  margin-bottom: 48px;
}

.side-actions {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.btn-magnetic {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.primary {
    background: var(--fg);
    color: var(--bg) !important;
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.2);
    &:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 30px -10px rgba(0,0,0,0.3); }
  }

  &.secondary {
    background: transparent;
    border: 2px solid var(--fg);
    color: var(--fg) !important;
    &:hover { background: var(--fg); color: var(--bg) !important; }
  }
  
  svg { transition: transform 0.3s ease; }
  &:hover svg { transform: translateX(5px); }
}

.social-links-minimal {
  display: flex;
  gap: 24px;
  .social-item {
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--fg-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s;
    &:hover { color: var(--accent); }
  }
}

/* ==================== Main Content ==================== */
.main-content {
  flex: 1;
  padding: 120px 0 120px 80px;

  @media (max-width: 1024px) {
    padding: 60px 0;
  }
}

.content-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 64px;

  .indicator {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.8rem;
    font-weight: 900;
    color: var(--fg-muted);
    letter-spacing: 0.2em;

    .pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 10px var(--accent);
      animation: indicator-pulse 2s infinite;
    }
  }

  .h-line { flex: 1; height: 1px; background: var(--brdr); }
}

.manuscript-feed {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.manuscript-entry {
  display: flex;
  padding: 48px 0;
  text-decoration: none !important;
  color: inherit !important;
  opacity: 0;
  animation: reveal-slide 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: all 0.4s ease;

  &:hover {
    .entry-index { color: var(--accent); transform: scale(1.2); }
    .entry-v-line { height: 100%; opacity: 1; }
    .entry-title { color: var(--accent); transform: translateX(12px); }
    .read-line { width: 100%; }
  }
}

.entry-sidebar {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .entry-index {
    font-size: 0.9rem;
    font-weight: 900;
    color: var(--fg-muted);
    font-family: ui-monospace, monospace;
    transition: all 0.3s ease;
  }

  .entry-v-line {
    width: 2px;
    height: 20px;
    background: var(--accent);
    opacity: 0.2;
    transition: all 0.4s ease;
  }
}

.entry-body {
  flex: 1;
}

.entry-meta {
  display: flex;
  gap: 16px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--fg-muted);
  margin-bottom: 12px;
  .entry-category { text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); }
}

.entry-title {
  font-size: 2.25rem;
  font-weight: 850;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0 0 16px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.entry-excerpt {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--fg-soft);
  max-width: 600px;
  margin-bottom: 32px;
}

.entry-footer {
  position: relative;
  display: inline-block;
  
  .read-action {
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--fg);
  }

  .read-line {
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--accent);
    transition: width 0.4s ease;
  }
}

.feed-footer {
  margin-top: 80px;
  padding-top: 48px;
  border-top: 1px solid var(--brdr);
}

/* --- Animations --- */
@keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.15); opacity: 0.4; } }
@keyframes indicator-pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
@keyframes reveal-slide { from { opacity: 0; transform: translateY(40px) skewY(2deg); filter: blur(10px); } to { opacity: 1; transform: translateY(0) skewY(0); filter: blur(0); } }

@media (max-width: 640px) {
  .user-name { font-size: 3.5rem; }
  .entry-title { font-size: 1.75rem; }
  .entry-sidebar { display: none; }
}
</style>