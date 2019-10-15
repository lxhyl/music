<template>
  <div>
    <div class="videoContainer">
      <div @click="getVideo(item.vid)" v-for="(item,index) in videoList" :key="index" class="videoItem">
        <span class="playTime">播放次数：{{item.playTime}}次</span>
        <el-image :src="item.coverUrl">
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading"></i>
            <p>加载中</p>
          </div>
        </el-image>
        <p style="font-size:13px;text-align:left;">{{item.title}}</p>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoList: []
    };
  },
  mounted() {
    let search = this.$store.state.search;
    this.$axios
      .get(
        "/api/search?limit=10&keywords=" +
          search.keywords +
          "&type=" +
          search.select
      )
      .then(res => {
      
        this.videoList = this.videoList.concat(res.data.result.videos);
       
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
      getVideo(e){

         this.$store.commit('getVideoId',e)
         this.$store.commit('goToPreviousPage','/search/searchmv')
         this.$router.push('/video')
      }
  }
};
</script>
<style scoped>
.videoContainer {
  width: 96%;
  margin: 0 2%;
  display: flex;
  flex-wrap: wrap;
}
.videoItem {
  width: 100%;
  position: relative;
}
.playTime {
  position: absolute;
  top: 0;
  left: 0;
  margin: 24px 5px;
  z-index: 999;
  color: #f5f5f5;
}
.el-divider {
  margin: 10px 0;
}
</style>