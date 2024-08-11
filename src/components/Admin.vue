<template>
    <div class="common-layout">
        <el-container>
            <el-header style="padding-left: 0%;padding-right: 0%;">
                <header class="header">
                    <div class="logo" style="margin-left: 20px;">Meeting Management</div>
                    <div class="description">
                        欢迎来到会议室管理系统
                    </div>
                </header>
            </el-header>

            <el-container>
                <el-aside class="fixed-aside" style="width: 277px;">
                    <el-scrollbar>
                        <el-menu>
                            <el-sub-menu index="0">
                                <template #title>
                                    <el-icon>
                                        <Avatar />
                                    </el-icon>个人信息
                                </template>
                                <el-menu-item-group>
                                    <template #title>个人信息展示</template>

                                    <RouterLink to="/aboutMe" :style="{ textDecoration: 'none' }">
                                        <el-menu-item index="0-1">
                                            关于我的
                                        </el-menu-item>
                                    </RouterLink>
                                </el-menu-item-group>

                            </el-sub-menu>

                            <el-sub-menu index="1">
                                <template #title>
                                    <el-icon>
                                        <User />
                                    </el-icon>用户管理
                                </template>
                                <el-menu-item-group>
                                    <template #title>用户信息的相关操作</template>

                                    <RouterLink to="/user" :style="{ textDecoration: 'none' }">
                                        <el-menu-item index="1-1">
                                            用户列表
                                        </el-menu-item>
                                    </RouterLink>
                                </el-menu-item-group>

                            </el-sub-menu>
                            <el-sub-menu index="2">
                                <template #title>
                                    <el-icon>
                                        <Message />
                                    </el-icon>会议管理
                                </template>
                                <el-menu-item-group>
                                    <template #title>会议审核与会议室管理</template>
                                    <RouterLink to="/meeting" :style="{ textDecoration: 'none' }">
                                        <el-menu-item index="2-1">会议室管理</el-menu-item>
                                    </RouterLink>
                                    <RouterLink to="/audit" :style="{ textDecoration: 'none' }">
                                        <el-menu-item index="2-2">会议审核</el-menu-item>
                                    </RouterLink>
                                    <RouterLink to="/auditManage" :style="{ textDecoration: 'none' }">
                                        <el-menu-item index="2-3">会议管理</el-menu-item>
                                    </RouterLink>
                                    <RouterLink to="/meetingView" :style="{ textDecoration: 'none' }">
                                        <el-menu-item index="2-4">会议总览</el-menu-item>
                                    </RouterLink>
                                </el-menu-item-group>
                            </el-sub-menu>

                            <el-sub-menu index="3">
                                <template #title>
                                    <el-icon>
                                        <setting />
                                    </el-icon>管理员管理
                                </template>
                                <el-menu-item-group>
                                    <template #title>有关管理员与管理权限</template>
                                    <RouterLink to="/adminManage" :style="{ textDecoration: 'none' }">
                                        <el-menu-item index="3-1">管理员晋升与调配</el-menu-item>
                                    </RouterLink>
                                </el-menu-item-group>
                            </el-sub-menu>
                        </el-menu>
                    </el-scrollbar>
                </el-aside>

                <el-main overflow-y: scroll class="content">
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts" name="">

</script>

<style scoped>

/* 顶栏样式 */
.header {
    display: flex;
    /* 使用 Flexbox 布局 */
    align-items: center;
    /* 垂直居中对齐 */
    justify-content: space-between;
    /* 水平两端对齐 */
    background-color: #1f77d5;
    /* 背景颜色 */
    color: #ffffff;
    /* 字体颜色 */
    padding: 14px 20px;
    /* 内边距 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
    position: fixed;
    /* 固定定位 */
    top: 0;
    /* 顶部对齐 */
    left: 0;
    /* 左侧对齐 */
    right: 0;
    /* 右侧对齐 */
    z-index: 1000;
    /* 确保在其他元素之上 */
}

