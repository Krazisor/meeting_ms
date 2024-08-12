<template>
    <div class="adminManage">
        <div class="title">
            管理员中心
        </div>
        <!-- 筛选框 -->
        <div class="mb-4" style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px;">
            <el-button type="primary" :icon="Search" @click="selectInfo" class="gradient-button"
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
                        修改权限
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

    <!-- 查询用户的弹出框 -->
    <el-dialog v-model="dialogFormVisible" title="用户筛选(可选)" width="400" align-center style="font-weight: bold">
        <el-form width="">
            <el-form-item label="用户ID" label-width="120px">
                <el-input v-model="userId" autocomplete="off" placeholder="请输入请求ID" clearable />
            </el-form-item>
            <el-form-item label="用户名" label-width="120px">
                <el-input v-model="userName" autocomplete="off" placeholder="请输入用户ID" clearable />
            </el-form-item>
            <el-form-item label="用户管理权限" prop="roleA" label-width="120px">
                <el-segmented v-model="RoleA" :options="rolesOptions" />
            </el-form-item>
            <el-form-item label="会议管理权限" prop="roleB" label-width="120px">
                <el-segmented v-model="RoleB" :options="rolesOptions" />
            </el-form-item>
            <el-form-item label="管理员管理权限" prop="roleC" label-width="120px">
                <el-segmented v-model="RoleC" :options="rolesOptions" />
            </el-form-item>
            <el-form-item label="超级管理员权限" prop="roleD" label-width="120px">
                <el-segmented v-model="SuperAdmin" :options="rolesOptions" />
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false" style="font-weight: bold">取消</el-button>
                <el-button type="danger" @click="cleanParams" style="font-weight: bold">清空</el-button>
                <el-button type="primary" @click="formSelectChange" style="font-weight: bold">
                    查询
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 修改权限弹出框 -->
    <el-dialog v-model="changeVisible" title="修改权限" width="500" align-center style="font-weight: bold">
        <el-form width="">
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <DocumentCopy />
                            </el-icon>
                            <div style="margin-left: 3px;">
                                用户ID
                            </div>
                        </div>
                    </template>
                    <!-- @vue-skip -->
                    <el-tag type='success' round style="margin-left: 3px;margin-right: 20px">{{ rowNow.userId
                        }}</el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            <div style="margin-left: 3px;">
                                用户名
                            </div>
                        </div>
                    </template>
                    <!-- @vue-skip -->
                    <el-tag type='primary' round style="margin-left: 3px;margin-right: 20px">{{ rowNow.userName
                        }}</el-tag>
                </el-descriptions-item>
            </el-descriptions>

            <el-descriptions class="margin-top" :column="1" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <View />
                            </el-icon>
                            <div style="margin-left: 3px;">
                                用户管理权限
                            </div>
                        </div>
                    </template>
                    <!-- @vue-skip -->
                    <el-segmented v-model="innerRoleA" :options="innerRolesOptions" />
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <HomeFilled />
                            </el-icon>
                            <div style="margin-left: 3px;">
                                会议管理权限
                            </div>
                        </div>
                    </template>
                    <!-- @vue-skip -->
                    <el-segmented v-model="innerRoleB" :options="innerRolesOptions" />
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <HelpFilled />
                            </el-icon>
                            <div style="margin-left: 3px;">
                                管理员管理权限
                            </div>
                        </div>
                    </template>
                    <!-- @vue-skip -->
                    <el-segmented v-model="innerRoleC" :options="innerRolesOptions" />
                </el-descriptions-item>
            </el-descriptions>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="changeVisible = false" style="font-weight: bold">取消</el-button>
                <el-button type="primary" @click="formChange" style="font-weight: bold">
                    修改
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup lang = "ts" name = "AdminManage">
import { ElMessage } from 'element-plus'
import { Search, Upload } from '@element-plus/icons-vue'
import { adminGetUserByParamsAndPage } from '@/api/user';
import { onBeforeMount, reactive, ref, watch } from 'vue';


// 显示界面时间规范化
const formatter = function (row: any, column: any, cellValue: any, index: any) {
    if (typeof cellValue === 'string' && cellValue.includes('T')) {
        return cellValue.split('T')[0];
    }
    return cellValue;
}

