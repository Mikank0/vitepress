<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../../nav/data'
import MNavLink from './MNavLink.vue'

/**
 * 数据处理核心逻辑：
 * 无论 data.ts 是什么结构，都统一标准化为：
 * Category -> Groups -> Items
 */
const formattedData = computed(() => {
  return NAV_DATA.map((category) => {
    // 1. 获取这个分类下的 items
    const rawItems = category.items || []
    
    // 2. 智能判断：这是 "链接列表" 还是 "子分组列表"？
    // 只要第一个元素包含 'items' 属性，我们就认为它是子分组 (Group)
    const isGroup = rawItems.length > 0 && 'items' in rawItems[0]

    let groups = []
    
    if (isGroup) {
      // 情况 A：三级结构 (Shanghaitech -> 课程网站 -> 链接)
      // 直接使用，不做修改
      groups = rawItems
    } else {
      // 情况 B：二级结构 (Shanghaitech -> 链接)
      // 手动包装成一个“默认分组”，让它适应三级渲染逻辑
      groups = [{
        title: '', // 空标题，表示这是直接归属于大分类的
        items: rawItems
      }]
    }

    return {
      title: category.title,
      slug: slugify(category.title),
      groups: groups
    }
  })
})
</script>

<template>
  <div v-for="category in formattedData" :key="category.title" :id="category.slug" class="m-nav-category">
    
    <div class="m-nav-header">
      <h2 class="title">{{ category.title }}</h2>
    </div>

    <div v-for="(group, index) in category.groups" :key="index" class="m-nav-group">
      
      <h3 v-if="group.title && group.title !== category.title" 
          :id="slugify(group.title)" 
          class="sub-title">
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

.m-nav-header .title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 10px 0;
  padding-top: 20px;
}

.m-nav-group {
  margin-bottom: 30px;
}

.sub-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 15px 0;
  padding-left: 10px;
  border-left: 4px solid var(--vp-c-brand);
  opacity: 0.9;
}

/* 网格布局：自动适应宽度 */
.m-nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
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
