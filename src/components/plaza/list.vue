<template>
  <div>
    <div v-if="getDataFinish">
      <el-header>
        <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="position:absolute;left:20px;font-size:30px;"></i>
         {{ name }}
      </p>
      </el-header>
      <el-main>
        <div class="container">
          <el-card v-for="(item,index) in list " :key="index">
            <div @click="getMusic(item.id)">
              <el-avatar style="margin-top:0;" :src="item.al.picUrl"></el-avatar>
              <p style="font-size:12px;">{{ item.name }}</p>
              <p>
                <span v-for="(singer,index) in item.ar" :key="index">{{singer.name}} &nbsp;</span>
              </p>
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
  name: "songList",
  data() {
    return {
      getDataFinish: false,
      songListId: "",
      list: [],
      name:''
    };
  },
  created(){
 this.isLogin();
  },
  mounted() {
     this.name = this.$store.state.topListName;
    const topListIdx = this.$store.state.topListIdx;
    this.$axios
      .get("http://zhangpengfan.xyz:3000/top/list?idx=" + topListIdx)
      .then(res => {
        this.list = this.list.concat(res.data.playlist.tracks);
        this.getDataFinish = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getMusic(e) {
      this.$store.commit("getSongId", e);
      this.$store.commit("goToPreviousPage", "list");
      this.$router.push("play");
    },
    goToHome() {    
    
      this.$router.push('top');
    }
  }
};
</script>

<style >
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.el-card {
  margin: 10px 2%;
  padding: 0;
  height: 150px;
  width: 45%;
}
.el-card__body {
  padding: 0;
}
p {
  margin: 0;
}
span {
  margin: 0;
  font-size: 12px;
  color: #9e9e9e;
}
.el-icon-back:before {
  content: "\E6EA";
  font-size: 30px;
  margin: 0;
  line-height: 40px;
}
</style>