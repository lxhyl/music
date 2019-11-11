<template>
  <div>
 <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="position:absolute;left:20px;"></i>
         电台
      </p>
    </el-header>
  </div>
</template>
<script>
export default {
  name: "weibo",
  data(){
      return {
         hotDj:[]
      }
  },
  created(){
      this.$axios.get('/api/dj/banner')
      .then(res => {
          console.log(res)
      })
      .catch( err => {
          console.log(err)
      })
  },
  methods:{
      goToHome(){
          this.$router.push('home')
      }
  }
};
</script>
<style scoped>
</style>