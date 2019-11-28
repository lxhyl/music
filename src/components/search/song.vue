<template>
  <div class="songContainer">
    <div v-if="getDataFinish" style="width:100%;">
      <div v-for="(item,index) in songs" @click="getSong(item.id)" :key="index" class="songItem">
        <p>{{item.name}}</p>
        <span v-for="(art,index) in item.artists" :key="index">
            {{art.name}} &nbsp;</span>
      </div>
    </div>
    <div v-else style="text-align:center;width:100%;">
      <i class="el-icon-loading"></i>
      <p>加载中</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songs: [],
      getDataFinish: false
    };
  },

  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      const keywords = this.$store.state.search.keywords;
      this.$axios
        .get("http://zhangpengfan.xyz:3000/search?keywords=" + keywords)
        .then(res => {
          this.songs = this.songs.concat(res.data.result.songs);
          this.getDataFinish = true;
        })
        .catch(err => {
          console.log(err);
        });
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
.songContainer {
  width: 96%;
  margin: 0 2%;
  left: 0;
  display: flex;
  flex-wrap: wrap;
}
.songItem {
  width: 100%;
  justify-content: left;
  text-align: left;
  margin: 10px 0;
  border-bottom: 1px solid #bdbdbd;
}
</style>