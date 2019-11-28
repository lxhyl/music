<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="position:absolute;left:20px;"></i>
        {{ artist.name}}
      </p>
    </el-header>
    <div class="singerInfo">
      <el-image :src="artist.picUrl">
        <div slot="placeholder" class="image-slot">加载中</div>
      </el-image>
      <p style="text-align:left;font-size:13px;line-height:25px;">{{ artist.briefDesc }}</p>
    </div>
    <p style="text-align:left; margin-top:10px;">热门歌曲</p>
    <el-divider style="margin:0px 0;"></el-divider>
    <div class="songsContainer">
      <div @click="getSong(item.id)" v-for="(item,index) in list" :key="index" class="songsItem">
        <div class="itemIndex">{{ index + 1}}</div>
        <div class="itemInfo">
          <p class="songName">{{item.name}}</p>
          <p class="singerAndal">
            <span v-for="(singer,index) in item.ar" :key="index">
              {{singer.name}}
              -
            </span>
            <span>{{item.al.name}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "singersongs",
  data() {
    return {
      //歌手信息
      artist: {},
      //歌手单曲
      list: []
    };
  },
  created() {
     this.isLogin();
    //获取歌手信息
    this.getData();
  },
  methods: {
    getData() {
      var id = this.$store.state.singerId;
      this.$axios
        .get("http://zhangpengfan.xyz:3000/artists?id=" + id)
        .then(res => {
      
          this.artist = res.data.artist;
          this.list = this.list.concat(res.data.hotSongs);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goToHome() {
      this.$router.push("/search");
    },
    getSong(e) {
      this.$store.commit("getSongId", e);
      this.$store.commit("goToPreviousPage", "search");
      this.$router.push("/play");
    }
  }
};
</script>
<style scoped>
.el-divider {
  margin: 0;
  margin-bottom: 10px;
}
.songsContainer {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.songsItem {
  width: 96%;
  margin: 0 2%;
  position: relative;
  height: 50px;
  margin: 5px 0;
}
.itemIndex {
  position: absolute;
  width: 10%;
  line-height: 50px;
  left: 0;
  top: 0;
}
.itemInfo {
  position: absolute;
  left: 10%;
  width: 90%;
  text-align: left;
}
span {
  height: 25px;
  line-height: 25px;
}
.singerAndal {
  width: 100%;
  position: relative;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>