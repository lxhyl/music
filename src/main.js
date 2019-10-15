import Vue from 'vue';
import App from './App.vue';
//axios
import axios from 'axios';
Vue.prototype.$axios = axios;
//路由
import VueRouter from 'vue-router';
import router from './router/router';

Vue.use(VueRouter);

//vuex
import store from './store/index'

//饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({

  router,
  store,
  render: h => h(App),
}).$mount('#app')

//过滤器
Vue.filter('toTime', function (e) {
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  return new Date(e).Format('yy-MM-dd hh:mm:ss');
})
Vue.filter('toMS', function (e) {
 
  const m = parseInt(e / 60);
  var  s = e - m * 60;
  s =  s < 10 ? '0'+s : s;
  return m + ":" + s
  
})
