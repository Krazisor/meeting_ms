<template>
	<div class="auditManage">
		<div class="title"
			style="margin-left: 10px;margin-top: 20px;font-weight: bold;font-size: 40px;color: #2c5d9d;text-align: left">
			会议管理
		</div>
		<!-- 筛选框 -->
		<div class="mb-4" style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px; ">
			<el-button type="primary" :icon="Search" @click="selectInfoButton" class="blue-button"
				style="font-weight: bold">查询会议</el-button>
			<el-button type="success" :icon="Upload" @click="addInfoButton" class="gradient-button"
				style="font-weight: bold">新增会议</el-button>
		</div>

		<!-- 内容展示 -->
		<el-table :data="rentalData" size='large' style="width: 100%;">
			<el-table-column fixed prop="meetingroomId" label="请求房间号" min-width="80" />
			<el-table-column fixed prop="meetingroomRentaldate" label="会议日期" min-width="120" />
			<el-table-column fixed prop="meetingroomRentaltime" label="会议时间" min-width="120"
				:formatter="timeFormatter" />
			<el-table-column prop="rentalDescribe" label="详细描述" min-width="160" />
			<el-table-column prop="userId" label="申请人ID" min-width="80" />
			<el-table-column prop="approveId" label="审批人ID" min-width="80" />

			<el-table-column fixed="right" label="操作" min-width="120">

				<template #default="row">
					<el-button type="primary" link plain @click="regretRentalButton(row)" style="font-weight: bold">
						撤销
					</el-button>
					<el-button type="danger" link plain @click="deleteRentalButton(row)" style="font-weight: bold">
						删除
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

	<!-- 查询弹出框 -->
	<el-dialog v-model="dialogFormVisible" title="查询会议(可选)" width="400" align-center style="font-weight: bold">
		<el-form width="">
			<el-form-item label="会议室ID" :label-width="formLabelWidth">
				<el-input v-model="meetingroomId" autocomplete="off" placeholder="请输入会议室ID" clearable />
			</el-form-item>
			<el-form-item label="会议日期" :label-width="formLabelWidth">
				<el-date-picker v-model="meetingroomRentaldateTemp" type="date" placeholder="请选择会议日期" clearable style="width: 300px"
				format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
			</el-form-item>

			<el-form-item label="会议时间" :label-width="formLabelWidth">
				<el-select v-model="value" placeholder="请选择会议时间" style="width: 300px" clearable
					@change="selectChange()">
					<el-option v-for="item in options" :key="item.value" :value="item.value">
						<div class="option-label">
							<el-icon style="margin-right: 10px;">
								<component :is="item.icon" />
							</el-icon>
							{{ item.label }}
						</div>
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="申请人ID" :label-width="formLabelWidth">
				<el-input v-model="userId" autocomplete="off" placeholder="请输入申请人ID" clearable />
			</el-form-item>
			<el-form-item label="审批人ID" :label-width="formLabelWidth">
				<el-input v-model="approveId" autocomplete="off" placeholder="请输入审批人ID" clearable />
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
</template>

<script setup lang="ts" name="AuditManage">
import { onBeforeMount, ref } from 'vue';
import { Search, Upload, Clock } from '@element-plus/icons-vue'
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

