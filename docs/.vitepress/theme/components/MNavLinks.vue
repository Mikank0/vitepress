<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../../nav/data'
import MNavLink from './MNavLink.vue'

// 定义类型检查函数
const isGroup = (item: any) => {
  // 如果一个对象有 'items' 数组，那它肯定是个分组
  return item && Array.isArray(item.items)
}

const formattedData = computed(() => {
  return NAV_DATA.map((category) => {
    return {
      title: category.title,
      slug: slugify(category.title),
      // 我们把原来的 items 原封不动地传下去，交给模板层去判断
      children: category.items || [] 
    }
  })
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
// ... 其他导入

const processedData = computed(() => {
  return formattedData.value.map(category => {
    const groups = category.children.filter(isGroup)
    const miscItems = category.children.filter(item => !isGroup(item))
    
    return {
      ...category,
      groups,
      miscItems,
      hasGroups: groups.length > 0
    }
  })
})
</script>

<template>
  <div v-for="category in processedData" :key="category.title" :id="category.slug" class="m-nav-category">
    
    <div class="m-nav-header">
      <h2 class="m-nav-title">{{ category.title }}</h2>
    </div>
    <div class="m-nav-content">
      
      <!-- 没有分组时：直接渲染所有链接 -->
      <div v-if="!category.hasGroups" class="m-nav-grid">
        <MNavLink
          v-for="item in category.children"
          :key="item.link"
          v-bind="item"
        />
      </div>
      
      <!-- 有分组时：分别渲染 -->
      <template v-else>
        <!-- 未分组的零散项 -->
        <div v-if="category.miscItems.length > 0" class="m-nav-grid m-nav-misc">
          <MNavLink
            v-for="item in category.miscItems"
            :key="item.link"
            v-bind="item"
          />
        </div>
        
        <!-- 所有分组 -->
        <div v-for="group in category.groups" :key="group.title" class="m-nav-group">
          <h3 class="m-nav-subtitle" :id="slugify(group.title)">
            {{ group.title }}
          </h3>
          <div class="m-nav-grid">
            <MNavLink
              v-for="link in group.items"
              :key="link.link"
              v-bind="link"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.m-nav-category {
  margin-bottom: 60px;
}

.m-nav-header {
  margin-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.m-nav-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 10px 0;
  padding-top: 20px;
}

.m-nav-group {
  margin-bottom: 24px;
}

.m-nav-subtitle {
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0 12px;
  padding-left: 10px;
  border-left: 4px solid var(--vp-c-brand);
  opacity: 0.9;
}

/* 链接网格布局 */
.m-nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

/* 针对散装链接的微调 */
.m-nav-misc {
  margin-bottom: 10px;
}

@media (min-width: 640px) {
  .m-nav-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
  }
}

@media (min-width: 960px) {
  .m-nav-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}
</style>
