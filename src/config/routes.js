import index from '../page/index.vue'
import districtSiteList from '../page/districtSiteList.vue'
import login from '../page/login.vue'
import register from '../page/register.vue'
import changePassword from '../page/changePassword.vue'
import freeVisit from '../page/freeVisit.vue'
import space from '../page/space.vue'
import discover from '../page/discover.vue'
import myinfo from '../page/myinfo.vue'
import waitVisitList from '../page/waitVisitList.vue'
import applyByperson from '../page/applyByperson.vue'
import settingByperson from '../page/settingByperson.vue'
import detailInSite from '../page/detailInSite.vue'
import reProject from '../page/reProject.vue'
import edProject from '../page/edProject.vue'
import attention from '../page/attention.vue'
import detailInSpace from '../page/detailInSpace.vue'
import applicationDetails from '../page/applicationDetails.vue'
import waitingToVisit from '../page/waitingToVisit.vue'
import proTitle from '../page/proTitle.vue'
import district from '../page/district.vue'
import projectAdd from '../page/projectAdd.vue'
import coproblems from '../page/coproblems.vue'
import feedback from '../page/feedback.vue'
import aboutUs from '../page/aboutUs.vue'
import aNewCount from '../page/aNewCount.vue'
import aTitle from '../page/aTitle.vue'
import aEdit from '../page/aEdit.vue'
import aSubCount from '../page/aSubCount.vue'
import aCount from '../page/aCount.vue'
import boutique from '../page/boutique.vue'
import infosOfme from '../page/infosOfme.vue'
import changePhone from '../page/changePhone.vue'
import aSedit from '../page/aSedit.vue'
import disRank from '../page/disRank.vue'
import myProject from '../page/myProject.vue'

export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index,
    name: 'index'
    // meta: { requiresAuth: true }
  },
  {
    path: '/districtSiteList/:sitename',
    component: districtSiteList,
    name: 'districtSiteList',
    meta: { requiresAuth: true }
  },
  {
    path: '/aSedit',
    component: aSedit,
    name: '权限编辑',
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: login,
    name: '登录'
  },
  {
    path: '/register',
    component: register,
    name: '注册'
  },
  {
    path: '/disRank',
    component: disRank,
    name: '排名',
    meta: { requiresAuth: true }
  },
  {
    path: '/changePassword',
    component: changePassword,
    name: '修改密码',
    meta: { requiresAuth: true }

  },
  {
    path: '/freeVisit/:pid/:visitUid',
    component: freeVisit,
    name: 'freeVisit',
    meta: { requiresAuth: true }
  },
  {
    path: '/space',
    component: space,
    name: '我的空间',
    meta: { requiresAuth: true }
  },
  {
    path: '/discover',
    component: discover,
    name: '发现',
    meta: { requiresAuth: true }
  },
  {
    path: '/myinfo',
    component: myinfo,
    name: '个人信息',
    meta: { requiresAuth: true }
  },
  {
    path: '/waitVisitList',
    component: waitVisitList,
    name: 'waitVisitList',
    meta: { requiresAuth: true }
  },
  {
    path: '/applyByperson/:vid/:uid',
    component: applyByperson,
    name: '客户信息',
    meta: { requiresAuth: true }
  },
  {
    path: '/settingByperson',
    component: settingByperson,
    name: '个人设置',
    meta: { requiresAuth: true }
  },
  {
    path: '/detailInSite/:siteId',
    component: detailInSite,
    name: 'detailInSite',
    meta: { requiresAuth: true }
  },
  {
    path: '/reProject',
    component: reProject,
    name: '发布记录',
    // meta: { requiresAuth: true ,keepAlive: true}
    meta: { requiresAuth: true }
  },
  {
    path: '/attention',
    component: attention,
    name: '关注',
    meta: { requiresAuth: true }
  },
  {
    path: '/detailInSpace/:siteId',
    component: detailInSpace,
    name: '空间详情',
    meta: { requiresAuth: true }
  },
  {
    path: '/applicationDetails/:vid',
    component: applicationDetails,
    name: 'applicationDetails',
    meta: { requiresAuth: true }
  },
  {
    path: '/waitingToVisit',
    component: waitingToVisit,
    name: '我的申请',
    meta: { requiresAuth: true }
  },
  {
    path: '/proTitle',
    component: proTitle,
    name: '项目标题',
    meta: { requiresAuth: true }
  },
  {
    path: '/district',
    component: district,
    name: '区域',
    meta: { requiresAuth: true }
  },
  {
    path: '/projectAdd',
    component: projectAdd,
    name: '项目地址',
    meta: { requiresAuth: true }
  },
  {
    path: '/coproblems',
    component: coproblems,
    name: 'coproblems',
    meta: { requiresAuth: true }
  },
  {
    path: '/feedback',
    component: feedback,
    name: '意见反馈',
    meta: { requiresAuth: true }
  },
  {
    path: '/aboutUs',
    component: aboutUs,
    name: '版本更新说明',
    meta: { requiresAuth: true }
  },
  {
    path: '/aTitle',
    component: aTitle,
    name: 'aTitle',
    meta: { requiresAuth: true }
  },
  {
    path: '/aEdit/:pidAll',
    component: aEdit,
    name: 'aEdit',
    meta: { requiresAuth: true }
  },
  {
    path: '/aCount',
    component: aCount,
    name: 'aCount',
    meta: { requiresAuth: true }
  },
  {
    path: '/aNewCount',
    component: aNewCount,
    name: 'aNewCount',
    meta: { requiresAuth: true }
  },
  {
    path: '/aSubCount',
    component: aSubCount,
    name: 'aSubCount',
    meta: { requiresAuth: true }
  },
  {
    path: '/edProject/:pid/:rid',
    component: edProject,
    name: '编辑记录',
    meta: { requiresAuth: true }
  },
  {
    path: '/boutique',
    component: boutique,
    name: '精品',
    meta: { requiresAuth: true }
  },
  {
    path: '/infosOfme',
    component: infosOfme,
    name: 'infosOfme',
    meta: { requiresAuth: true }
  },
  {
    path: '/changePhone',
    component: changePhone,
    name: 'changePhone',
    meta: { requiresAuth: true }
  },
  {
    path: '/myProject',
    component: myProject,
    name: '我的项目',
    meta: { requiresAuth: true }
  }
]