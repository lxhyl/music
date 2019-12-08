import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//登陆页
import login from '../components/login.vue'
//首页
import home from '../components/home.vue'
//歌曲列表
import songList from '../components/songList.vue'
//播放音乐
import play from '../components/play.vue'
//播放视频
import video from "../components/video.vue"
//评论
import comment from "../components/comment.vue"
//广场
import plaza from "../components/plaza/plaza.vue"
//推荐
import recommend from "../components/plaza/recommend.vue"
//排行
import top from "../components/plaza/top.vue"
//MV
import mv from "../components/plaza/mv.vue"
//播放mv
import playmv from "../components/playmv.vue"
//榜单list
import list from "../components/plaza/list.vue"
//搜索
import search from "../components/search.vue"
import song from "../components/search/song.vue"
import songer from "../components/search/singer.vue"
import searchmv from "../components/search/mv.vue"
//歌手单曲列表
import singersongs from "../components/singerSongList.vue"
//电台
import fm from "../components/fm.vue"
//关于
import about from "../components/about.vue"

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        }, {
            path: '/home',
            name: 'home',
            component:home
        }, {
            path: '/songList',
            name: 'songList',
            component:songList
        }, {
            path: '/play',
            name: 'play',
            component:play
        }, {
            path: '/video',
            name: 'video',
            component:video
        }, {
            path: '/comment',
            name: 'comment',
            component:comment
        }, {
            path: '/plaza',
            name: 'plaza',
            component:plaza
        }, {
            path: '/recommend',
            name: 'recommend',
            component: recommend
        }, {
            path: '/top',
            name: 'top',
            component:top
        }, {
            path: '/mv',
            name: 'mv',
            component:mv
        }, {
            path: '/playmv',
            name: 'playmv',
            component:playmv
        }, {
            path: '/list',
            name: 'list',
            component:list
        }, {
            path: '/singersongs',
            name: 'singersongs',
            component:singersongs
        }, {
            path: '/fm',
            name: 'fm',
            component:fm.vue
        }, {
            path: '/about',
            name: 'about',
            component:about
        }, {
            path: '/search',
            name: 'search',
            component:search,
            children: [
                {
                    path: 'song',
                    name: 'song',
                    component:song
                }, {
                    path: 'searchmv',
                    name: 'searchmv',
                    component:searchmv
                }, {
                    path: 'singer',
                    name: 'singer',
                    component: songer
                }
            ]
        }

    ]
})
//下列代码解决当已经在此页面，再次点击路由到此页面就会报错的问题。
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
