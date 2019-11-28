import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// //登陆页
// import login from '../components/login.vue'
// //首页
// import home from '../components/home.vue'
// //歌曲列表
// import songList from '../components/songList.vue'
// //播放音乐
// import play from '../components/play.vue'
// //播放视频
// import video from "../components/video.vue"
// //评论
// import comment from "../components/comment.vue"
// //广场
// import plaza from "../components/plaza/plaza.vue"
// //推荐
// import recommend from "../components/plaza/recommend.vue"
// //排行
// import top from "../components/plaza/top.vue"
// //MV
// import mv from "../components/plaza/mv.vue"
// //播放mv
// import playmv from "../components/playmv.vue"
// //榜单list
// import list from "../components/plaza/list.vue"
// //搜索
// import search from "../components/search.vue"
// import song from "../components/search/song.vue"
// import songer from "../components/search/singer.vue"
// import searchmv from "../components/search/mv.vue"
// //歌手单曲列表
// import singersongs from "../components/singerSongList.vue"
// //电台
// import fm from "../components/fm.vue"
export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../components/login.vue')
        }, {
            path: '/home',
            name: 'home',
            component: () => import('../components/home.vue')
        }, {
            path: '/songList',
            name: 'songList',
            component: () => import('../components/songList.vue')
        }, {
            path: '/play',
            name: 'play',
            component: () => import('../components/play.vue')
        }, {
            path: '/video',
            name: 'video',
            component: () => import('../components/video.vue')
        }, {
            path: '/comment',
            name: 'comment',
            component: () => import('../components/comment.vue')
        }, {
            path: '/plaza',
            name: 'plaza',
            component: () => import('../components/plaza/plaza.vue')
        }, {
            path: '/recommend',
            name: 'recommend',
            component: () => import('../components/plaza/recommend.vue')
        }, {
            path: '/top',
            name: 'top',
            component: () => import('../components/plaza/top.vue')
        }, {
            path: '/mv',
            name: 'mv',
            component: () => import('../components/plaza/mv.vue')
        }, {
            path: '/playmv',
            name: 'playmv',
            component: () => import('../components/playmv.vue')
        }, {
            path: '/list',
            name: 'list',
            component: () => import('../components/plaza/list.vue')
        }, {
            path: '/singersongs',
            name: 'singersongs',
            component: () => import('../components/singerSongList.vue')
        }, {
            path: '/fm',
            name: 'fm',
            component: () => import('../components/fm.vue')
        }, {
            path: '/about',
            name: 'about',
            component: () => import('../components/about.vue')
        }, {
            path: '/search',
            name: 'search',
            component: () => import('../components/search.vue'),
            children: [
                {
                    path: 'song',
                    name: 'song',
                    component: () => import('../components/search/song.vue')
                }, {
                    path: 'searchmv',
                    name: 'searchmv',
                    component: () => import('../components/search/mv.vue')
                }, {
                    path: 'singer',
                    name: 'singer',
                    component: () => import('../components/search/singer.vue')
                }
            ]
        }

    ]
})
//下列代码解决当已经在此页面，再次点击路由到此页面就会报错的问题。
//虽不影响使用，但报错看着心烦
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
