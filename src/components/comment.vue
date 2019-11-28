<template>
  <div>
    <el-header>
      <p style="margin:10px;font-size:14px;line-height:40px;">
        <i class="el-icon-back" @click="goToPlay" style="position:absolute;left:20px;"></i>
        评论
      </p>
    </el-header>
    
    <div class="commentContainer">
        <p style="font-size:13px;color:#409EFF">热门评论</p>
      <div v-for="(item,index) in hotComments" :key="index" class="comment">
        
        <el-avatar style="left:0;" :src="item.user.avatarUrl"></el-avatar>
        <p style="font-size:12px;color:#9E9E9E;">{{item.user.nickname}}</p>
        <p style="font-size:12px;margin:2px 5px;">{{item.content}}</p>
        <p style="font-size:10px;">评论时间:{{item.time | toTime }}</p>
      <span>点赞数{{item.likedCount}}</span>
      </div>
    </div>
    <div class="commentContainerRight">
          <p style="font-size:13px;color:#409EFF">最新评论</p>
      <div v-for="(item,index) in comments" :key="index" class="comment">
        
        <el-avatar style="left:0;" :src="item.user.avatarUrl"></el-avatar>
        <p style="font-size:12px;color:#9E9E9E;">{{item.user.nickname}}</p>
        <p style="font-size:12px;margin:2px 5px;">{{item.content}}</p>
          <p style="font-size:10px;">评论时间:{{item.time | toTime }}</p>
     <span>点赞数{{item.likedCount}}</span>
      </div>
     
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      //热门评论
      hotComments: [],
      //评论
      comments: []
    };
  },
  created() {
     this.isLogin();
    const id = this.$store.state.songId;
    this.$axios
      .get("http://zhangpengfan.xyz:3000/comment/music?id=" + id)
      .then(res => {
        this.hotComments = this.hotComments.concat(res.data.hotComments);
        this.comments = this.comments.concat(res.data.comments);
        console.log(this.hotComments);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goToPlay() {
      this.$router.push("play");
    }
  }
};
</script>
<style scoped>
.commentContainer {
  position: absolute;
  width: 48%;
  margin: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.commentContainerRight {
  position: absolute;
  right: 0;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
}
.comment {
  position: relative;
  width: 95%;
  margin: 10px 1%;
  box-shadow: 2px 5px 2px 5px #e0e0e0;
  text-indent: 20px;
}
</style>