<template>
    <div class="aboutMe">
        <div class="title">
            个人信息
        </div>
        <br><br>
        <el-descriptions class="margin-top" border style="padding-left: 10px;padding-right: 30px;">
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <DocumentCopy />
                        </el-icon>
                        <div style="margin-left: 3px;">
                            ID
                        </div>
                    </div>
                </template>
                <!-- @vue-skip -->
                <el-tag type='primary' round style="margin-left: 3px;margin-right: 20px" size="large">{{ selfInfo.userId
                    }}</el-tag>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item" flex>
                        <el-icon>
                            <user />
                        </el-icon>
                        <div style="margin-left: 3px">
                            用户名
                        </div>
                    </div>
                </template>
                <!-- @vue-ignore -->
                <el-input v-model="selfInfo.userName" class="class1" size="large"></el-input>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <DocumentCopy />
                        </el-icon>
                        <div style="margin-left: 3px;">
                            密码
                        </div>
                    </div>
                </template>
                <!-- @vue-ignore -->
                <el-input v-model="selfInfo.userPassword" class="class1"></el-input>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Iphone />
                        </el-icon>
                        <div style="margin-left: 3px;">
                            电话号码
                        </div>
                    </div>
                </template>
                <!-- @vue-ignore -->
                <el-input v-model="selfInfo.userTel" class="class1"></el-input>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Ticket />
                        </el-icon>
                        <div style="margin-left: 3px;">
                            年龄
                        </div>
                    </div>
                </template>
                <!-- @vue-ignore -->
                <el-input v-model="selfInfo.userAge" class="class1"></el-input>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Postcard />
                        </el-icon>
                        <div style="margin-left: 3px;">
                            邮箱
                        </div>
                    </div>
                </template>
                <!-- @vue-ignore -->
                <el-input v-model="selfInfo.userEmail" class="class1"></el-input>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Clock />
                        </el-icon>
                        <div style="margin-left: 3px;">
                            用户创建时间
                        </div>
                    </div>
                </template>
                <!-- @vue-skip -->
                <el-tag type='primary' round style="margin-left: 3px;margin-right: 20px" size="large">{{
                    selfInfo.userCreateTime }}</el-tag>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Clock />
                        </el-icon>
                        <div style="margin-left: 3px;">
                            用户更新时间
                        </div>
                    </div>
                </template>
                <!-- @vue-skip -->
                <el-tag type='primary' round style="margin-left: 3px;margin-right: 20px" size="large">{{
                    selfInfo.userUpdateTime }}</el-tag>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <div style="margin-left: 3px;">
                            超级管理员权限
                        </div>
                    </div>
                </template>
                <!-- @vue-skip -->
                <el-tag :type="tagType.tagTypeD" round style="margin-left: 3px;margin-right: 20px" size="large">{{
                    showFormat.roleDText }}</el-tag>
            </el-descriptions-item>

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
                <el-tag :type="tagType.tagTypeA" round style="margin-left: 3px;margin-right: 20px" size="large">{{
                    showFormat.roleAText }}</el-tag>
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
                <el-tag :type="tagType.tagTypeB" round style="margin-left: 3px;margin-right: 20px" size="large">{{
                    showFormat.roleBText
                    }}</el-tag>
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
                <el-tag :type="tagType.tagTypeC" round style="margin-left: 3px;margin-right: 20px" size="large">{{
                    showFormat.roleCText }}</el-tag>
            </el-descriptions-item>

        </el-descriptions>
    </div>
    <br>
    <div style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px;">
        <el-button type="danger" @click="unSubmit">退出登录</el-button>
        <el-popconfirm width="220" confirm-button-text="确定" cancel-button-text="算了" icon-color="#626AEF"
            title="你确定要进行信息修改吗?" @confirm="changeInfo">
            <template #reference>
                <el-button type="primary" @click="">提交个人信息的修改</el-button>
            </template>
        </el-popconfirm>
    </div>

    <el-dialog v-model=" dialogFormVisible" title="登录" width="300" align-center style="font-weight: bold"
        :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form :model="loginData" label-width="auto" style="max-width: 400px" class="login-form">
            <el-form-item label="账号">
                <el-input v-model="loginData.userId" :disabled="tokenStore.isLogin" placeholder='请输入账号' />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginData.userPassword" :disabled="tokenStore.isLogin" placeholder='请输入密码'
                    show-password />
            </el-form-item>
            <div style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px;">
                <el-button type="primary" @click="onSubmit" :disabled="tokenStore.isLogin">登录</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts" name="AboutMe">
