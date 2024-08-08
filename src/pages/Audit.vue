<template>
    <div class="audit">
        <!-- 筛选框 -->
        <div class="mb-4" style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px; ">
            <el-button type="primary" :icon="Search" @click="selectInfo" style="margin-right: 20px"
                class="gradient-button">会议请求筛选</el-button>

            <el-select v-model="value" placeholder="选择审批状态" style="width: 160px" clearable @change="selectChange()"
                class="custom-select">
                <el-option v-for="item in options" :key="item.value" :value="item.value">
                    <div class="option-label">
                        <el-icon style="margin-right: 10px;">
                            <component :is="item.icon" />
                        </el-icon>
                        {{ item.label }}
                    </div>
                </el-option>
            </el-select>
        </div>

        <!-- 内容展示 -->
        <el-table :data="requestData" size='large' style="width: 100%;">
            <el-table-column fixed prop="rentalId" label="请求ID" min-width="80" />
            <el-table-column prop="userId" label="请求用户ID" min-width="80" />
            <el-table-column prop="meetingroomId" label="请求房间号" min-width="80" />
            <el-table-column prop="meetingroomRentaldate" label="预定日期" min-width="100" />
            <el-table-column prop="meetingroomRentaltime" label="预定时间" min-width="100" :formatter="timeFormatter" />
            <el-table-column prop="rentalDescribe" label="详细描述" min-width="150" />
            <el-table-column prop="approval" label="审批结果" min-width="50" :formatter="approvalFormatter" />

            <el-table-column fixed="right" label="操作" min-width="120">

                <template #default="row">
                    <el-button link type="primary" size="default" plain @click="passRequestButton(row)"
                        :disabled="row.row.approval === 0 ?false :true">
                        通过
                    </el-button>
                    <el-button link type="danger" size="default" plain @click="refuseRequestButton(row)"
                        :disabled="row.row.approval === 0 ? false : true">
                        驳回
                    </el-button>
                </template>

            </el-table-column>
        </el-table>
        <br>
        <!-- 分页 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
            background layout="sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :total="total" />
    </div>

    <!-- 会议请求的弹出框 -->
    <el-dialog v-model="dialogFormVisible" title="会议请求筛选(可选)" width="400" align-center>
        <el-form width="">
            <el-form-item label="请求ID" label-width="100px">
                <el-input v-model="rentalId" autocomplete="off" placeholder="请输入会议室房间号" clearable />
            </el-form-item>
            <el-form-item label="请求用户ID" label-width="100px">
                <el-input v-model="userId" autocomplete="off" placeholder="请输入会议室规模" clearable />
            </el-form-item>
            <el-form-item label="请求房间号" label-width="100px">
                <el-input v-model="meetingroomId" autocomplete="off" placeholder="请输入负责人" clearable />
            </el-form-item>
            <el-form-item label="请求日期" label-width="100px">
                <el-input v-model="meetingroomRentaldate" autocomplete="off" placeholder="请输入负责人" clearable />
            </el-form-item>
            <el-form-item label="请求时间" label-width="100px">
                <el-input v-model="meetingroomRentaltime" autocomplete="off" placeholder="请输入负责人" clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="danger" @click="cleanParams">清空</el-button>
                <el-button type="primary" @click="formSelectChange">
                    查询
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>



<script setup lang = "ts" name = "Audit">
import { onBeforeMount, ref } from 'vue';

// 预定时间规范化
const timeFormatter = function (row: any, column: any, cellValue: any, index: any) {
    if (cellValue === 0) {
        return "9:00-10:00"
    }
    if (cellValue === 1) {
        return "10:00-11:00"
    }
    if (cellValue === 2) {
        return "11:00-12:00"
    }
    if (cellValue === 3) {
        return "13:00-14:00"
    }
    if (cellValue === 4) {
        return "14:00-15:00"
    }
    if (cellValue === 5) {
        return "15:00-16:00"
    }
}
// 审批结果规范化
const approvalFormatter = function (row: any, column: any, cellValue: any, index: any) {
    if (cellValue === 0) {
        return "待审核"
    }
    if (cellValue === 1) {
        return "已通过"
    }
    if (cellValue === 2) {
        return "已驳回"
    }
}

// 选择栏
const value = ref('')
const options = [
    {
        value: '已通过',
        label: '已通过',
        icon: SuccessFilled
    },
    {
        value: '待审核',
        label: '待审核',
        icon: Promotion
    },
    {
        value: '已驳回',
        label: '已驳回',
        icon: CircleCloseFilled
    },
]

