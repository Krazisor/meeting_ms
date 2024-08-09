import request from "@/utils/request"
import "querystring"
import { useTokenStore } from "@/stores/token"

export const getRentalByParamsAndPage = (selectData: any) => {
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
            meetingroomRentaldateTemp: selectData.meetingroomRentaldateTemp,
            meetingroomRentaltime: selectData.meetingroomRentaltime,
            userId: selectData.userId,
            approveId: selectData.approveId
        }
    };

    const url = 'http://localhost:8080/rental/rentalInfoMore'
    return request.get(url, config);
}