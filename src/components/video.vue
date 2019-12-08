<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="font-size:30px;position:absolute;left:20px;"></i>
        视频
      </p>
    </el-header>
    <el-main>
      <div>
         <video :src="videoUrl" controls="controls"></video>
      </div>
      <div >
          <p style="text-align:left;">{{video.title}}</p>
          <span >{{video.playTime}}次播放</span>

      </div>
      <el-divider></el-divider>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
        videoUrl:'',
        video:{}
    };
  },
  created(){
 this.isLogin();
  },
  mounted() {
    //获取视频详情
    this.getVideoDetail();
    //获取视频地址
    this.getVideoUrl();
  },
  methods: {
    goToHome() {
      let page = this.$store.state.previousPage;
      this.$router.push(page);
    },
    getVideoDetail() {
      const id = this.$store.state.videoId;
     
      this.$axios
        .get("http://zhangpengfan.xyz:3000/video/detail?id=" + id)
        .then(res => {
       
          this.video = res.data.data
          console.log(this.video)
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVideoUrl() {
      const id = this.$store.state.videoId;
     
      this.$axios
        .get("http://zhangpengfan.xyz:3000/video/url?id=" + id)
        .then(res => {
         
          this.videoUrl = res.data.urls[0].url;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
video{
    width: 100%;
}
span{
    position: absolute;
    right: 0;
    margin:0 10px;
}
</style>