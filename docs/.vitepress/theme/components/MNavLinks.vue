<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../../nav/data'
import MNavLink from './MNavLink.vue'

// 类型守卫：判断是否为分组
const isGroup = (item: any) => {
  return item && Array.isArray(item.items)
}

const formattedData = computed(() => {
  return NAV_DATA.map((category) => {
    // 获取该大分类下的所有内容
    const allItems = category.items || []
    
    // 核心修复：将数据拆分为 "分组列表" 和 "散装链接列表"
    const groups = allItems.filter(item => isGroup(item))
    const miscLinks = allItems.filter(item => !isGroup(item))

    return {
      title: category.title,
      slug: slugify(category.title),
      groups,     // 子文件夹 (二级分类)
      miscLinks   // 散装链接 (直接归属于大分类的链接)
    }
  })
})
</script>

<template>
  <div v-for="category in formattedData" :key="category.title" :id="category.slug" class="m-nav-category">
    
    <div class="m-nav-header">
      <h2 class="m-nav-title">{{ category.title }}</h2>
    </div>

    <div class="m-nav-content">
      
      <div v-if="category.miscLinks.length > 0" class="m-nav-grid m-nav-misc">
        <MNavLink
          v-for="link in category.miscLinks"
          :key="link.link"
          v-bind="link"
        />
      </div>

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
  margin: 24px 0 12px; /* 增加一点上间距，让分组更明显 */
  padding-left: 10px;
  border-left: 4px solid var(--vp-c-brand);
  opacity: 0.9;
}

/* 统一的网格布局 */
.m-nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

/* 散装链接区域底部增加一点间距，如果下面紧接着有分组的话 */
.m-nav-misc {
  margin-bottom: 30px;
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
