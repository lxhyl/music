<template>
  <div>
    <p class>{{content}}</p>
  </div>
</template>
<script>
export default {
  name: "danmu",
  data() {
    return {
      hotComments: [],
      content: "",
      timer: null
    };
  },
  created() {
    var _this = this;
    this.isLogin();
    const id = this.$store.state.songId;
    this.$axios
      .get("http://zhangpengfan.xyz:3000/comment/music?id=" + id)
      .then(res => {
        this.hotComments = this.hotComments.concat(res.data.hotComments);
        var allContent = [];
        for (let i = 0; i < this.hotComments.length; i++) {
          allContent.push(this.hotComments[i].content);
        }
        this.hotComments = allContent;

        var nowStr = "";
        var i = 0;
        var j = 0;
        var strNum = 0;
        this.timer = setInterval(() => {
          nowStr = _this.hotComments[j];
          strNum = nowStr.length - 1;
          if (i <= strNum) {
            _this.content = _this.content.concat(nowStr.charAt(i));
            i++;
          } else {
            _this.sleep(3000)   
            i = 0;
            j++;
            //播放完 循环播放
            if(j == _this.hotComments.length){
              j = 0;
            }
            nowStr = _this.hotComments[j];
            _this.content = "";
             
          }
        }, 200);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {},
  methods: {
    sleep(d) {
      for (var t = Date.now(); Date.now() - t <= d; );
    }
  },
  beforeDestroy(){
    this.timer=null;
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
</style>