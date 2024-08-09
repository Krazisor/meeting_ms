import request from "@/utils/request"
import "querystring"
import { useTokenStore } from "@/stores/token"

export const getRequestByParamsAndPage = (selectData: any) => {
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
            rentalId: selectData.rentalId,
            meetingroomId: selectData.meetingroomId,
            meetingroomRentaldateTemp: selectData.meetingroomRentaldateTemp,
            meetingroomRentaltime: selectData.meetingroomRentaltime,
            approval: selectData.approval
        }
    };
    const url = 'http://localhost:8080/request/requestInfoMore'
    return request.get(url, config);
}

export const auditMeetingById = (selectData: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;

    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
    const params = new URLSearchParams()
    for (let key in selectData) {
        params.append(key, selectData[key])
    }

    const url = 'http://localhost:8080/request/updateApprovalById'
    return request.post(url, params, config);
}