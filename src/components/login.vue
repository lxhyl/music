<template>
  <div>
    <el-main>
      <img class="logo" src="../assets/musicLogo.png" />
      <h4 style="color:#409EFF">登陆</h4>
      <el-form label-width="80px" :model="login">
        <el-form-item label="手机号">
          <el-input v-model="login.phone" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="login.password" show-password placeholder="输入密码"></el-input>
        </el-form-item>

        <el-button @click="ok" type="primary" plain  style="color:#FAFAFA">确定</el-button>
      </el-form>
    </el-main>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      login: {
        phone: "",
        password: ""
      }
    };
  },
  beforeCreate() {
    const id = JSON.parse(localStorage.getItem("id"));
    // if (id != "") {
    //   this.$router.push("home");
    // }
      this.$store.commit("getUserId", id);
  },
  
  methods: {
    ok() {
      // 获取用户id
        // localStorage.clear();
        // console.log(JSON.parse(localStorage.getItem('id')))

      if (!/^1[3456789]\d{9}$/.test(this.login.phone)) {
        this.$message({
          message: "手机号格式错误",
          type: "warning"
        });
      } else if (this.login.password == "") {
        this.$message({
          message: "密码不能为空",
          type: "warning"
        });
      } else {
        this.$axios
          .get(
            "/api/login/cellphone?phone=" +
              this.login.phone +
              "&password=" +
              this.login.password
          )
          .then(res => {
            console.log(res)
            //获取用户ID传入store
            this.$store.commit("getUserId", res.data.account.id);
            const id = res.data.account.id;
            //将用户ID本地存储
            localStorage.setItem("id", JSON.stringify(id));
            //设置cookie


            this.$message({
              message: "登陆成功",
              type: "success"
            });
            this.$router.push("home");
          })
          .catch(err => {
            console.log(err.message);
            var msg = err.message;
            var arr = msg.split(" ");
            console.log(arr);
            if (arr[5] == "509") {
              this.$message({
                message: "密码错误次数超过限制",
                type: "warning"
              });
            }
            if (arr[5] == "502") {
              this.$message({
                message: "密码错误",
                type: "warning"
              });
            }
            if (arr[5] == "501") {
              this.$message({
                message: "账号不存在",
                type: "warning"
              });
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.el-header {
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
}
.logo {
  width: 80%;
  height: 300px;
}
.el-main {
  padding: 0;
  margin: 0 10px;
}
.el-button {
  width: 80%;
}
</style>