// 选择栏发生变化时的绑定事件
const selectChange = async () => {
    // 变量监听，让approval和value的值进行绑定
    if (value.value == "已通过") {
        approval.value = 1
    }
    else if (value.value == "待审核") {
        approval.value = 0
    }
    else if (value.value == "已驳回") {
        approval.value = 2
    }
    else {
        approval.value = undefined
    }
    // console.log(approval.value)
    requestData.value = ((await(requestList()))).data.data.rows
}

// 会议室请求筛选弹出框
const dialogFormVisible = ref(false)
// 会议室请求筛选按钮操作逻辑
const selectInfo = () => {
    dialogFormVisible.value = true
}
// 会议室请求筛选弹出框中的查询按钮
const formSelectChange = async () => {
    requestData.value = (await requestList()).data.data.rows
    dialogFormVisible.value = false
    selectSuccess()
}
// 消息通知--查询成功
const selectSuccess = () => {
    ElMessage.success('查询成功')
}

// 通过会议
import { useTokenStore } from '@/stores/token';
import { auditMeetingById } from '@/api/audit';
const tokenStore = useTokenStore()
const passRequestButton = async (row: any) => {
    // auditMeetingById包装参数
    let auditParams = ref({
        rentalId: ref((row.row.rentalId)),
        approveId: ref(parseInt(tokenStore.userId)),
        approval: ref(1)
    })
    let res = auditMeetingById(auditParams.value)
    if ((await res).data.code === 1) {
        ElMessage.success("审批成功")
        handleCurrentChange()
    } else {
        ElMessage.error("该时间段可能已有会议占用此会议室")
    }
}

// 驳回会议
const refuseRequestButton = async (row: any) => {
    // auditMeetingById包装参数
    let auditParams = ref({
        rentalId: ref((row.row.rentalId)),
        approveId: ref(parseInt(tokenStore.userId)),
        approval: ref(2)
    })
    let res = auditMeetingById(auditParams.value)
    if ((await res).data.code === 1) {
        ElMessage.success("审批成功")
        handleCurrentChange()
    } else {
        ElMessage.error("异常错误,请联系管理员")
    }
}


// 数据表的请求
let requestData = ref([])
let currentPage = ref(1)
let pageSize = ref(10)
let total = ref()
let userId = ref()
let rentalId = ref()
let meetingroomId = ref()
let meetingroomRentaldate = ref<Date>()
let meetingroomRentaltime = ref()
let approval = ref()
// 清空大法，除了approval
const cleanParams = () => {
    userId.value = undefined
    rentalId.value = undefined
    meetingroomId.value = undefined
    meetingroomRentaldate.value = undefined
    meetingroomRentaltime.value = undefined
}

import { getRequestByParamsAndPage } from '@/api/audit';
import { Search, SuccessFilled, CircleCloseFilled, Promotion } from '@element-plus/icons-vue'
import { ElMessage, ElNotification } from 'element-plus';

const requestList = async () => {
    let params = {
        page: currentPage.value,
        pageSize: pageSize.value,
        userId: userId.value ? userId.value : null,
        rentalId: rentalId.value ? rentalId.value : null,
        meetingroomId: meetingroomId.value ? meetingroomId.value : null,
        meetingroomRentaldate: meetingroomRentaldate.value ? meetingroomRentaldate.value : null,
        meetingroomRentaltime: meetingroomRentaltime.value ? meetingroomRentaltime.value : null,
        approval: approval.value
    }
    let result = await getRequestByParamsAndPage(params)
    total = result.data.data.total
    return result
}
// 处理页面规格变化
const handleSizeChange = async () => {
    requestData.value = ((await(requestList()))).data.data.rows
}
// 处理页码变化
const handleCurrentChange = async () => {
    requestData.value = ((await (requestList()))).data.data.rows
}
// 初始化页面
onBeforeMount(async () => {
    requestData.value = (await requestList()).data.data.rows
})

</script>




<style scoped>
.option-label {
    display: flex;
    /* 使用 flexbox 来对齐 */
    align-items: center;
    /* 垂直居中对齐 */
}
.gradient-button {
    background: linear-gradient(270deg, #fab457, #81c784);
    /* 渐变绿色 */
    border: none;
    /* 去掉默认边框 */
    color: white;
    /* 文字颜色 */
    transition: background 0.3s, transform 0.3s;
    /* 动画过渡效果 */
}

.gradient-button:hover {
    background: linear-gradient(270deg, #f09f0a, #3f977a);
    /* 悬停时的渐变效果 */
    transform: scale(1.05);
    /* 悬停时放大效果 */
}

.custom-select {
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
}

.el-select {
    background-color: white;
    /* 背景色 */
    border: 1px solid #e0e0e0;
    /* 边框颜色 */
    border-radius: 5px;
    /* 圆角 */
}
</style>
