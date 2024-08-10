<template>
	<div class="auditManage">
		<div class="title">
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
		<el-table :data="rentalData" size='large' style="width: 100%;" border>
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
				<el-date-picker v-model="meetingroomRentaldateTemp" type="date" placeholder="请选择会议日期" clearable
					style="width: 300px" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
			</el-form-item>

			<el-form-item label="会议时间" :label-width="formLabelWidth">
				<el-select v-model="value" placeholder="请选择会议时间" style="width: 300px" clearable
					@change="selectChange()">
					<el-option v-for="item in options2" :key="item.value" :value="item.value">
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

	<!-- 新增会议的弹出框 -->
	<el-dialog v-model="addForm" title="新增会议" width="400" align-center style="font-weight: bold">
		<el-form width="">
			<el-form-item label="请求房间号" label-width="100px">
				<el-input v-model="registerForm.meetingroomId" autocomplete="off" placeholder="请输入会议室房间号" clearable />
			</el-form-item>
			<el-form-item label="会议日期" label-width="100px">
				<el-date-picker v-model="registerForm.meetingroomRentaldate" type="date" placeholder="请选择会议日期" clearable
					style="width: 300px" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
			</el-form-item>

			<el-form-item label="会议时间" label-width="100px">
				<el-select v-model="value2" placeholder="请选择会议时间" style="width: 300px" clearable
					@change="selectChange2()">
					<el-option v-for="item2 in options2" :key="item2.value" :value="item2.value">
						<div class="option-label">
							<el-icon style="margin-right: 10px;">
								<component :is="item2.icon" />
							</el-icon>
							{{ item2.label }}
						</div>
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="详细描述" label-width="100px">
				<el-input type="textarea" v-model="registerForm.rentalDescribe" autocomplete="off"
					placeholder="请输入会议室规模" clearable autosize />
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="formAddDamage" style="font-weight: bold">取消</el-button>
				<el-button type="primary" @click="formAddChange" style="font-weight: bold">
					新增
				</el-button>
			</div>
		</template>
	</el-dialog>

	<!-- 撤销确认框 -->
	<el-dialog v-model="centerDialogVisible" title="Warning" width="500" align-center>
		<span>你确定要撤销 房间号:{{ rowNow.meetingroomId }} 此时间段的会议信息吗?</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="centerDialogVisible = false" style="font-weight: bold">
					取消
				</el-button>
				<el-button type="primary" @click="regretInfo()" style="font-weight: bold">
					确定
				</el-button>
			</div>
		</template>
	</el-dialog>

	<!-- 删除确认框 -->
	<el-dialog v-model="deleteVisible" title="Warning" width="500" align-center>
		<span>你确定要删除 房间号:{{ rowNow.meetingroomId }} 此时间段的会议信息吗? 删除后不可恢复！</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="deleteVisible = false" style="font-weight: bold">
					取消
				</el-button>
				<el-button type="primary" @click="deleteInfo()" style="font-weight: bold">
					确定
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

// 新增会议弹窗
const addForm = ref(false)
// 新增会议按键点击逻辑
const addInfoButton = () => {
	addForm.value = true
}
// 注册表单
const registerForm = ref({
	meetingroomId: ref(),
	meetingroomRentaldate: ref<Date>(),
	meetingroomRentaltime: ref(),
	rentalDescribe: ref<string>(''),
	userId: ref(),
	approveId: ref()
})
// 新增会议中的的options时间选择
// 选择栏
const value2 = ref('')
const options2 = [
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
const selectChange2 = async () => {
	// 变量监听，让approval和value的值进行绑定
	if (value2.value == "09:00-10:00") {
		registerForm.value.meetingroomRentaltime = 0
	}
	else if (value2.value == "10:00-11:00") {
		registerForm.value.meetingroomRentaltime = 1
	}
	else if (value2.value == "11:00-12:00") {
		registerForm.value.meetingroomRentaltime = 2
	}
	else if (value2.value == "13:00-14:00") {
		registerForm.value.meetingroomRentaltime = 3
	}
	else if (value2.value == "14:00-15:00") {
		registerForm.value.meetingroomRentaltime = 4
	}
	else if (value2.value == "15:00-16:00") {
		registerForm.value.meetingroomRentaltime = 5
	}
}
// 新增会议弹窗的取消按钮逻辑
const formAddDamage = () => {
	registerForm.value.meetingroomId = undefined
	registerForm.value.meetingroomRentaldate = undefined
	registerForm.value.meetingroomRentaltime = undefined
	registerForm.value.rentalDescribe = ''
	registerForm.value.userId = undefined
	registerForm.value.approveId = undefined
	value2.value = ''
	addForm.value = false
}

// 新增会议弹窗的新增按钮逻辑
import { useTokenStore } from '@/stores/token';
import { addNewRentalByAllParams, regretRentalService, deleteRentalService } from '@/api/auditManage';
const tokenStore = useTokenStore()
const formAddChange = async () => {
	registerForm.value.approveId = tokenStore.userId
	registerForm.value.userId = tokenStore.userId
	let res = addNewRentalByAllParams(registerForm.value)
	if ((await res).data.code === 1) {
		formAddDamage()
		ElMessage.success("新增成功")
		handleCurrentChange()
	} else {
		ElMessage.error("新增的会议可能与已有会议冲突")
	}
}

// 撤销删除绑定数据
let rowNow = ref({
	meetingroomId: ref(),
	meetingroomRentaldate: ref<Date>(),
	meetingroomRentaltime: ref(),
	userId: ref(),
	approveId: ref(),
	rentalDescribe: ref<string>(''),
})
// 撤销确认框
const centerDialogVisible = ref(false)
// 撤销按钮按键逻辑
const regretRentalButton = (row: any) => {
	centerDialogVisible.value = true
	rowNow.value = row.row
}
// 撤销按钮确定逻辑
const regretInfo = async () => {
	let res = regretRentalService(rowNow.value)
	if ((await res).data.code === 1) {
		ElMessage.success("撤销成功")
		centerDialogVisible.value = false
		handleCurrentChange()
	} else {
		ElMessage.error("异常错误,请联系管理员")
	}
}

// 删除按钮弹出框
const deleteVisible = ref(false)
// 删除按钮操作逻辑
const deleteRentalButton = (row: any) => {
	deleteVisible.value = true
	rowNow.value = row.row
}
// 删除弹出框中的确认逻辑
const deleteInfo = async () => {
	let res = deleteRentalService(rowNow.value)
	if ((await res).data.code === 1) {
		ElMessage.success("删除成功")
		deleteVisible.value = false
		handleCurrentChange()
	} else {
		ElMessage.error("异常错误,请联系管理员")
	}
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
</style>