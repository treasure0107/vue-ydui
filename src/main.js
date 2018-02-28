// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import routes from './config/routes'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import 'vue-ydui/dist/ydui.base.css'
import {Popup} from 'vue-ydui/dist/lib.rem/popup'
import axios from 'axios'
import api from './config/api'
import fastclick from 'fastclick'
fastclick.attach(document.body)
Vue.prototype.$http = axios
Vue.prototype.$api=api
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(YDUI)
// Vue.config.productionTip = false
const router = new VueRouter({
  // mode: 'history',
  saveScrollPosition: true,
  transitionOnLoad: true,
  routes: routes
});
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// localStorage.uid='100001';
/* eslint-disable no-new */
router.afterEach(function(route) {
  if (route.name) {
    document.title = route.name;
  }
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //校验这个目标页面是否需要登录
    if (!localStorage.uid) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
