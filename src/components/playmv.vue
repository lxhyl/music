<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="font-size:30px;position:absolute;left:20px;"></i>
        视频
      </p>
    </el-header>
   
        <video :src="url" controls></video>
        
  </div>
</template>
<script>
export default {
  data() {
    return {
        url:''
    };
  },
  created(){
     this.isLogin();
      //获取MV地址
    this.getData();
  },
  methods: {
    goToHome() {
      const page = this.$store.state.previousPage
      this.$router.push(page);
    },
    getData(){
        const id = this.$store.state.mvId
        this.$axios.get('http://zhangpengfan.xyz:3000//mv/url?id='+id)
        .then(res => {
           
            this.url = res.data.data.url;
            
        })
        .catch(err => {
            console.log(err)
        })
    }
  }
};
</script>
<style scoped>
video{
 width: 100%;
}
</style>