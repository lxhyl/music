<template>
  <div>
    <el-header>
      <p style="width:100%;height:40px;line-height:40px;">
        <i class="el-icon-back" @click="goToHome" style="font-size:30px;position:absolute;left:20px;"></i>
        关于
      </p>
    </el-header>
    <div>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.version"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
    </div>
    <p style="color:#909399">Power By Lxhyl</p>
  </div>
</template>
<script>
export default {
  name: "weibo",
  data() {
    return {
      activities: [
        {
          content: "正式上线",
          version: "Version 0.1.0",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },
        {
          content: "支持歌词滚动播放",
          version: "Version 0.1.1",
          size: "large",
          type: "primary",
          icon: "el-icon-circle-plus"
        },
        {
          content: "增加新建，删除歌单",
          version: "Version 0.1.2",
          size: "large",
          type: "primary",
          icon: "el-icon-circle-plus"
        },
        {
          content: "优化，更快的加载速度",
          version: "Version 0.2.0",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },{
          content: "判断是否登陆,播放评论",
          version: "Version 0.2.1",
          size: "large",
          type: "primary",
          icon: "el-icon-circle-plus"
        }
      ]
    };
  },
  created() {},
  methods: {
    goToHome() {
      this.$router.push("home");
    }
  }
};
</script>
<style scoped>
li{
    text-align: left;
}
</style>