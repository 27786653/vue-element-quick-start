import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/home';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      component: Home,
    },
    {
      path: '/404',
      component: resolve => require(['@/components/common/error/404.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});
