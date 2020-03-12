<template>
  <div id="app">
    <!-- 保存组件状态 组件 -->
    <keep-alive include="home,plaza,plazaMv,plazaTop,plazaRecommend">
    <router-view v-if="isRouterAlive" ></router-view>
    </keep-alive>
   
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      openPlayBar: "",
      isRouterAlive: true
    };
  },
  mounted() {
    this.openPlayBar = this.$store.state.openPlayBar;
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.playBar {
  position: fixed;
  width: 100%;
  height: 60px;
  background: #2c3e50;
  bottom: 0;
}
</style>
