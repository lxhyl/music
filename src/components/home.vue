<template>
  <div>
       <div class="userDetail" v-if="getDateFinish">
    <el-header style="height:200px;">
        <img @click="goToPlaza" src="../assets/Music.png" class="logo">
        <i @click="goToSearch" class="el-icon-search search" > </i>
        <el-avatar size="large" :src="userDetail.profile.avatarUrl"></el-avatar>
        <div class="userDetailInfo">
          <p>{{userDetail.profile.nickname}}</p>
          <p>{{userDetail.profile.signature}}</p>
          <p style="color:#BDBDBD;">
            等级:{{userDetail.level}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            累计听歌{{userDetail.listenSongs}}首
          </p>
       
      </div>
    </el-header>
    <el-main>
      
      <div class="container">
         <p style="width:45%;">我的歌单</p>
        <el-card v-for="(item,index) in playList" :key="index">
          <div @click="goSongList(item.id,item.name)">
            <span style="position:absolute;top:10px;left:10px;">{{index+1}}</span>
            <el-image style="width: 100px; height: 100px;margin-top:10px;" :src="item.coverImgUrl" fit="fit"></el-image>
            <div>
              <p style="font-size:12px;margin:0;">{{item.name}}</p>
              <span
                style="font-size:12px;color:#BDBDBD;position:absolute;right:5px;bottom:5px;"
              >累计播放{{item.playCount}}次</span>
            </div>
          </div>
        </el-card>
      </div>
    </el-main>
     </div>
     <div v-else style="top:200px;">
        <i class="el-icon-loading"></i>
        <p>加载中</p>
     </div>
  </div>
</template>
<script>


export default {
  name: "home",
 
  data() {
    return {
      id: this.$store.state.userId,
      getDateFinish: false,
      //用户信息
      userDetail: {},
      //用户歌单
      playList: []
    };
  },
  mounted() {
    //拿到用户ID
    const id = JSON.parse(localStorage.getItem("id"));
    //获取用户信息
    this.$axios
      .get("/api/user/detail?uid=" + id)
      .then(res => {
        this.userDetail = res.data;

        this.getDateFinish = true;
      })
      .catch(err => {
        console.log(err);
      });
    //获取用户歌单信息
    this.$axios
      .get("/api/user/playlist?uid=" + id)
      .then(res => {
        this.playList = this.playList.concat(res.data.playlist);
       
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goSongList(e,name) {
      this.$store.commit("getSongListId", e);
      this.$store.commit('goToPreviousPage','home')
       this.$store.commit('getTopListName',name)
      this.$router.push("songList");
    },
    goToPlaza(){
      this.$store.commit('goToPreviousPage','home')
      this.$router.push('plaza')
    },
    goToSearch(){
      this.$router.push('search')
    }
  }
};
</script>
<style scoped>
.logo{
  position: absolute;
  width: 40px;
  height: 40px;
  left:10px;
  right: 0;
  margin: 20px;
}
.el-main {
  padding: 0;
  margin: 0 10px;
}
.userDetail {
  height: 80px;
  width: 100%;
}
.el-avatar {
  position: relative;
  left: 10px;
  top: 20px;
}
.userDetailInfo {
  position: relative;
  width: 100%;
  left: 0;
  font-size: 14px;
  margin-top: 20px;
}
.userDetailInfo p {
  height: 20px;
  margin: 0;
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}
.el-card {
  width: 90%;
  height: 180px;
  margin: 10px 0;
  position: relative;
}
.search{
  position: absolute;
  top: 0;
  right: 10px;
  margin: 20px;
}
.el-icon-search:before{
  font-size: 20px;
 
}

</style>