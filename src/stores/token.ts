import { defineStore } from "pinia";
import { ref } from "vue";
/**
 * @param {String} name 
 * @param {function} 定义状态内容
 * * @returns {function}
 */

export const useTokenStore = defineStore(
    'token',
    () => {
        const token = ref<string>('');
        const userId = ref();
        let isLogin = ref<boolean>(false);
        const setToken = (newToken: any) => {
            token.value = newToken;
        }
        const removeToken = () => {
            token.value = '';
        }
        const setUserId = (newId: any) => {
            userId.value = newId
        }
        const removeUserId = () => {
            userId.value = undefined
        }
        const loginSuccess = () => {
            isLogin.value = true
        }
        const loginFailure = () => {
            isLogin.value = false
        }
        return {
            userId,
            token,
            isLogin,
            loginSuccess,
            loginFailure,
            setToken,
            removeToken,
            setUserId,
            removeUserId
        }
    },
    {
        // @ts-ignore
        persist: true
    }
);
