<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="position:absolute;left:20px;"></i>
        搜索
      </p>
    </el-header>
    <el-main>
      <p>
        <el-input v-model="search.keywords" type="text" size="small">
          <el-select v-model="search.select" slot="prepend" placeholder="请选择">
            <el-option label="单曲" value="1"></el-option>
            <el-option label="歌手" value="100"></el-option>
            <el-option label="视频" value="1014"></el-option>
          </el-select>
          <el-button @click="searchMusic" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </p>
      <div v-if="getDateFinish">
        <div v-if="test" style="margin-top:10px">
          <router-view ></router-view>
        </div>
      </div>
      <div v-else>
        <el-divider>热搜榜</el-divider>
        <p class="hotList" v-for="(item,index) in hot" :key="index">
          {{item.searchWord}}
          <img v-if="item.iconUrl" :src="item.iconUrl" />
          &nbsp;&nbsp;&nbsp;
          <span>{{item.content}}</span>
        </p>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  name:'search',
  data() {
    return {
      search: {
        keywords: "",
        select: ""
      },
      hot: [],
      getDateFinish: false,
      test: true,

    };
  },
  watch: {
  },
  computed: {},
  
  created() {
    this.isLogin();
  },
  mounted() {
    this.$axios
      .get("http://zhangpengfan.xyz:3000/search/hot/detail")
      .then(res => {
        this.hot = this.hot.concat(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goToHome() {
      this.$router.push("/home");
    },

    searchMusic() {
      //只有input有内容
     
      
      if (this.search.select == "") {
        if (this.search.keywords != "") {
          this.getDateFinish = true;
          this.$store.commit("search", this.search);
          this.test = false;
          this.$nextTick(() => {
            this.test = true;
          });
          this.$router.push("/search/song");
        } else {
          this.$message({
            message: "搜索内容不能为空",
            type: "warning"
          });
        }
      } else {
        if (this.search.keywords != "") {
          if (this.search.select == "1") {
            this.getDateFinish = true;
            this.$store.commit("search", this.search);
            this.test = false;
            this.$nextTick(() => {
              this.test = true;
            });
            this.$router.push("/search/song");
          }
          if (this.search.select == "100") {
            this.getDateFinish = true;
            this.$store.commit("search", this.search);
            this.test = false;
            this.$nextTick(() => {
              this.test = true;
            });
            this.$router.push("/search/singer");
          }
          if (this.search.select == "1014") {
            this.getDateFinish = true;
            this.$store.commit("search", this.search);
            this.test = false;
            this.$nextTick(() => {
              this.test = true;
            });
            this.$router.push("/search/searchmv");
          }
        } else {
          this.$message({
            message: "搜索内容不能为空",
            type: "warning"
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.el-main {
  padding-top: 0;
}
.el-input {
  top: 0;
  margin: 0;
}
.el-select {
  width: 100px;
}
.hotList {
  width: 100%;
  font-size: 14px;
  text-align: left;
  margin: 10px;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hotList img {
  margin: 0;
  height: 10px;
}
</style>