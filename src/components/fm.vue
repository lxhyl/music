<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="font-size:30px;position:absolute;left:20px;"></i>
        电台
      </p>
    </el-header>
    <div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "weibo",
  data() {
    return {
      hotDj: []
    };
  },
  created() {
     this.isLogin();
    this.$axios
      .get("http://zhangpengfan.xyz:3000/dj/hot")
      .then(res => {
        this.hotDj = [...res.data.djRadios];
       
      })
      .catch(err => {
       
      });
  },
  methods: {
    goToHome() {
      this.$router.push("home");
    }
  }
};
</script>
<style scoped>
</style>