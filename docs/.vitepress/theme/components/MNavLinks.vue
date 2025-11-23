<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../../nav/data'
import MNavLink from './MNavLink.vue'

const categories = computed(() => {
  return NAV_DATA.map((cat) => ({
    title: cat.title,
    slug: slugify(cat.title),
    groups: cat.items || []
  }))
})
</script>

<template>
  <div v-for="cat in categories" :key="cat.title" :id="cat.slug" class="nav-category">
    <h2 class="category-title">{{ cat.title }}</h2>
    
    <div v-for="group in cat.groups" :key="group.title" class="nav-group">
      <h3 v-if="group.title && group.title !== cat.title" :id="slugify(group.title)" class="group-title">
        {{ group.title }}
      </h3>
      
      <div class="nav-links">
        <MNavLink v-for="item in group.items" :key="item.link" v-bind="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-category { margin-bottom: 60px; }
.category-title { font-size: 24px; font-weight: 700; margin-bottom: 20px; border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 10px; }
.nav-group { margin-bottom: 30px; }
.group-title { font-size: 18px; font-weight: 600; margin: 10px 0 15px; padding-left: 10px; border-left: 4px solid var(--vp-c-brand); }
.nav-links { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; }
@media (min-width: 640px) { .nav-links { gap: 20px; } }
</style>
