<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../../nav/data'
import MNavLink from './MNavLink.vue'

// 处理数据
const formattedData = computed(() => {
  return NAV_DATA.map((category) => {
    return {
      title: category.title,
      slug: slugify(category.title),
      // 确保 groups 始终是一个数组
      groups: (category.items || []).map(group => ({
        title: group.title,
        // 关键修正：确保 links 始终是一个数组
        // 如果 group.items 不存在，就给一个空数组，防止页面崩溃或不显示
        links: group.items || [] 
      }))
    }
  })
})
</script>

<template>
  <div v-for="category in formattedData" :key="category.title" :id="category.slug" class="m-nav-layout">
    
    <div class="m-nav-category-header">
      <h2 class="m-nav-category-title">
        {{ category.title }}
      </h2>
    </div>

    <div v-for="group in category.groups" :key="group.title" class="m-nav-group">
      
      <h3 v-if="group.title && group.title !== category.title" :id="slugify(group.title)" class="m-nav-group-title">
        {{ group.title }}
      </h3>

      <div class="m-nav-links-grid">
        <MNavLink
          v-for="link in group.links"
          :key="link.link"
          v-bind="link"
        />
      </div>
      
      <div v-if="group.links.length === 0" style="color: red; font-size: 12px; padding: 10px;">
        [调试: 该分组下检测到 0 个链接]
      </div>

    </div>
  </div>
</template>

<style scoped>
.m-nav-layout {
  margin-bottom: 40px;
}

.m-nav-category-header {
  margin-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.m-nav-category-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 12px 0;
  padding-top: 20px;
}

.m-nav-group {
  margin-bottom: 24px;
}

.m-nav-group-title {
  font-size: 16px;
  font-weight: 600;
  margin: 16px 0 12px;
  opacity: 0.85;
  padding-left: 8px;
  border-left: 3px solid var(--vp-c-brand);
}

.m-nav-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

@media (min-width: 640px) {
  .m-nav-links-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }
}

@media (min-width: 960px) {
  .m-nav-links-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }
}
</style>
