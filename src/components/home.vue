<template>
  <div>
    <div class="userDetail" v-if="getDateFinish">
      <el-header style="height:200px;">
        <el-drawer :visible.sync="dialog" direction="ltr" size="75%">
          <div slot="title">
            <p style="height:50px; ">
              <img class="userAvatar" :src="userDetail.profile.avatarUrl" />

              <span class="userName">
                {{userDetail.profile.nickname}}
                <i
                  v-if="userDetail.profile.gender == 1"
                  class="el-icon-male"
                ></i>
                <i v-if="userDetail.profile.gender == 2" class="el-icon-female"></i>
                <br />
                <span>
                  关注{{userDetail.profile.follows}}
                  粉丝{{userDetail.profile.followeds}}
                </span>
              </span>
            </p>
          </div>

          <el-divider>
            <i class="el-icon-mobile-phone"></i>
          </el-divider>

          <div style="height:40vh">
            <p @click="goToPlaza">
              <i class="el-icon-s-help"></i>广场
            </p>
            <p @click="goToDj">
              <i class="el-icon-s-help"></i>电台
            </p>
          </div>
          <div>
            <p @click="goToAbout">
              <i class="el-icon-info"></i>关于
            </p>
          </div>
        </el-drawer>
        <img @click="dialog = true" src="../assets/Music.png" class="logo" />

        <i @click="goToSearch" class="el-icon-search search"></i>
        <el-avatar size="large" :src="userDetail.profile.avatarUrl"></el-avatar>
        <div class="userDetailInfo">
          <p>{{userDetail.profile.nickname}}</p>
          <p>{{userDetail.profile.signature}}</p>
          <p style="color:#BDBDBD;">
            等级:{{userDetail.level}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            累计听歌{{userDetail.listenSongs}}首
          </p>
        </div>
      </el-header>
      <el-main>
        <div class="container">
          <p class="mySongList">
            我的歌单
            <span>({{playList.length +1}})</span>

            <i @click="dialogFormVisible = true" class="el-icon-plus"></i>

            <i v-if="deleteSongListOK" @click="deleteSongListMethods" class="el-icon-delete"></i>
            <el-button
              @click="finishDelete"
              v-else
              size="mini"
              style="position:absolute;right:5%;"
            >完成</el-button>

            <el-dialog title="新建歌单" :visible.sync="dialogFormVisible">
              <el-input v-model="songListName" placeholder="输入歌单名"></el-input>

              <div slot="footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button @click="addNewSongList" size="mini">确 定</el-button>
              </div>
            </el-dialog>
          </p>

          <el-card v-for="(item,index) in playList" :key="index">
            <div @click="goSongList(item.id,item.name)">
              <i
                @click.stop="deleteSongList(item.id,index)"
                v-if="deleteSongListBoole"
                class="el-icon-delete-solid"
              ></i>
              <span style="position:absolute;top:10px;left:10px;">{{index+1}}</span>
              <el-image
                style="width: 100px; height: 100px;margin-top:10px;"
                :src="item.coverImgUrl"
                fit="fit"
              ></el-image>
              <div>
                <p style="font-size:12px;margin:0;">{{item.name}}</p>
                <span
                  style="font-size:12px;color:#BDBDBD;position:absolute;right:5px;bottom:5px;"
                >累计播放{{item.playCount}}次</span>
              </div>
            </div>
          </el-card>
        </div>
      </el-main>
    </div>
    <div v-else style="top:200px;">
      <i class="el-icon-loading"></i>
      <p>加载中</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",

  data() {
    return {
      id: this.$store.state.userId,
      getDateFinish: false,
      //用户信息
      userDetail: {},
      //用户歌单
      playList: [],
      //控制dialog
      dialog: false,
      dialogFormVisible: false,
      //新建歌单 歌单名
      songListName: "",
      //控制删除歌单按钮
      deleteSongListBoole: false,
      //是否完成删除
      deleteSongListOK: true
    };
  },
  created() {
  
    // var i = 0;
    // var j = 0;
    //  for(let a=0;a<1000;a++){
    //  this.$axios.get('http://zhangpengfan.xyz:3000/scrobble?id=1397345903&sourceid=980150611&time=180')
    //  .then(res => {
    //    i++
    //    console.log('成功'+i+'次');
    //  })
    //  .catch( err => {
    //    j++
    //    console.log('失败'+j+'次')
    //  })
    //  }
  },
  mounted() {

    this.isLogin;
    //拿到用户ID
    const id = JSON.parse(localStorage.getItem("id"));
    //获取用户信息
    this.$axios
      .get("http://zhangpengfan.xyz:3000/user/detail?uid=" + id)
      .then(res => {
        this.userDetail = res.data;
        this.getDateFinish = true;
      })
      .catch(err => {
        console.log(err);
      });
    //获取用户歌单信息
    this.$axios
      .get("http://zhangpengfan.xyz:3000/user/playlist?uid=" + id)
      .then(res => {
        this.playList = this.playList.concat(res.data.playlist);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //歌曲列表
    goSongList(e, name) {
      this.$store.commit("getSongListId", e);
      this.$store.commit("goToPreviousPage", "home");
      this.$store.commit("getTopListName", name);
      this.$router.push("songList");
    },
    //广场
    goToPlaza() {
      this.dialog = false;
      this.$store.commit("goToPreviousPage", "home");
      this.$router.push("plaza");
    },
    //电台
    goToDj() {
      this.dialog = false;
      this.$store.commit("goToPreviousPage", "home");
      this.$router.push("fm");
    },
    //关于
    goToAbout() {
      this.dialog = false;
      this.$store.commit("goToPreviousPage", "home");
      this.$router.push("about");
    },
    //搜索
    goToSearch() {
      this.$router.push("search");
    },
    //新建歌单
    addNewSongList() {
      var _this = this;
      if (this.addNewSongList == "") {
        this.$message({
          message: "不能为空",
           showClose: true,
          type: "warning"
        });
      } else {
        this.$axios
          .get(
            "http://zhangpengfan.xyz:3000/playlist/create?name=" +
              this.songListName
          )
          .then(res => {
            _this.songListName = "";
            this.dialogFormVisible = false;
            this.$message({
              message: "已新建歌单" + _this.songListName,
              type: "success",
              showClose: true,
            });
          })
          .catch(err => {});
      }
    },
    deleteSongListMethods() {
      this.deleteSongListBoole = true;
      this.deleteSongListOK = false;
    },
    //删除歌单
    deleteSongList(id, index) {
      this.$confirm("此操作将永久删除歌单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        customClass: "elMessageBox"
      })
        .then(() => {
          this.$axios
            .get("http://zhangpengfan.xyz:3000/playlist/delete?id=" + id)
            .then(res => {
              this.playList.splice(index, 1);
              this.$message({
                type: "success",
                 showClose: true,
                message: "删除成功!"
              });
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
             showClose: true,
            message: "已取消删除"
          });
        });
    },
    finishDelete() {
      this.deleteSongListOK = true;
      this.deleteSongListBoole = false;
    }
  }
};
</script>
<style scoped>
.elMessageBox {
  width: auto;
}
.el-icon-delete-solid {
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  z-index: 999;
}
.el-icon-plus {
  position: absolute;
  left: 5%;
  font-size: 16px;
  line-height: 25px;
}
.el-icon-delete {
  position: absolute;
  right: 5%;
  font-size: 16px;
  line-height: 25px;
}
.mySongList {
  width: 100%;
  position: relative;
  height: 25px;
  line-height: 25px;
}
.el-icon-male {
  color: #409eff;
}
.el-icon-female {
  color: #f06292;
}
.logo {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 10px;
  right: 0;
  margin: 20px;
}
.userAvatar {
  height: 50px;
  width: 50px;
  border-radius: 100%;
}
.userName {
  height: 25px;
  line-height: 25px;
  left: 80px;
  position: absolute;
}
.el-main {
  padding: 0;
  margin: 0 10px;
}
.userDetail {
  height: 80px;
  width: 100%;
}
.el-avatar {
  position: relative;
  left: 10px;
  top: 20px;
}
.userDetailInfo {
  position: relative;
  width: 100%;
  left: 0;
  font-size: 14px;
  margin-top: 20px;
}
.userDetailInfo p {
  height: 20px;
  margin: 0;
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}
.el-card {
  width: 90%;
  height: 180px;
  margin: 10px 0;
  position: relative;
}
.search {
  position: absolute;
  top: 0;
  right: 10px;
  margin: 20px;
}
.el-icon-search:before {
  font-size: 20px;
}
.el-drawer__body p {
  width: 95%;
  font-size: 15px;
  margin-left: 5%;
  height: 25px;
  line-height: 25px;
  margin-top: 10px;
}
.el-drawer__body i {
  margin: 0 10px;
}

</style>
