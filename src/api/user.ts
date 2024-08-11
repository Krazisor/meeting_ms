import request from "@/utils/request"
import {toRaw} from "vue"
import "querystring"
import {useTokenStore} from "@/stores/token"

export const getUserByParamsAndPage = (selectData: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;

    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        params: {
            page: selectData.page,
            pageSize: selectData.pageSize,
            userId: selectData.userId,
            userName: selectData.userName,
            userAge: selectData.userAge,
            userTel: selectData.userTel,
            userEmail: selectData.userEmail
        }
    };

    const url = 'http://localhost:8080/user/userInfoMore';

    return request.get(url, config);
}

export const addNewUserByAllParams = (selectData: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    // const plainObject = toRaw(selectData)
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };

    const url = 'http://localhost:8080/user/register';
    return request.post(url, JSON.stringify(selectData) ,config)
}

export const updateUserByAnyParams = (selectData: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };
    const url = 'http://localhost:8080/user/update';
    return request.post(url, JSON.stringify(selectData), config)
}

export const deleteUserById = (id: number) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };
    const url = 'http://localhost:8080/user/delete';
    return request.get(url + "?userId=" + id, config)
}

export const adminLoginService = (loginData: any) => {
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key,loginData[key])
    }

    const url = 'http://localhost:8080/adminLogin';
    return request.post(url, params)
}  

export const BanUserService = (loginData: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    const params = new URLSearchParams()
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };
    for (let key in loginData) {
        params.append(key, loginData[key])
    }
    console.log(params)

    const url = 'http://localhost:8080/user/banById';
    return request.post(url, params, config)
} 

export const adminGetUserByParamsAndPage = (selectData: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;

    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        params: {
            page: selectData.page,
            pageSize: selectData.pageSize,
            userId: selectData.userId,
            userName: selectData.userName,
            userRoleA: selectData.userRoleA,
            userRoleB: selectData.userRoleB,
            userRoleC: selectData.userRoleC,
            userSuperAdmin: selectData.userSuperAdmin
        }
    };

    const url = 'http://localhost:8080/user/userInfoMore';

    return request.get(url, config);
}

export const selectUserById = (id: number) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };
    const url = 'http://localhost:8080/user/getById';
    return request.get(url + "?userId=" + id, config)
} 