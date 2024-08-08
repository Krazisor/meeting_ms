//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({ baseURL })
import { useTokenStore } from "@/stores/token"
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'
import { useRouter } from 'vue-router';
// 添加请求拦截器
// instance.interceptors.request.use(
//     (config) => {
//         // 请求前的回调
//         // 添加token
//         const tokenStore = useTokenStore();
//         console.log(tokenStore.tokenStore)
//         if (tokenStore.token) {
//             config.headers.Authorization = tokenStore.token
//         }
//         return config;
//     },
//     (err) => {
//         Promise.reject(err);
//     },

// )

// 添加响应拦截器
// instance.interceptors.response.use(
//     result => {
//         if (result.data.code === 0) {
//             return result.data
//         }
//         ElMessage({
//             message: result.data.msg ? result.data.msg : "操作失败",
//             type: 'error',
//         })
//         return Promise.reject(result.data)
//     },
//     err => {
//         ElMessage({
//             message: result.data.msg ? result.data.msg : "操作失败",
//             type: 'error',
//         })
//         if (err.response.status === 401) {
//             router.push('/login')
//         }

//         return Promise.reject(err);//异步的状态转化成失败的状态
//     }
// )

export default instance;