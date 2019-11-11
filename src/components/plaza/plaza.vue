<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="position:absolute;left:20px;"></i>
        广场
      </p>
    </el-header>
    <el-main>
      <div v-if="getBinnersFinish">
        <el-carousel trigger="click" height="200px" indicator-position="none">
          <el-carousel-item v-for="(item,index) in banners" :key="index">
            <el-image :src="item.pic"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-else>
        <i class="el-icon-loading"></i>
        <p>加载中</p>
      </div>
      <div class="iconContainer">
        <div @click="goToRecommend" class="iconItem">
          <i class="el-icon-headset icon"></i>
          <br />
          <span>每日推荐</span>
        </div>
        <div @click="goToTop" class="iconItem">
          <i class="el-icon-tickets icon"></i>
          <br />
          <span>排行榜</span>
        </div>
        <div @click="goToMv" class="iconItem">
          <i class="el-icon-video-play icon"></i>
          <br />
          <span>视频</span>
        </div>
      </div>
      <el-divider>
        <!-- <i class="el-icon-more"></i> -->
      </el-divider>

      <div>
        <p style="text-align:left;font-size:14px;margin:0 10px;">推荐新歌</p>

        <div v-if="getNewMuiscFinish" class="newSongContainer">
          <el-card v-for="(item,index) in list " :key="index">
            <div @click="getMusic(item.id)">
              <el-avatar :src="item.song.album.blurPicUrl"></el-avatar>
              <p style="font-size:12px;">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <div v-else>
          <i class="el-icon-loading"></i>
          <p>加载中</p>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  name:'plaza',
  data() {
    return {
      banners: [],
      list: [],
      getBinnersFinish: false,
      getNewMuiscFinish: false
    };
  },
  mounted() {
    //banners数据
    this.$axios
      .get("/api/banner?type=1")
      .then(res => {
        this.banners = this.banners.concat(res.data.banners);
        this.getBinnersFinish = true;
      })
      .catch(err => {
        console.log(err);
      });
    //新歌推荐
    this.$axios
      .get("/api/personalized/newsong")
      .then(res => {
        this.list = this.list.concat(res.data.result);
      
        this.getNewMuiscFinish = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goToHome() {
      this.$router.push("home");
    },
    getMusic(e) {
      this.$store.commit("getSongId", e);
      this.$store.commit("goToPreviousPage", "plaza");
      this.$router.push("play");
    },
    goToRecommend() {
      this.$store.commit("goToPreviousPage", "plaza");
      this.$router.push("recommend");
    },
    goToTop() {
      this.$store.commit("goToPreviousPage", "plaza");
      this.$router.push("top");
    },
    goToMv() {
      this.$store.commit("goToPreviousPage", "plaza");
      this.$router.push("mv");
    }
  }
};
</script>
<style scoped>
.el-main {
  padding: 0;
}
.iconContainer,
.newSongContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.iconItem {
  width: 60px;
  margin: 0 10px;
}

.icon {
  font-size: 30px;
}
</style>