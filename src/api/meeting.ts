import request from "@/utils/request"
import "querystring"
import { useTokenStore } from "@/stores/token"

export const getMeetingRoomByParamsAndPage = (selectData: any) => {
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
            meetingroomId: selectData.meetingroomId,
            meetingroomSize: selectData.meetingroomSize,
            meetingroomHeadname: selectData.meetingroomHeadname
        }
    };

    const url = 'http://localhost:8080/meeting/meetingInfoMore'
    return request.get(url, config);
}

export const addNewMeetingByAllParams = (selectData: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };
    
    const url = 'http://localhost:8080/meeting/insert';
    return request.post(url, JSON.stringify(selectData), config)
}

export const deleteMeetingRoomById = (id: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        params: {
            meetingroomId: id
        }
    };
    
    const url = 'http://localhost:8080/meeting/delete';
    return request.get(url, config)
}

export const updateMeetingByAnyParams = (selectData: any) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };

    const url = 'http://localhost:8080/meeting/update';
    return request.post(url, JSON.stringify(selectData), config);
}