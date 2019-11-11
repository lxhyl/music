<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="position:absolute;left:20px;"></i>
        音乐排行榜
      </p>
    </el-header>
    <el-main>
      <div v-if="loading" class="topContainer">
        <div
          class="topItem"
          @click="goToSongList(item.idx,item.name)"
          v-for="(item,index) in toplist"
          :key="index"
        >
          <el-image :src="item.coverImgUrl">
            <div slot="placeholder" class="image-slot">
                    <i class="el-icon-loading"></i>
            </div>
          </el-image>
          <span class="updateFrequency">{{ item.updateFrequency}}</span>
          <p class="font-size:13px">{{item.name}}</p>
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
  name:'plazaTop',
  data() {
    return {
      loading: false,
      toplist: [],
      idx: [   //详细内容见 https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%8e%92%e8%a1%8c%e6%a6%9c
        "3",  
        "0",
        "2",
        "1",
        "23",
        "24",
        "25",
        "26",
        "27",
        "22",
        "28",
        "15",
        "29",
        "30",
        "5",
        "6",
        "7",
        "8",
        "10",
        "9",
        "20",
        "31",
        "32",
        "19",
        "22",
        "22"
      ]
    };
  },
  mounted() {
    this.$axios
      .get("/api/toplist")
      .then(res => {
        this.toplist = this.toplist.concat(res.data.list);
        this.loading = true;

        for (let i = 0; i < this.toplist.length; i++) {
          //将榜单idx加入榜单数组对象中
          this.toplist[i]["idx"] = this.idx[i];
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goToHome() {
      this.$router.push("plaza");
    },
    goToSongList(e, name) {
      this.$store.commit("getTopListIdx", e);
      this.$store.commit("getTopListName", name);
      this.$router.push("list");
    }
  }
};
</script>
<style scoped>
.topContainer {
  width: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
}
.topItem {
  width: 45%;
  margin: 20px 2%;
  position: relative;
}
.updateFrequency {
  position: absolute;
  left: 5px;
  top: 5px;
  margin-top:10px;
  color: #fafafa;
}
</style>