import {createRouter,createWebHistory} from 'vue-router'
import User from '@/pages/User.vue';
import Meeting from '@/pages/Meeting.vue';
import AuditManage from '@/pages/AuditManage.vue';
import Audit from '@/pages/Audit.vue';
import AboutMe from '@/pages/AboutMe.vue';

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
    // 重定向
    {
        path:'/',
        redirect:'/user'
    }
  ]
})
export default router