<template>
    <div class="layout-container-demo" style="overflow: hidden;">
      <el-container>
  
        <el-header min-height="8vh" style="padding: 0%">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="position: fixed; z-index: 10 ;width: 100%;">

            <el-menu-item index="1">
              <RouterLink to="/audit" :style="{ textDecoration: 'none' }">会议室审核</RouterLink>
            </el-menu-item>
  
            <el-menu-item index="2">
              <RouterLink to="/auditManage" :style="{ textDecoration: 'none' }">审核管理</RouterLink>
            </el-menu-item>
  
            <el-menu-item index="3">
              <RouterLink to="/user" :style="{ textDecoration: 'none' }">用户管理</RouterLink>
            </el-menu-item>
  
            <el-menu-item index="4">
              <RouterLink to="/meeting" :style="{ textDecoration: 'none' }">会议室管理</RouterLink>
            </el-menu-item>
            
          </el-menu>
        </el-header>
  
  
        <el-main style="padding: 0%;">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  
  </script>
  
  <style scoped>
  </style>
  