// 多选框中间元素
let RoleA = ref('不限')
let RoleB = ref('不限')
let RoleC = ref('不限')
let SuperAdmin = ref('不限')
// 查询用户弹出框
const dialogFormVisible = ref(false)
// 查询用户的按钮逻辑
const selectInfo = () => {
    dialogFormVisible.value = true   
}
// 复选框
const rolesOptions = ['有权限','不限','无权限']
// 清空参数
const cleanParams = () => {
    userId.value = undefined
    userName.value = ''
    userRoleA.value = undefined
    userRoleB.value = undefined
    userRoleC.value = undefined
    userSuperAdmin.value = undefined
    RoleA.value = '不限'
    RoleB.value = '不限'
    RoleC.value = '不限'
    SuperAdmin.value = '不限'
}
// 查询按钮确定逻辑
const formSelectChange = async () => {
    tableData.value = (await userList()).data.data.rows
    dialogFormVisible.value = false
    ElMessage.success("查询成功")
}

// 修改权限弹出框
const changeVisible = ref(false)
// 当前行
let rowNow = ref({})
// 绑定值
let innerRoleA = ref()
let innerRoleB = ref()
let innerRoleC = ref()
// 修改权限按钮操作逻辑
const changeButton = (row: any) => { 
    rowNow.value = row.row
    // @ts-ignore
    innerRoleA.value = rowNow.value.userRoleA ? '有权限' : "无权限"
    // @ts-ignore
    innerRoleB.value = rowNow.value.userRoleB ? '有权限' : "无权限"
    // @ts-ignore
    innerRoleC.value = rowNow.value.userRoleC ? '有权限' : "无权限"
    changeVisible.value = true
}
// 修改权限复选框
const innerRolesOptions = ['有权限', '无权限']
// 修改权限确定键
import { updateRoleByUserAndId } from '@/api/user';
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()
const formChange = async () => {
    let params = reactive({
        myUserId: tokenStore.userId,
        user: reactive({
            // @ts-ignore
            userId: rowNow.value.userId,
            userRoleA: innerRoleA.value == '有权限' ? 1 : 0,
            userRoleB: innerRoleB.value == '有权限' ? 1 : 0,
            userRoleC: innerRoleC.value == '有权限' ? 1 : 0,
            // @ts-ignore
            userSuperAdmin: rowNow.value.userSuperAdmin
        })
    })
    let res = updateRoleByUserAndId(params)
    if ((await res).data.code === 1) {
        changeVisible.value = false
        handleCurrentChange()
        ElMessage.success("权限修改成功")
    } else {
        ElMessage.error("你无权进行该修改")
    }
}



// 分页栏
let currentPage = ref(1) // 当前页
let pageSize = ref(10) // 每页条数
let total = ref(10)
let userId = ref()
let userName = ref<string>('')
let userRoleA = ref()
let userRoleB = ref()
let userRoleC = ref()
let userSuperAdmin = ref()
// 监听
watch(RoleA, (newVal) => {
    if (newVal === '有权限') {
        userRoleA.value = 1;
    } else if (newVal === '无权限') {
        userRoleA.value = 0;
    } else {
        userRoleA.value = undefined;
    }
});

watch(RoleB, (newVal) => {
    if (newVal === '有权限') {
        userRoleB.value = 1;
    } else if (newVal === '无权限') {
        userRoleB.value = 0;
    } else {
        userRoleB.value = undefined;
    }
});

watch(RoleC, (newVal) => {
    if (newVal === '有权限') {
        userRoleC.value = 1;
    } else if (newVal === '无权限') {
        userRoleC.value = 0;
    } else {
        userRoleC.value = undefined;
    }
});

watch(SuperAdmin, (newVal) => {
    if (newVal === '有权限') {
        userSuperAdmin.value = 1;
    } else if (newVal === '无权限') {
        userSuperAdmin.value = 0;
    } else {
        userSuperAdmin.value = undefined;
    }
});
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
        userRoleA: userRoleA.value,
        userRoleB: userRoleB.value,
        userRoleC: userRoleC.value,
        userSuperAdmin: userSuperAdmin.value 
    }
    let result = await adminGetUserByParamsAndPage(params)
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
.cell-item {
    display: flex;
    align-items: center;
}
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

.gradient-button {
    background: linear-gradient(270deg, #169bd4, #db74e0);
    /* 绿色渐变 */
    border: none;
    /* 去掉默认边框 */
    color: white;
    /* 文字颜色 */
    transition: background 0.3s, transform 0.3s;
    /* 动画过渡效果 */
}

.gradient-button:hover {
    background: linear-gradient(270deg, #19b4f6, #ed55f8);
    /* 悬停时的渐变效果 */
    transform: translateY(-2px);
    /* 悬停时向上移动 */
}

</style>
