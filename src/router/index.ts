import {createRouter,createWebHistory} from 'vue-router'
import User from '@/pages/User.vue';
import Meeting from '@/pages/Meeting.vue';
import AuditManage from '@/pages/AuditManage.vue';
import Audit from '@/pages/Audit.vue';
import AboutMe from '@/pages/AboutMe.vue';
import AdminManage from '@/pages/AdminManage.vue';

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:'/user',
      component:User
    },
    {
      path:'/meeting',
      component:Meeting
    },
    {
      path:'/auditManage',
      component:AuditManage
    },
    {
      path: '/audit',
      component:Audit
    },
    {
      path: '/aboutMe',
      component: AboutMe
    },
    {
      path: '/adminManage',
      component:AdminManage
    },
    // 重定向
    {
      path:'/',
      redirect:'/aboutMe'
    }
  ]
})
export default router