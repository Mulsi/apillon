<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  Tabs: {
    barColor: '#f9ff73',
  },
  Upload: {
    draggerColor: '#1e212b',
    itemTextColor: '#d4d5c2',
    draggerBorderHover: '1px dashed #f9fe74',
  },
  Card: {
    color: 'transparent',
    borderColor: 'none',
    textColor: '#d4d5c2',
  },
  Skeleton: {
    color: '#1e212b',
    colorEnd: '#1e212b',
  },
  Button: {
    colorHover: '#f9fe74',
    textColor: '#141621',
    textColorHover: '#141621',
    borderHover: 'none',
    borderFocus: 'none',
    fontWeight: 'bold',
  }
}
</script>