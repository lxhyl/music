<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="font-size:30px;position:absolute;left:20px;"></i>
        视频
      </p>
    </el-header>
    <div v-if="goToPlayMv">
      <p style="width:100%;text-align:left;margin-left:10px;">推荐</p>
      <el-divider></el-divider>
      <div v-if="getPersonalized">
        <div class="mvContainer">
          <div
            @click="getPersonalizedMv(item.id)"
            v-for="(item,index) in personalizedMv"
            :key="index"
            class="mvItem"
          >
            <span class="spanInfo">{{item.copywriter}}</span>
            <el-image :src="item.picUrl">
              <div slot="placeholder" class="image-slot">加载中</div>
            </el-image>
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <i class="el-icon-loading"></i>
        <p>加载中</p>
      </div>

      <p style="width:100%;text-align:left;margin-left:10px;">最新</p>
      <el-divider></el-divider>
      <div class="mvContainer">
        <div
          @click="getPersonalizedMv(item.id)"
          v-for="(item,index) in newMv"
          :key="index"
          class="mvItem"
        >
          <span class="spanInfo">{{item.name}}</span>
          <el-image :src="item.cover">
            <div slot="placeholder" class="image-slot">加载中</div>
          </el-image>
          <p>{{item.briefDesc}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <i class="el-icon-loading"></i>
      <p>加载中</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "plazaMv",
  data() {
    return {
      getPersonalized: false,
      goToPlayMv: true,
      //推荐MV
      personalizedMv: [],
      //最新mv
      newMv: []
    };
  },
  created() {
    this.isLogin();
    //推荐MV
    this.$axios
      .get("http://zhangpengfan.xyz:3000/personalized/mv")
      .then(res => {
        this.personalizedMv = this.personalizedMv.concat(res.data.result);
        this.getPersonalized = true;
      })
      .catch(err => {
        console.log(err);
      });
    //最新MV
    this.$axios
      .get("http://zhangpengfan.xyz:3000/mv/first?limit=10")
      .then(res => {
        this.newMv = this.newMv.concat(res.data.data);
        this.getPersonalized = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {},
  methods: {
    goToHome() {
      this.$router.push("plaza");
    },

    getPersonalizedMv(e) {
      this.goToPlayMv = false;
      this.$axios
        .get("http://zhangpengfan.xyz:3000/mv/detail?mvid=" + e)
        .then(res => {
          this.$store.commit("getMvId", res.data.data.id);
          this.$store.commit("goToPreviousPage", "mv");
          this.$router.push("/playmv");
          this.goToPlayMv = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.mvContainer {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.mvItem {
  width: 46%;
  margin: 0 2%;
  position: relative;
  margin-bottom: 10px;
}
.el-divider {
  margin: 0 10px;
}
.spanInfo {
  position: absolute;
  text-align: left;
  top: 0;
  left: 0;
  margin-top: 0;
  font-size: 12px;
  z-index: 999;
  color: #fafafa;
}
p {
  font-size: 13px;
}
</style>