<template>
    <div class="common-layout">
        <el-container>
            <el-header style="padding-left: 0%;padding-right: 0%">
                <header class="header">
                    <div class="logo" style="margin-left: 20px;">Meeting Management</div>
                    <div class="description">
                        欢迎来到会议室管理系统
                    </div>
                </header>
            </el-header>
            <el-container>
                <el-aside width="300px">

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
                                    <el-menu-item index="2-4">会议总览</el-menu-item>
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
                                    <el-menu-item index="3-1">管理员晋升与调配</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                        </el-menu>
                    </el-scrollbar>

                </el-aside>
                <el-main overflow-y: scroll>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts" name="">
import { ref } from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style scoped>
body,
html {
    margin: 0;
    padding: 0%;
    height: 100%;
    overflow: hidden;
    /* 防止滚动条 */
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    color: white;
    height: 20px;
    animation: gradientAnimation 5s ease infinite;
    /* 渐变背景动画 */
    position: relative;
}

/* Logo 动画 */
.logo {
    font-size: 24px;
    font-weight: bold;
    animation: logoAnimation 5s ease infinite;
    /* Logo 动画 */
}

/* 描述文本样式 */
.description {
    max-width: 600px;
    margin: 0 20px;
    animation: fadeIn 3s ease infinite;
    /* 描述文本淡入动画 */
}

@keyframes gradientAnimation {
    0% {
        background: linear-gradient(270deg, #ff7e5f, #feb47b);
    }

    5% {
        background: linear-gradient(270deg, #ff8361, #feb47b);
    }

    10% {
        background: linear-gradient(270deg, #ff8764, #feb47b);
    }

    15% {
        background: linear-gradient(270deg, #ff8c66, #feb47b);
    }

    20% {
        background: linear-gradient(270deg, #ff9068, #feb47b);
    }

    25% {
        background: linear-gradient(270deg, #ff946b, #feb47b);
    }

    30% {
        background: linear-gradient(270deg, #ff999d, #feb47b);
    }

    35% {
        background: linear-gradient(270deg, #fe9e6f, #feb47b);
    }

    40% {
        background: linear-gradient(270deg, #fea272, #feb47b);
    }

    45% {
        background: linear-gradient(270deg, #fea774, #feb47b);
    }

    50% {
        background: linear-gradient(270deg, #feab76, #feb47b);
    }

    55% {
        background: linear-gradient(270deg, #fea774, #feb47b);
    }

    60% {
        background: linear-gradient(270deg, #fea272, #feb47b);
    }

    65% {
        background: linear-gradient(270deg, #fe9e6f, #feb47b);
    }

    70% {
        background: linear-gradient(270deg, #ff999d, #feb47b);
    }

    75% {
        background: linear-gradient(270deg, #ff946b, #feb47b);
    }

    80% {
        background: linear-gradient(270deg, #ff9068, #feb47b);
    }

    85% {
        background: linear-gradient(270deg, #ff8c66, #feb47b);
    }

    90% {
        background: linear-gradient(270deg, #ff8764, #feb47b);
    }

    95% {
        background: linear-gradient(270deg, #ff8361, #feb47b);
    }

    100% {
        background: linear-gradient(270deg, #ff7e5f, #feb47b);
    }
}

@keyframes logoAnimation {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
        /* Logo 放大效果 */
    }
}
</style>
