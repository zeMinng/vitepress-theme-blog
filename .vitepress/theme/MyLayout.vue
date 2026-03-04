<template>
  <DefaultTheme.Layout />
  <ClientOnly>
    <Watermark v-if="enable" fullscreen fixed :content="text" :zIndex="0" :textStyle="{ color, fontSize }" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { VitePressConfig } from '~/vitepress.config'
import Watermark from './components/watermark'

const { watermarkConfig: { enable, text, lightColor, darkColor, fontSize }} = VitePressConfig

const color = computed(() => {
  const { isDark } = useData()
  return isDark.value ? darkColor : lightColor
})
</script>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>