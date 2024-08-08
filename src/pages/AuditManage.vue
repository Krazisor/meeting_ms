<template>
  <div class="auditManage">
    <div class="userSelect">
      <el-table :data="meetingData" max-height="90vh" size='large' style="width: 40%">
        <el-table-column fixed prop="meetingRoomID" label="会议室房间号" min-width="100" />
        <el-table-column prop="meetingRoomSize" label="会议室规模" min-width="80" />
        <el-table-column prop="meetingRoomHeadID" label="负责人" min-width="100" />

        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="{ row }">
            <el-button link type="primary" size="default" plain @click="showDetails(row)">
              详情
            </el-button>
            <el-button link type="danger" size="default" plain @click="">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="detailContent" v-if="selectedDetail">
      <h2>会议室详情</h2>
      <p>会议室房间号: {{ selectedDetail.meetingRoomID }}</p>
      <p>会议室规模: {{ selectedDetail.meetingRoomSize }}</p>
      <p>负责人: {{ selectedDetail.meetingRoomHeadID }}</p>
    </div>
  </div>
</template>

<script setup lang = "ts" name = "AuditManage">
import { ref } from 'vue';

let meetingData = ref([
  {
    meetingRoomID: 2137,
    meetingRoomSize: 50,
    meetingRoomHeadID: 9876
  },
  {
    meetingRoomID: 2138,
    meetingRoomSize: 80,
    meetingRoomHeadID: 9877
  }
]);

let selectedDetail = ref({
    meetingRoomID: 0,
    meetingRoomSize: 0,
    meetingRoomHeadID: 0
});

function showDetails(row:any) {
  selectedDetail.value = row;
}
</script>

<style scoped></style>