<template>
	<div class="userSelect">
		<div class="title">
			用户列表
		</div>
		<!-- 筛选框 -->
		<div class="mb-4" style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px;">
			<el-button type="primary" :icon="Search" @click="selectInfo" class="blue-button"
				style="font-weight: bold">查询用户</el-button>
			<el-button type="success" :icon="Upload" @click="addInfo" class="gradient-button"
				style="font-weight: bold">新增用户</el-button>
		</div>

		<!-- 内容展示 -->
		<el-table :data="tableData" size='large' style="width: 100%;" border>
			<el-table-column fixed prop="userId" label="用户ID" min-width="85" />
			<el-table-column prop="userName" label="用户名" min-width="140" />
			<el-table-column prop="userPassword" label="密码" min-width="150" />
			<el-table-column prop="userAge" label="年龄" min-width="80" />
			<el-table-column prop="userEmail" label="邮箱" min-width="220" />
			<el-table-column prop="userTel" label="电话号码" min-width="150" />
			<el-table-column prop="userCreateTime" label="用户创建时间" :formatter="formatter" min-width="125" />
			<el-table-column prop="userUpdateTime" label="用户更新时间" :formatter="formatter" min-width="125" />
			<el-table-column prop="isBanned" label="封禁情况" min-width="85">
				<template #default="{ row }">
					<span :style="{ color: row.isBanned === 1 ? 'red' : 'green' }">
						{{ row.isBanned === 1 ? '封禁' : '正常' }}
					</span>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" min-width="160">

				<template #default="row">
					<el-button link type="warning" size="default" plain @click="banInfo(row)" style="font-weight: bold">
						<span v-if="row.row.isBanned === 1">解封</span>
						<span v-else>封禁</span>
					</el-button>
					<el-button link type="primary" size="default" plain @click="getInfoNew(row)"
						style="font-weight: bold">
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

	<!-- 删除确认框 -->
	<div>
		<el-dialog v-model="centerDialogVisible" title="Warning" width="500" align-center>
			<span>你确定要删除 ID:{{ rowNow.userId }} 的相关信息吗?</span>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="centerDialogVisible = false" style="font-weight: bold">
						取消
					</el-button>
					<el-button type="primary" @click="deleteInfo()" style="font-weight: bold">
						确定
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>

	<!-- 查询弹出框(已完善) -->
	<el-dialog v-model="dialogFormVisible" title="查询用户(可选)" width="400" align-center style="font-weight: bold">
		<el-form width="">
			<el-form-item label="用户ID" :label-width="formLabelWidth">
				<el-input v-model="userId" autocomplete="off" placeholder="请输入用户ID" clearable />
			</el-form-item>
			<el-form-item label="用户名" :label-width="formLabelWidth">
				<el-input v-model="userName" autocomplete="off" placeholder="请输入用户名" clearable />
			</el-form-item>
			<el-form-item label="年龄" :label-width="formLabelWidth">
				<el-input v-model="userAge" autocomplete="off" placeholder="请输入年龄" clearable />
			</el-form-item>
			<el-form-item label="邮箱" :label-width="formLabelWidth">
				<el-input v-model="userEmail" autocomplete="off" placeholder="请输入邮箱" clearable />
			</el-form-item>
			<el-form-item label="电话号码" :label-width="formLabelWidth">
				<el-input v-model="userTel" autocomplete="off" placeholder="请输入电话号码" clearable />
			</el-form-item>

		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisible = false" style="font-weight: bold">取消</el-button>
				<el-button type="danger" @click="formSelectDamage" style="font-weight: bold">清空</el-button>
				<el-button type="primary" @click="formSelectChange" style="font-weight: bold">
					查询
				</el-button>
			</div>
		</template>
	</el-dialog>

	<!-- 新增用户弹出框(已完善) -->
	<el-dialog v-model="addForm" title="新增用户" width="400" align-center style="font-weight: bold">
		<el-form width="">
			<el-form-item label="用户ID" :label-width="formLabelWidth">
				<el-input v-model="registerForm.userId" autocomplete="off" placeholder="请输入用户ID" clearable />
			</el-form-item>
			<el-form-item label="用户名" :label-width="formLabelWidth">
				<el-input v-model="registerForm.userName" autocomplete="off" placeholder="请输入用户名" clearable />
			</el-form-item>
			<el-form-item label="密码" :label-width="formLabelWidth">
				<el-input v-model="registerForm.userPassword" autocomplete="off" placeholder="请输入密码" clearable />
			</el-form-item>
			<el-form-item label="确认密码" :label-width="formLabelWidth">
				<el-input v-model="checkPassword" autocomplete="off" placeholder="请输入再次密码" clearable />
			</el-form-item>
			<el-form-item label=" 年龄" :label-width="formLabelWidth">
				<el-input v-model="registerForm.userAge" autocomplete="off" placeholder="请输入年龄" clearable />
			</el-form-item>
			<el-form-item label="邮箱" :label-width="formLabelWidth">
				<el-input v-model="registerForm.userEmail" autocomplete="off" placeholder="请输入邮箱" clearable />
			</el-form-item>
			<el-form-item label="电话号码" :label-width="formLabelWidth">
				<el-input v-model="registerForm.userTel" autocomplete="off" placeholder="请输入电话号码" clearable />
			</el-form-item>

		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="formAddDamage" style="font-weight: bold">取消</el-button>
				<el-button type="primary" @click="formAddChange" style="font-weight: bold">
					注册
				</el-button>
			</div>
		</template>
	</el-dialog>

	<!-- 用户修改操作弹出框 -->
	<el-dialog v-model="changeDialog" title="修改用户信息" width="1000" align-center style="font-weight: bold">
		<span>
			<el-descriptions class="margin-top" :column="3" border>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<DocumentCopy />
							</el-icon>
							<div style="margin-left: 3px;">
								ID
							</div>
						</div>
					</template>
					<el-tag type='success' round style="margin-left: 3px;margin-right: 20px">{{ rowNow.userId}}</el-tag>
				</el-descriptions-item>

				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<user />
							</el-icon>
							<div style="margin-left: 3px;">
								用户名
							</div>
						</div>
					</template>
					<el-input v-model="rowNow.userName" class="class1"></el-input>
				</el-descriptions-item>

				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<DocumentCopy />
							</el-icon>
							<div style="margin-left: 3px;">
								密码
							</div>
						</div>
					</template>
					<el-input v-model="rowNow.userPassword" class="class1"></el-input>
				</el-descriptions-item>

				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<Iphone />
							</el-icon>
							<div style="margin-left: 3px;">
								电话号码
							</div>
						</div>
					</template>
					<el-input v-model="rowNow.userTel" class="class1"></el-input>
				</el-descriptions-item>

				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<Postcard />
							</el-icon>
							<div style="margin-left: 3px;">
								年龄
							</div>
						</div>
					</template>
					<el-input v-model="rowNow.userAge" class="class1"></el-input>
				</el-descriptions-item>

				<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon>
								<Postcard />
							</el-icon>
							<div style="margin-left: 3px;">
								邮箱
							</div>
						</div>
					</template>
					<el-input v-model="rowNow.userEmail" class="class1"></el-input>
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

	<!-- 封禁确认框 -->
	<el-dialog v-model="banDialog" title="Warning" width="500" align-center>
		<span>你确定要进行对 ID:{{ rowNow.userId }} 的进行封禁吗?</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="banDialog = false" style="font-weight: bold">
					取消
				</el-button>
				<el-button type="primary" @click="banRequest()" style="font-weight: bold">
					确定
				</el-button>
			</div>
		</template>
	</el-dialog>

	<!-- 解封确认框 -->
	<el-dialog v-model="disBanDialog" title="Warning" width="500" align-center>
		<span>你确定要进行对 ID:{{ rowNow.userId }} 的进行解封吗?</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="disBanDialog = false" style="font-weight: bold">
					取消
				</el-button>
				<el-button type="primary" @click="banRequest()" style="font-weight: bold">
					确定
				</el-button>
			</div>
		</template>
	</el-dialog>

