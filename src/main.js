import Vue from 'vue';
import App from './App.vue';

//axios
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.withCredentials =true;

//路由
import VueRouter from 'vue-router';
import router from './router/router';
Vue.use(VueRouter);

//vuex
import store from './store/index'


//饿了么UI
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
import {
  Dialog,
  Card,
  Divider,
  Header,
  Main,
  Image,
  Carousel,
  CarouselItem,
  Input,
  Button,
  Select,
  Form,
  FormItem,
  Message,
  Timeline,
  TimelineItem,
  Avatar,
  Drawer,
  Option,
  MessageBox,
  Slider,
  Link,
} from 'element-ui';
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Header);
Vue.use(Main);
Vue.use(Image);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Avatar);
Vue.use(Drawer);
Vue.use(Option);
Vue.use(Slider);
Vue.use(Link)
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
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

//歌曲时长格式化
Vue.filter('toMS', function (e) {
  const m = parseInt(e / 60);
  var  s = e - m * 60;
  s =  s < 10 ? '0'+s : s;
  return m + ":" + s
})

//判断是否登陆
Vue.prototype.isLogin = function(){
  var user = JSON.parse(localStorage.getItem('user'));
  if(user== null){
    this.$router.push('/')
    this.$message({
      message:"请登录",
      type: "warning"
    });
  }
}

