import Vue from 'vue';
import Vuex from 'vuex';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import store from './store/store';
import './style/common/style.scss';
import router from './router';
import axios from 'axios';
import AuthAction from './common/auth.action.js';
import '@/style/animate.css'

Vue.use(Element);
Vue.use(Vuex);
Vue.use(AuthAction);
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  // const sysUserInfo = JSON.parse(sessionStorage.getItem('sysUserInfo'));
  // if(to.name == 'login') {
  //   if(sysUserInfo != {} && sysUserInfo != undefined && sysUserInfo != null){
  //     next({ path: '/welcome' });
  //   }else{
  //     next();
  //   }
  // }	else {
  //   if(sysUserInfo == null){
  //     // next(false)
  //     next({ path: '/login' });
  //   } else{
      next()
  //   }
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
