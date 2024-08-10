<template>
	<div class="meeting">
		<div class="title">
			会议室列表
		</div>
		<!-- 筛选框 -->
		<div class="mb-4" style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px;">
			<el-button type="primary" :icon="Search" @click="selectInfo" class="blue-button"
				style="font-weight: bold">查询会议室</el-button>
			<el-button type="success" :icon="Upload" @click="addInfo" class="gradient-button"
				style="font-weight: bold">新增会议室</el-button>
		</div>

		<!-- 内容展示 -->
		<el-table :data="meetingData" size='large' style="width: 100%;">
			<el-table-column fixed prop="meetingroomId" label="会议室房间号" min-width="100" />
			<el-table-column prop="meetingroomSize" label="会议室规模" min-width="80" />
			<el-table-column prop="meetingroomHeadname" label="负责人" min-width="100" />
			<el-table-column fixed="right" label="操作" min-width="120">

				<template #default="row">
					<el-button link type="primary" size="default" plain @click="getInfo(row)" style="font-weight: bold">
						修改
					</el-button>
					<el-button link type="danger" size="default" plain @click="deleteButton(row)"
						style="font-weight: bold">
						删除
					</el-button>
				</template>

			</el-table-column>
		</el-table>
		<br>
		<!-- 分页 -->
		<el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
			background layout="sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
			@current-change="handleCurrentChange" :total="total" style="font-weight: bold" />
	</div>

	<!-- 查询会议室的弹出框 -->
	<el-dialog v-model="dialogFormVisible" title="查询会议室(可选)" width="400" align-center style="font-weight: bold">
		<el-form width="">
			<el-form-item label="会议室房间号" label-width="100px">
				<el-input v-model="meetingroomId" autocomplete="off" placeholder="请输入会议室房间号" clearable />
			</el-form-item>
			<el-form-item label="会议室规模" label-width="100px">
				<el-input v-model="meetingroomSize" autocomplete="off" placeholder="请输入会议室规模" clearable />
			</el-form-item>
			<el-form-item label="负责人用户名" label-width="100px">
				<el-input v-model="meetingroomHeadname" autocomplete="off" placeholder="请输入负责人" clearable />
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

	<!-- 新增会议室的弹出框 -->
	<el-dialog v-model="addForm" title="新增会议室" width="400" align-center style="font-weight: bold">
		<el-form width="">
			<el-form-item label="会议室房间号" label-width="100px">
				<el-input v-model="registerForm.meetingroomId" autocomplete="off" placeholder="请输入会议室房间号" clearable />
			</el-form-item>
			<el-form-item label="会议室规模" label-width="100px">
				<el-input v-model="registerForm.meetingroomSize" autocomplete="off" placeholder="请输入会议室规模" clearable />
			</el-form-item>
			<el-form-item label="负责人用户名" label-width="100px">
				<el-input v-model="registerForm.meetingroomHeadname" autocomplete="off" placeholder="请输入负责人用户名"
					clearable />
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

	<!-- 删除确认框 -->
	<div>
		<el-dialog v-model="centerDialogVisible" title="Warning" width="500" align-center style="font-weight: bold">
			<span>你确定要删除 房间号:{{ meetingroomId }} 的相关信息吗?</span>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="deleteInfoDamage" style="font-weight: bold">
						取消
					</el-button>
					<el-button type="primary" @click="deleteInfo()" style="font-weight: bold">
						确定
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>

	<!-- 会议室修改界面弹出框 -->
	<el-dialog v-model="changeDialog" title="修改会议室信息" width="600" align-center style="font-weight: bold">
		<span>
			<el-descriptions class="margin-top" :column="2" border>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<Shop />
							</el-icon>
							<div style="margin-left: 3px;">
								会议室
							</div>
						</div>
					</template>
					<el-tag type='success' style="margin-left: 3px;" round>{{ nowRowForm.meetingroomId }}</el-tag>

				</el-descriptions-item>

				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<SetUp />
							</el-icon>
							<div style="margin-left: 3px;">
								规模
							</div>
						</div>
					</template>
					<el-input v-model="nowRowForm.meetingroomSize" class="class1"></el-input>
				</el-descriptions-item>

				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<Avatar />
							</el-icon>
							<div style="margin-left: 3px;">
								负责人
							</div>
						</div>
					</template>
					<el-input v-model="nowRowForm.meetingroomHeadname" class="class1"></el-input>
				</el-descriptions-item>

			</el-descriptions>

		</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="changeInfoDamage" style="font-weight: bold">取消</el-button>
				<el-button type="primary" @click="changeInfo" style="font-weight: bold">
					确定
				</el-button>
			</div>
		</template>
	</el-dialog>

</template>



<script setup lang="ts" name="Meeting">
import { Search, Upload } from '@element-plus/icons-vue'
import { onBeforeMount, ref, h } from 'vue';

// 查询弹出框
const dialogFormVisible = ref(false)
// 查询会议室按钮触发逻辑
const selectInfo = () => {
	dialogFormVisible.value = true
}
// 查询会议室表单中的查询按钮
const formSelectChange = async () => {
	meetingData.value = (await meetingList()).data.data.rows
	dialogFormVisible.value = false
	selectSuccess()
}
// 消息通知--查询成功
const selectSuccess = () => {
	ElMessage.success('查询成功')
}