import { adminLoginService } from '@/api/user';
import { computed, onMounted, ref, watch } from 'vue';
import { useTokenStore } from '@/stores/token';
import { ElMessage } from 'element-plus';
import { Avatar } from '@element-plus/icons-vue'
const tokenStore = useTokenStore()
// 注册界面
const dialogFormVisible = ref(false)

// 登录表
let loginData = ref({
    userId: ref(),
    userPassword: ref<string>("")
})
// 登录按钮
const onSubmit = () => {
    tokenStore.setToken(loginAdmin())
}
// 退出登录
const unSubmit = () => {
    tokenStore.removeToken()
    tokenStore.removeUserId()
    ElMessage.success("退出成功");
    tokenStore.loginFailure()
    selfInfo.value = {}
}

// 登录校验
const loginAdmin = async () => {
    try {
        let result = await adminLoginService(loginData.value);

        if (result.data.code === 1) {
            ElMessage.success("登录成功");
            dialogFormVisible.value = false
            tokenStore.loginSuccess()
            tokenStore.setToken(result.data.data);
            tokenStore.setUserId(loginData.value.userId)
            getInfo(tokenStore.userId)
            window.location.reload()
        }
    } catch (error) {
        // 处理网络错误或其他异常情况
        console.error("账号或密码错误:", error);
        ElMessage.error("账号或密码错误，请稍后再试");
    }
};
// 个人信息修改的提交
import { updateUserByAnyParams } from '@/api/user';
const changeInfo = async () => {
    let res = updateUserByAnyParams(selfInfo.value)
    if ((await res).data.code === 0) {
        ElMessage.error("你的用户名已存在,换一个试试吧")
    } else {
        ElMessage.success("修改成功,请仔细确定当前的修改内容")
        let res = selectUserById(tokenStore.userId)
        selfInfo.value = (await res).data.data
    }
}

// 个人信息
let selfInfo = ref({})
// 拿到信息
import { selectUserById } from '@/api/user';
const getInfo = async (userId: any) => {
    let res = selectUserById(userId)
    selfInfo.value = (await res).data.data
}
// 入场加载
onMounted(async () => {
    if (tokenStore.token != '') {
        let res = selectUserById(tokenStore.userId)
        selfInfo.value = (await res).data.data
    } else {
        dialogFormVisible.value = true
    }
})

// 展示锁定
let showFormat = ref({
    roleAText: ref<string>(''),
    roleBText: ref<string>(''),
    roleCText: ref<string>(''),
    roleDText: ref<string>('')
})
// @ts-ignore
showFormat.value.roleAText = computed(() => {
    // @ts-ignore
    return selfInfo.value.userRoleA == 1 ? '有权限' : '无权限'
})
// @ts-ignore
showFormat.value.roleBText = computed(() => {
    // @ts-ignore
    return selfInfo.value.userRoleB == 1 ? '有权限' : '无权限'
})
// @ts-ignore
showFormat.value.roleCText = computed(() => {
    // @ts-ignore
    return selfInfo.value.userRoleC == 1 ? '有权限' : '无权限'
})
// @ts-ignore
showFormat.value.roleDText = computed(() => {
    // @ts-ignore
    return selfInfo.value.userSuperAdmin == 1 ? '有权限' : '无权限'
})
let tagType = ref({
    tagTypeA: ref<string>(''),
    tagTypeB: ref<string>(''),
    tagTypeC: ref<string>(''),
    tagTypeD: ref<string>('')
})
// @ts-ignore
tagType.value.tagTypeA = computed(() => {
    // @ts-ignore
    return selfInfo.value.userRoleA == 1 ? 'success' : 'danger'
})

// @ts-ignore
tagType.value.tagTypeB = computed(() => {
    // @ts-ignore
    return selfInfo.value.userRoleB == 1 ? 'success' : 'danger'
})

// @ts-ignore
tagType.value.tagTypeC = computed(() => {
    // @ts-ignore
    return selfInfo.value.userRoleC == 1 ? 'success' : 'danger'
})

// @ts-ignore
tagType.value.tagTypeD = computed(() => {
    // @ts-ignore
    return selfInfo.value.userSuperAdmin == 1 ? 'success' : 'danger'
})

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

.class1:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;
    width: 100px
}
</style>
