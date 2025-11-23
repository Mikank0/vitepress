<script setup lang="ts">
import { computed, ref } from 'vue'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../../nav/data'
import MNavLink from './MNavLink.vue'

// 类型守卫
const isGroup = (item: any) => {
  return item && Array.isArray(item.items)
}

// 处理数据
const formattedData = computed(() => {
  return NAV_DATA.map((category) => {
    const allItems = category.items || []
    const groups = allItems.filter(item => isGroup(item))
    const miscLinks = allItems.filter(item => !isGroup(item))

    return {
      title: category.title,
      slug: slugify(category.title),
      groups,
      miscLinks
    }
  })
})

// 折叠状态管理
// 使用一个 Set 来存储 "已展开" 的分组 ID
// 默认情况下 Set 是空的，表示所有分组都是折叠的
const expandedGroups = ref(new Set<string>())

const toggleGroup = (groupId: string) => {
  if (expandedGroups.value.has(groupId)) {
    expandedGroups.value.delete(groupId)
  } else {
    expandedGroups.value.add(groupId)
  }
}

// 辅助函数：判断是否展开
const isExpanded = (groupId: string) => expandedGroups.value.has(groupId)
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
        
        <h3 
          class="m-nav-subtitle" 
          :id="slugify(group.title)"
          @click="toggleGroup(category.title + '-' + group.title)"
          title="点击展开/折叠"
        >
          <span class="subtitle-text">{{ group.title }}</span>
          
          <span class="toggle-icon" :class="{ rotated: isExpanded(category.title + '-' + group.title) }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </h3>
        
        <transition name="fade">
          <div 
            v-show="isExpanded(category.title + '-' + group.title)" 
            class="m-nav-grid"
          >
            <MNavLink
              v-for="link in group.items"
              :key="link.link"
              v-bind="link"
            />
          </div>
        </transition>

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
  margin-bottom: 10px;
}

/* 子标题样式：变成可点击的按钮 */
.m-nav-subtitle {
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0;
  padding: 8px 12px;
  padding-left: 10px;
  border-left: 4px solid var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft); /* 给标题加个背景，更像按钮 */
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 文字左对齐，箭头右对齐 */
  transition: background-color 0.2s;
  user-select: none; /* 防止点击时选中文本 */
}

.m-nav-subtitle:hover {
  background-color: var(--vp-c-bg-mute);
}

.subtitle-text {
  flex-grow: 1;
}

/* 箭头图标动画 */
.toggle-icon {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  opacity: 0.6;
}

.toggle-icon.rotated {
  transform: rotate(180deg); /* 展开时旋转180度 */
}

/* 网格布局 */
.m-nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 25px; /* 展开后的底部间距 */
  padding-left: 5px; /* 稍微缩进一点 */
}

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

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
