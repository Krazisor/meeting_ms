<template>
    <div class="adminManage">
        <div class="title">
            管理员中心
        </div>
        <!-- 筛选框 -->
        <div class="mb-4" style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px;">
            <el-button type="primary" :icon="Search" @click="selectInfo" class="blue-button"
                style="font-weight: bold">查询用户</el-button>
        </div>

        <!-- 内容展示 -->
        <el-table :data="tableData" size='large' style="width: 100%;" border>
            <el-table-column fixed prop="userId" label="用户ID" min-width="80" />
            <el-table-column prop="userName" label="用户名" min-width="140" />
            <el-table-column label="用户管理权限" min-width="110">
                <template #default="{ row }">
                    <span :style="{ color: row.userRoleA === 1 ? 'green' : 'red' }">
                        {{ row.userRoleA === 1 ? '有权限' : '无权限' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="会议管理权限" min-width="110">
                <template #default="{ row }">
                    <span :style="{ color: row.userRoleB === 1 ? 'green' : 'red' }">
                        {{ row.userRoleB === 1 ? '有权限' : '无权限' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="管理员管理权限" min-width="110">
                <template #default="{ row }">
                    <span :style="{ color: row.userRoleC === 1 ? 'green' : 'red' }">
                        {{ row.userRoleC === 1 ? '有权限' : '无权限' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="超级管理员权限" min-width="110">
                <template #default="{ row }">
                    <span :style="{ color: row.userSuperAdmin === 1 ? 'green' : 'red' }">
                        {{ row.userSuperAdmin === 1 ? '有权限' : '无权限' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="userCreateTime" label="用户创建时间" :formatter="formatter" min-width="130" />
            <el-table-column prop="userUpdateTime" label="用户更新时间" :formatter="formatter" min-width="130" />
            <el-table-column fixed="right" label="操作" min-width="120">

                <template #default="row">
                    <el-button link type="primary" size="default" plain @click="changeButton(row)"
                        style="font-weight: bold">
                        修改
                    </el-button>
                    <el-button link type="danger" size="default" plain @click="deleteButton(row)"
                        style="font-weight: bold">
                        删除
                    </el-button>
                </template>

            </el-table-column>
        </el-table>
        <br>
        <!-- 分页 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
            background layout="sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :total="total" style="font-weight: bold" />
    </div>
</template>

<script setup lang = "ts" name = "AdminManage">
import { ElMessage } from 'element-plus'
import { Search, Upload } from '@element-plus/icons-vue'
import { getUserByParamsAndPage } from '@/api/user';
import { onBeforeMount, ref } from 'vue';


// 显示界面时间规范化
const formatter = function (row: any, column: any, cellValue: any, index: any) {
    if (typeof cellValue === 'string' && cellValue.includes('T')) {
        return cellValue.split('T')[0];
    }
    return cellValue;
}

// 分页栏
let currentPage = ref(1) // 当前页
let pageSize = ref(10) // 每页条数
let total = ref(10)
let userId = ref()
let userName = ref<string>('')
// 渲染表格
onBeforeMount(async () => {
    tableData.value = (await userList()).data.data.rows
})

const userList = async () => {
    let params = {
        page: currentPage.value,
        pageSize: pageSize.value,
        userId: userId.value ? userId.value : null,
        userName: userName.value ? userName.value : null,
        userAge: null,
        userTel: null,
        userEmail: null
    }
    let result = await getUserByParamsAndPage(params)
    total = result.data.data.total
    return result
}

const handleSizeChange = async () => {
    tableData.value = (await userList()).data.data.rows
}
const handleCurrentChange = async () => {
    tableData.value = (await userList()).data.data.rows
}

let tableData = ref([])
</script>

<style scoped>
.title {
    margin-left: 10px;
    /* 左边距 */
    margin-top: 20px;
    /* 上边距 */
    font-weight: bold;
    /* 字体加粗 */
    font-size: 40px;
    /* 字体大小 */
    color: #2c5d9d;
    /* 字体颜色 */
    text-align: left;
    /* 左对齐 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    /* 添加轻微的阴影效果 */
    transition: color 0.3s;
    /* 字体颜色过渡效果 */
}

/* 鼠标悬停效果 */
.title:hover {
    color: #1a3e6d;
    /* 悬停时的字体颜色 */
}

</style>
