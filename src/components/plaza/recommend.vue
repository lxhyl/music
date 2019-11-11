<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="position:absolute;left:20px;"></i>
        每日推荐
      </p>
    </el-header>
    <el-main>
      <div v-if="loading" class="recommendContainer">
        <div class="recommendItem" v-for="(item,index) in dailySongs" :key="index">
          <div @click="getMusic(item.id)">
            <el-avatar style="margin-top:0;" :src="item.album.picUrl"></el-avatar>
            <div class="recommendInfo">
              <p>{{item.name}}</p>
              <p style="color:#9E9E9E">{{item.reason}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <i class="el-icon-loading"></i>
        <p>加载中</p>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  name:'plazaRecommend',
  data() {
    return {
      loading: false,
      dailySongs: []
    };
  },
  mounted() {
    this.$axios
      .get("api/recommend/songs")
      .then(res => {
        this.dailySongs = this.dailySongs.concat(res.data.data.dailySongs);
       
        this.loading = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goToHome() {
     
      this.$router.push('plaza');
    },
    getMusic(id) {
      this.$store.commit("getSongId", id);
      this.$store.commit("goToPreviousPage", "recommend");
     
      this.$router.push("play");
    }
  }
};
</script>
<style scoped>
.recommendContainer {
  width: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
}
.recommendItem {
  width: 95%;
  text-align: left;
  position: relative;
  border-bottom: solid 1px #9e9e9e;
  margin: 10px 0;
}
.recommendInfo {
  position: absolute;
  top: 0;
  width: 80%;
  left: 20%;
  font-size: 12px;
}
</style>