// 查询弹出框
const dialogFormVisible = ref(false)
// 查询表单左侧宽度
const formLabelWidth = '100px'
// 查询会议按钮点击逻辑
const selectInfoButton = () => {
	dialogFormVisible.value = true
}
// 查询会议中的的options时间选择
// 选择栏
const value = ref('')
const options = [
	{
		value: '09:00-10:00',
		label: '09:00-10:00',
		icon: Clock
	},
	{
		value: '10:00-11:00',
		label: '10:00-11:00',
		icon: Clock
	},
	{
		value: '11:00-12:00',
		label: '11:00-12:00',
		icon: Clock
	},
	{
		value: '13:00-14:00',
		label: '13:00-14:00',
		icon: Clock
	},
	{
		value: '14:00-15:00',
		label: '14:00-15:00',
		icon: Clock
	},
	{
		value: '15:00-16:00',
		label: '15:00-16:00',
		icon: Clock
	},
]
// 选择栏发生变化时的绑定事件
const selectChange = async () => {
	// 变量监听，让approval和value的值进行绑定
	if (value.value == "09:00-10:00") {
		meetingroomRentaltime.value = 0
	}
	else if (value.value == "10:00-11:00") {
		meetingroomRentaltime.value = 1
	}
	else if (value.value == "11:00-12:00") {
		meetingroomRentaltime.value = 2
	}
	else if (value.value == "13:00-14:00"){
		meetingroomRentaltime.value = 3
	}
	else if (value.value == "14:00-15:00") {
		meetingroomRentaltime.value = 4
	}
	else if (value.value == "15:00-16:00") {
		meetingroomRentaltime.value = 5
	}
}
// 查询会议表单中的查询按钮
const formSelectChange = async () => {
	rentalData.value = (await rentalList()).data.data.rows
	dialogFormVisible.value = false
	ElMessage.success("查询成功")
} 


import { getRentalByParamsAndPage } from '@/api/auditManage';
import { ElMessage } from 'element-plus';
// 初始化界面所用数据
let meetingroomId = ref()
let meetingroomRentaldateTemp = ref<Date>()
let meetingroomRentaltime = ref()
let userId = ref()
let approveId = ref()
let rentalData = ref([])
let currentPage = ref(1)
let pageSize = ref(10)
let total = ref()
let tempDate = ref<string>()
// 参数清空
const cleanParams = () => {
	meetingroomId.value = undefined
	meetingroomRentaldateTemp.value = undefined
	meetingroomRentaltime.value = undefined
	userId.value = undefined
	approveId.value = undefined
	value.value = ''
}

const rentalList = async () => {
	let params = {
		page: currentPage.value,
		pageSize: pageSize.value,
		userId: userId.value ? userId.value : null,
		meetingroomId: meetingroomId.value ? meetingroomId.value : null,
		meetingroomRentaldateTemp: meetingroomRentaldateTemp.value ? meetingroomRentaldateTemp.value : null,
		meetingroomRentaltime: meetingroomRentaltime.value,
		approveId: approveId.value ? approveId.value : null
	}
	console.log(params.meetingroomRentaldateTemp)
	let result = await getRentalByParamsAndPage(params)
	total = result.data.data.total
	return result
}
// 处理页面规格变化
const handleSizeChange = async () => {
	rentalData.value = ((await (rentalList()))).data.data.rows
}
// 处理页码变化
const handleCurrentChange = async () => {
	rentalData.value = ((await (rentalList()))).data.data.rows
}
// 初始化页面
onBeforeMount(async () => {
	rentalData.value = (await rentalList()).data.data.rows
})
</script>



<style scoped>
.gradient-button {
	background: linear-gradient(270deg, #4caf50, #cad441);
	/* 绿色渐变 */
	border: none;
	/* 去掉默认边框 */
	color: white;
	/* 文字颜色 */
	transition: background 0.3s, transform 0.3s;
	/* 动画过渡效果 */
}

.gradient-button:hover {
	background: linear-gradient(270deg, #cad441, #4caf50);
	/* 悬停时的渐变效果 */
	transform: scale(1.05);
	/* 悬停时放大效果 */
}

.blue-button {
	background: linear-gradient(270deg, #00bfff, #2c5d9d);
	/* 天蓝色渐变 */
	border: none;
	/* 去掉默认边框 */
	color: white;
	/* 文字颜色 */
	transition: background 0.3s, transform 0.3s;
	/* 动画过渡效果 */
}

.blue-button:hover {
	background: linear-gradient(270deg, #2c5d9d, #00bfff);
	/* 悬停时的渐变效果 */
	transform: scale(1.05);
	/* 悬停时放大效果 */
}
</style>