/* Logo 样式 */
.logo {
    font-size: 24px;
    /* 字体大小 */
    font-weight: bold;
    /* 加粗字体 */
}

/* 描述文本样式 */
.description {
    font-size: 16px;
    /* 字体大小 */
    font-weight: 300;
    /* 轻字体 */
    opacity: 0.9;
    /* 轻微透明效果 */
}

.fixed-header {
    position: fixed;
    /* 固定定位 */
    top: 0;
    /* 顶部对齐 */
    left: 0;
    /* 左侧对齐 */
    right: 0;
    /* 右侧对齐 */
    z-index: 1000;
    /* 确保在其他元素之上 */
}
/* container */
.content {
    margin-left: 275px;
    /* 为了避免内容被固定的侧边栏遮挡，设置左边距 */
    padding-left: 20px;
    /* 内容的内边距 */
    background-color: #f8f9fa;
    /* 内容区域背景颜色 */
}


/* aside */
.fixed-aside {
    position: fixed;
    /* 固定定位 */
    left: 0;
    /* 左侧对齐 */
    height: calc(100% - 60px);
    /* 计算高度，减去头部的高度 */
    overflow-y: auto;
    /* 允许垂直滚动 */
    background-color: #ffffff;
    /* 背景颜色 */
    border-right: 1px solid #e0e0e0;
    /* 边框颜色 */
    z-index: 999;
    /* 确保在其他元素之上 */
}
/* 侧栏容器样式 */
.el-scrollbar {
    width: 275px;
    /* 侧栏宽度 */
    background-color: #f8f9fa;
    /* 背景颜色 */
    border-right: 1px solid #dee2e6;
    /* 边框颜色 */
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
}

/* 菜单标题样式 */
.el-menu {
    border: none;
    /* 去掉默认边框 */
}

/* 子菜单标题样式 */
.el-sub-menu {
    background-color: #f8f9fa;
    /* 子菜单背景颜色 */
}

/* 子菜单标题 hover 状态 */
.el-sub-menu:hover {
    background-color: #e9ecef;
    /* hover 状态颜色 */
}

/* 菜单项样式 */
.el-menu-item {
    padding: 12px 20px;
    /* 内边距 */
    color: #495057;
    /* 字体颜色 */
    transition: background-color 0.3s, color 0.3s;
    /* 背景颜色和字体颜色过渡效果 */
}

/* 菜单项 hover 状态 */
.el-menu-item:hover {
    background-color: #e2e6ea;
    /* hover 状态背景颜色 */
    color: #007bff;
    /* hover 状态字体颜色 */
}

/* 菜单项选中状态 */
.el-menu-item.is-active {
    background-color: #007bff;
    /* 选中状态背景颜色 */
    color: #ffffff;
    /* 选中状态字体颜色 */
}

/* 确保选中状态不被 hover 状态覆盖 */
.el-menu-item.is-active:hover {
    background-color: #0056b3;
    /* 保持选中状态背景颜色 */
    color: #ffffff;
    /* 保持选中状态字体颜色 */
}

/* 菜单图标样式 */
.el-icon {
    margin-right: 10px;
    /* 图标与文本之间的间距 */
    color: #007bff;
    /* 图标颜色 */
}

/* 子菜单项标题样式 */
.el-menu-item-group {
    padding: 10px 20px;
    /* 内边距 */
    color: #6c757d;
    /* 字体颜色 */
    font-weight: bold;
    /* 加粗字体 */
}

/* 子菜单项标题 hover 状态 */
.el-menu-item-group:hover {
    color: #495057;
    /* hover 状态字体颜色 */
}

/* 子菜单项的背景颜色 */
.el-menu-item-group:hover .el-menu-item {
    background-color: #e9ecef;
    /* 子菜单项 hover 状态背景颜色 */
}

/* 额外的分隔线样式 */
.el-menu-item-group+.el-menu-item-group {
    border-top: 1px solid #dee2e6;
    /* 分隔线 */
    margin-top: 10px;
    /* 分隔线与上方的间距 */
}
</style>