// 新增会议室按钮弹出框
const addForm = ref(false)
// 新增会议室按钮出发逻辑
const addInfo = () => {
	addForm.value = true
}
// 新增会议室界面中的取消逻辑
const formAddDamage = () => {
	cleanRegister()
	addForm.value = false
}
// 注册表单
let registerForm = ref({
	meetingroomId: ref(),
	meetingroomSize:ref(),
	meetingroomHeadname: ref('')
})
// 注册表单清空
const cleanRegister = () => {
	registerForm.value.meetingroomId = undefined
	registerForm.value.meetingroomSize = undefined
	registerForm.value.meetingroomHeadname = ''
}
// 新增会议室界面中新增逻辑
const formAddChange = async () => {

	if (registerForm.value.meetingroomId === undefined || registerForm.value.meetingroomSize === undefined || registerForm.value.meetingroomHeadname === "") {
		somethingNotWrite()
	} else {
		let res = addNewMeetingByAllParams(registerForm.value)
		if ((await res).data.code === 0) {
			repeatMeetingId()
		}
		else {
			formAddDamage()
			addFormSuccess()
		}
	}
}
// 消息通知--请完善注册表
const somethingNotWrite = () => {
	ElMessage.error('请完善表格后再进行新增操作哦！')
}
// 消息通知--当前会议室房间号已存在或负责人不存在
const repeatMeetingId = () => {
	ElMessage.error('会议室房间号已存在或负责人不存在')
}
// 消息通知--新增成功
const addFormSuccess = () => {
	ElMessage.success('新增会议室成功')
}


// 删除确认框
const centerDialogVisible = ref(false)
// 删除按钮操作逻辑
const deleteButton = (row: any) => {
	meetingroomId.value = row.row.meetingroomId
	centerDialogVisible.value = true
}
// 删除确认框中的取消按键操作逻辑
const deleteInfoDamage = () => {
	cleanParams()
	centerDialogVisible.value = false
}
// 删除确认框中的确定按钮操作逻辑
const deleteInfo = async () => {
	console.log(meetingroomId.value)
	let res = deleteMeetingRoomById(meetingroomId.value)
	if ((await res).data.code === 0) {
		deleteInfoFailure()
	}
	else {
		deleteInfoSuccess()
		deleteInfoDamage()
		handleCurrentChange()
	}
}
// 消息通知--删除失败
const deleteInfoFailure = () => {
	ElMessage.error('当前会议室可能有会议安排,无法删除')
}
// 消息通知--删除成功
const deleteInfoSuccess = () => {
	ElMessage.success('会议室:' + meetingroomId.value + "删除成功")
}


// 修改界面弹出框
const changeDialog = ref(false)
// 修改界面的表单
let nowRowForm = ref({
	meetingroomId: ref(),
	meetingroomSize: ref(),
	meetingroomHeadname: ref<string>('')
})
// 修改按钮操作逻辑
const getInfo = (row: any) => {
	nowRowForm.value = row.row
	changeDialog.value = true
}
// 修改界面中的取消按钮逻辑
const changeInfoDamage = () => {
	changeDialog.value = false
}
// 修改界面中的确定按钮逻辑
const changeInfo = async (row: any) => {
	let res = updateMeetingByAnyParams(nowRowForm.value)
	if ((await res).data.code === 0) {
		changeInfoFailure()
	}
	else {
		changeInfoDamage()
		changeInfoSuccess()
		handleCurrentChange()
	}
}
// 消息提醒--修改失败
const changeInfoFailure = () => {
	ElMessage.error('当前修改的负责人不存在')
}
// 消息提醒--修改成功
const changeInfoSuccess = () => {
	ElMessage.success('会议室:' + nowRowForm.value.meetingroomId + "修改成功")
}

// 表格获取
let meetingData = ref([])
let currentPage = ref(1)
let pageSize = ref(10)
let meetingroomId = ref()
let meetingroomSize = ref()
let meetingroomHeadname = ref<string>("")
let total = ref(10)
// 清空meetingroomId,meetingroomSize,meetingroomHeadname的内容
const cleanParams = () => {
	meetingroomId.value = undefined
	meetingroomSize.value = undefined
	meetingroomHeadname.value = ""
}

onBeforeMount(async () => {
	meetingData.value = (await meetingList()).data.data.rows
	console.log(meetingData.value)
})

import { getMeetingRoomByParamsAndPage, addNewMeetingByAllParams, deleteMeetingRoomById, updateMeetingByAnyParams } from '@/api/meeting';
import { ElMessage, ElNotification, ElSelect } from 'element-plus';

const meetingList = async () => {
	console.log("hello2")
	let params = {
		page: currentPage.value,
		pageSize: pageSize.value,
		meetingroomId: meetingroomId.value ? meetingroomId.value : null,
		meetingroomSize: meetingroomSize.value ? meetingroomSize.value : null,
		meetingroomHeadname: meetingroomHeadname.value ? meetingroomHeadname.value : null
	}
	let result = await getMeetingRoomByParamsAndPage(params)
	total = result.data.data.total
	return result
}
// 处理页面规格变化
const handleSizeChange = async () => {
	meetingData.value = (await(meetingList())).data.data.rows
}
// 处理页码变化
const handleCurrentChange = async () => {
	meetingData.value = (await (meetingList())).data.data.rows
}

</script>

<style scoped>
.class1:deep(.el-input__wrapper) {
	box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
	cursor: default;
	width: 80px
}
.cell-item {
	display: flex;
	align-items: center;
}
.gradient-button {
	background: linear-gradient(270deg, #4caf50, #cad441);
	/* 绿色渐变 */
	border: none;
	/* 去掉默认边框 */
	color: white;
	/* 文字颜色 */
	transition: background 0.3s,transform 0.3s;
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
	transition: background 0.3s,transform 0.3s;
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
