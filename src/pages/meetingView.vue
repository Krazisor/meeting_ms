<template>
    <div class="meetingView">
        <div class="title">
            会议总览
        </div>
        <!-- 筛选框 -->
        <div class="mb-4" style="text-align: right;margin-right: 3%;margin-bottom: 10px;margin-top: 10px">
            <el-button type=" primary" :icon="Search" @click="selectInfo" style="margin-right: 20px;font-weight:bold"
                class="gradient-button">会议请求筛选</el-button>

            <el-select v-model="value" placeholder="选择审批状态" style="width: 160px;font-weight: bold" clearable
                @change="selectChange()" class="custom-select">
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
        <el-table :data="requestData" size='large' style="width: 100%;" border>
            <el-table-column fixed prop="rentalId" label="请求ID" min-width="80" />
            <el-table-column prop="userId" label="请求用户ID" min-width="80" />
            <el-table-column prop="meetingroomId" label="请求房间号" min-width="80" />
            <el-table-column prop="meetingroomRentaldate" label="预定日期" min-width="100" />
            <el-table-column prop="meetingroomRentaltime" label="预定时间" min-width="100" :formatter="timeFormatter" />
            <el-table-column prop="rentalDescribe" label="详细描述" min-width="150" />
            <el-table-column prop="approval" label="审批结果" min-width="50" :formatter="approvalFormatter" />

            <el-table-column fixed="right" label="操作" min-width="120">

                <template #default="row">
                    <el-button type="primary" size="small" plain @click="passRequestButton(row)"
                        :disabled="row.row.approval === 0 ? false : true" style="font-weight: bold">
                        通过
                    </el-button>
                    <el-button type="danger" size="small" plain @click="refuseRequestButton(row)"
                        :disabled="row.row.approval === 0 ? false : true" style="font-weight: bold">
                        驳回
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
</template>

<script setup lang = "ts" name = "MeetingView">
</script>

<style scoped>

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
