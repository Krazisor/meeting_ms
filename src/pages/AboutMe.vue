<template>
    <div class="aboutMe">
        <el-form :model="loginData" label-width="auto" style="max-width: 400px">
            <el-form-item label="账号">
                <el-input v-model="loginData.userId" :disabled="tokenStore.isLogin" placeholder='请输入账号' />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginData.userPassword" :disabled="tokenStore.isLogin" placeholder='请输入密码'
                    show-password />
            </el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="tokenStore.isLogin">登录</el-button>
            <el-button type="danger" @click="unSubmit" :disabled="!tokenStore.isLogin">退出</el-button>
        </el-form>
    </div>
</template>

<script setup lang = "ts" name = "AboutMe">
import { adminLoginService } from '@/api/user';
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';
import { ElMessage } from 'element-plus';
const tokenStore = useTokenStore()
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
}

// 登录校验
const loginAdmin = async () => {
    try {
        let result = await adminLoginService(loginData.value);

        if (result.data.code === 1) {
            ElMessage.success("登录成功");
            tokenStore.loginSuccess()
            tokenStore.setToken(result.data.data);
            tokenStore.setUserId(loginData.value.userId)
        }
    } catch (error) {
        // 处理网络错误或其他异常情况
        console.error("账号或密码错误:", error);
        ElMessage.error("账号或密码错误，请稍后再试");
    }
};
</script>

<style scoped></style>