</template>


<script setup lang="ts" name="User">
import { ref, h, onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'
import { Search, Upload } from '@element-plus/icons-vue'
// 封禁弹窗
const banDialog = ref(false)
// 解封弹窗
const disBanDialog = ref(false)
// 封禁解封
const banInfo = (row: any) => {
	if (row.row.isBanned === 0) {
		rowNow.value = row.row
		banDialog.value = true
	} else {
		rowNow.value = row.row
		disBanDialog.value = true
	}
}
// 封禁解封服务
import { BanUserService } from '@/api/user';
const banRequest = async () => {
	let ban = ref(0)
	if (rowNow.value.isBanned === 0) {
		ban.value = 1
	}
	let params = ref({
		userId: ref(rowNow.value.userId) ,
		isBanned: ref(ban.value)
	})
	let res = BanUserService(params.value)
	if ((await res).data.code === 0) {
		ElMessage.error("无法操作,请联系上层管理员")
		disBanDialog.value = false
		banDialog.value = false
	} else {
		disBanDialog.value = false
		banDialog.value = false
		ElMessage.success("操作成功")
		handleCurrentChange()
	}
}

// 查询表单左侧宽度
const formLabelWidth = '100px'
// 搜索时的选中
let userId = ref()
let userName = ref<string>("")
let userAge = ref()
let userTel = ref<string>("")
let userEmail = ref<string>("")
// 修改按钮取消逻辑
const changeInfoDamage = async () => {
	changeDialog.value = false
	handleCurrentChange()
}
// 新增时的选中
let checkPassword = ref<string>("")
// 注册表单,更新表单
let registerForm = ref({
	userId: ref<number>(),
	userName: ref<string>(""),
	userAge: ref<number>(),
	userTel: ref<string>(""),
	userEmail: ref<string>(""),
	userPassword: ref<string>("")
})
// 查询按钮确定逻辑
const formSelectChange = async () => {
	dialogFormVisible.value = false
	tableData.value = (await (userList())).data.data.rows
	selectSuccess()
}
// 查询按钮清空逻辑，新增用户按钮的退出逻辑
const formSelectDamage = async () => {
	addForm.value = false
	userId.value = ''
	// @ts-ignore
	userName.value = ''
	userAge.value = ''
	// @ts-ignore
	userTel.value = ''
	// @ts-ignore
	userEmail.value = ''
	tableData.value = (await (userList())).data.data.rows
}
// 新增用户按钮触发逻辑
const addInfo = async () => {
	addForm.value = true
}
import { addNewUserByAllParams } from '@/api/user';
// 新增用户按钮确定时触发逻辑
const formAddChange = async () => {
	if (registerForm.value.userId === undefined ||registerForm.value.userName === "" || registerForm.value.userPassword === "") {
		somethingNotWrite()
	} else {
		// @ts-ignore
		if (registerForm.value.userPassword === checkPassword.value) {
			let res = addNewUserByAllParams(registerForm.value)
			if ((await res).data.code === 0) {
				registerFail()
			}
			else {
				formAddDamage()
				registerSuccess()
			}
		} else {
			notSameSecret()
		}
	}
}
// 取消以及完成注册时的消除逻辑
const formAddDamage = async () => {
	// @ts-ignore
	registerForm.value.userId = ''
	checkPassword.value = ''
	registerForm.value.userName = ''
	// @ts-ignore
	registerForm.value.userAge = ''
	registerForm.value.userEmail = ''
	registerForm.value.userPassword = ''
	registerForm.value.userTel = ''
	addForm.value = false
}

// 分页栏
let currentPage = ref(1) // 当前页
let pageSize = ref(10) // 每页条数
let total = ref(10)
const handleSizeChange = async () => {
	tableData.value = (await(userList())).data.data.rows
}
const handleCurrentChange = async () => {
	tableData.value = (await (userList())).data.data.rows
}

// 删除弹窗
const centerDialogVisible = ref(false)
// 修改弹出框
const changeDialog = ref(false)
// 查询弹出框
const dialogFormVisible = ref(false)
// 新增弹出框
const addForm = ref(false)
// 向后端发送更改请求，修改界面按下确定按钮的逻辑
import { updateUserByAnyParams } from '@/api/user';
const changeInfo = async () => {
	let res = updateUserByAnyParams(rowNow.value)
	if ((await res).data.code === 0) {
		registerFail()
	} else {
		changeDialog.value = false
		changeSuccess()
		handleCurrentChange()
	}

}
// 查询按钮点击逻辑
const selectInfo = () => {
	dialogFormVisible.value = true
}

// 获取当前数据信息（修改按钮逻辑）
let rowNow = ref({
	userId: ref<number>(),
	userName: ref<string>(""),
	userAge: ref<number>(),
	userTel: ref<string>(""),
	userEmail: ref<string>(""),
	userPassword: ref<string>(""),
	isBanned:ref()
})
function getInfoNew(row: any) {
	console.log(row)
	rowNow.value = row.row
	console.log(rowNow.value)
	changeDialog.value = true
}
import { deleteUserById } from '@/api/user';
// 删除按钮的绑定
const deleteButton = async (row: any) => {
	rowNow.value.userId = row.row.userId
	centerDialogVisible.value = true
}

// 删除二次确认框相关的确认信息
const deleteInfo = async () => {
	centerDialogVisible.value = false
	// @ts-ignore
	let res = deleteUserById(rowNow.value.userId)
	if ((await res).data.code === 1) {
		deleteSuccess()
	}
	else {
		deleteFailure()
	}
	handleCurrentChange()
}

// 消息通知--注册成功
const registerSuccess = () => {
	ElMessage.success('用户ID:' + registerForm.value.userId + '信息注册成功')
}
// 消息通知--更新成功
const changeSuccess = () => {
	ElMessage.success('用户ID:' + rowNow.value.userId + '信息更新成功')
}
// 消息通知--更新失败（注册失败）
const registerFail = () => {
	ElMessage.error('用户ID或用户名已存在,换一个试试吧')
}
// 消息通知--密码不一致
const notSameSecret = () => {
	ElMessage.error('两次输入密码不一致,请进行检查')
}
// 消息通知--请完善注册表单
const somethingNotWrite = () => {
	ElMessage.error('请完善注册表单后再进行注册')
}
// 消息通知--删除成功
const deleteSuccess = () => {
	ElMessage.success('用户ID:' + rowNow.value.userId + '删除成功')
}
// 消息通知--删除失败
const deleteFailure = () => {
	ElMessage.error('用户ID:' + rowNow.value.userId + '删除失败,该用户或许是负责人或更高阶的管理员,请与管理员联系')
}
// 消息通知--查询成功
const selectSuccess = () => {
	ElMessage.success("查询成功")
}
// 显示界面时间规范化
const formatter = function (row: any, column: any, cellValue: any, index: any) {
	if (typeof cellValue === 'string' && cellValue.includes('T')) {
		return cellValue.split('T')[0];
	}
	return cellValue;
}
// 渲染表格
onBeforeMount(async() => {
	tableData.value = (await userList()).data.data.rows
}) 

import { getUserByParamsAndPage } from '@/api/user';

const userList = async () => {
	console.log("hello")
	let params = {
		page: currentPage.value,
		pageSize: pageSize.value,
		userId: userId.value ? userId.value : null,
		userName: userName.value ? userName.value : null,
		userAge: userAge.value ? userAge.value : null,
		userTel: userTel.value ? userTel.value : null,
		userEmail: userEmail.value ? userEmail.value : null
	}
	let result = await getUserByParamsAndPage(params)
	total = result.data.data.total
	return result
}

let tableData = ref([])
</script>



<style scoped>
.cell-item {
	display: flex;
	align-items: center;
}

.class1:deep(.el-input__wrapper) {
	box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
	cursor: default;
	width: 80px
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
