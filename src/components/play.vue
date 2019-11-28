<template>
  <div>
    <div v-if="getDataFinish">
      <el-header>
        <p style="width:100%;height:40px;line-height:40px;">
          <i class="el-icon-back" @click="goToSongList" style="position:absolute;left:20px;"></i>
          {{ songInfo[0].name }}
          <img
            v-if="likeThisSongImg"
            src="../assets/liked.png"
            class="likeSong"
          />
          <img v-else @click="likeThisSong" src="../assets/like.png" class="likeSong" />
        </p>
      </el-header>

      <div>
        <img class="songimg" :src="songInfo[0].al.picUrl" />
        <div class="musicWords" ref="lyricList">
          <p
            v-for="(item,index) in lyricObj.lines"
            :id="index"
            :key="index"
            style="margin:25px 2%;width:96%;"
          >{{item.txt}}</p>
        </div>
        <div>
          <span>
            {{songNowTime | toMS}}
            /
            {{musicTotalTime | toMS}}
          </span>
          <p style="width:100%;">
            <i v-if="loading" class="el-icon-loading"></i>
            <el-slider v-else :min="0" :max="musicTotalTime" v-model="percent" @input="changeTime"></el-slider>
          </p>
          <p>
            <span @click="last" class="el-icon-caret-left icon"></span>

            <span @click="stopMusic" v-if="pauseMusic" class="el-icon-video-pause icon"></span>
            <span @click="playPause" v-else class="el-icon-video-play icon"></span>
            <span @click="next" class="el-icon-caret-right icon"></span>
            <span @click="goComment" class="el-icon-chat-line-round icon"></span>
          </p>

          <el-divider>
            <i class="el-icon-mobile-phone"></i>
          </el-divider>

          <div style="color:#9E9E9E">
            建设中。。。
            <p>1:切换歌曲为切换至相似的歌曲</p>
          </div>

          <p v-if="getMusicUrlFinish">
            <audio ref="audio" id="music" controls="controls" autoplay :src="songUrl[0].url" hidden></audio>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <i class="el-icon-loading"></i>
      <p>加载中</p>
    </div>
    <div></div>
  </div>
</template>
<script>
import { constants } from "crypto";

import Lyric from "lyric-parser";
export default {
  inject: ["reload"],
  name: "play",
  data() {
    return {
      id: "",
      //数据是否加载完成
      getDataFinish: false,
      songId: "",
      //歌曲信息
      songInfo: [],
      songUrl: [],
      getMusicUrlFinish: false,
      pauseMusic: true,
      //音乐进度条
      percent: 0,
      //音乐总时长
      musicTotalTime: "",
      //音乐已播放时间
      songNowTime: 0,
      //音乐加载中
      loading: true,
      //定时器
      timer: null,
      //歌词
      lyric: "",
      lyricObj: "",
      playingLyric: "",
      //相似的5首歌
      simiFiveSongs: [],
      likeThisSongImg: false
    };
  },
  created() {
     this.isLogin();
    //歌曲详情
    this.songId = this.$store.state.songId;
    this.$axios
      .get("http://zhangpengfan.xyz:3000/song/detail?ids=" + this.songId)
      .then(res => {
        this.songInfo = this.songInfo.concat(res.data.songs);
        this.getDataFinish = true;
      })
      .catch(err => {
        console.log(err);
      });
    //歌曲资源
    this.$axios
      .get("http://zhangpengfan.xyz:3000/song/url?id=" + this.songId)
      .then(res => {
        this.songUrl = this.songUrl.concat(res.data.data);
        this.getMusicUrlFinish = true;
      })
      .catch(err => {
       
      });
  },
  mounted() {
    //如果网速慢获取不到DOM会报错  延时2s后再执行
    // setTimeout(() => {
    this.getAudio();
    // }, 2000);
    //获取相似歌曲
    this.sameSongs();
    //获取歌词
    this.getLyric();
  },
  methods: {
    goToSongList() {
      this.lyricObj.stop();
      let page = this.$store.state.previousPage;
      this.$router.push(page);
    },
    playPause() {
      this.lyricObj.togglePlay();
      var _this = this;
      const audio = document.getElementById("music");
      audio.play();
      this.pauseMusic = true;
      this.timer = setInterval(() => {
        _this.percent += 1;
        _this.songNowTime += 1;
        if (_this.percent == _this.musicTotalTime) {
          clearInterval(_this.timer);
          _this.timer = null;
        }
      }, 1000);
    },
    //暂停播放
    stopMusic() {
      this.lyricObj.togglePlay();
      var _this = this;
      const audio = document.getElementById("music");
      audio.pause();
      this.pauseMusic = false;

      clearInterval(this.timer);
      this.timer = null;
    },
    //获取音乐资源 开启进度条
    getAudio() {
      var _this = this;
      var aduioIsOk = setInterval(() => {
        const audio = document.getElementById("music");
        //音乐总时长
        const allTime = audio.duration;
        this.musicTotalTime = parseInt(allTime);
        const state = audio.readyState;

        if (state == 4) {
          _this.loading = false;
          clearInterval(aduioIsOk);
          _this.timer = setInterval(() => {
            _this.percent += 1;
            _this.songNowTime += 1;
            if (_this.percent == allTime) {
              clearInterval(_this.timer);
              _this.timer = null;
            }
          }, 1000);
          aduioIsOk = null;
        }
      }, 1000);
    },
    //改变进度条 跳转播放
    changeTime(e) {
      const audio = document.getElementById("music");
      audio.currentTime = e;
      this.songNowTime = e;

      this.lyricObj.seek(e * 1000);
    },
    //评论组件
    goComment() {
      this.lyricObj.stop();
      this.$router.push("comment");
    },
    //相似歌曲
    sameSongs() {
      const id = this.$store.state.songId;
      this.$axios
        .get("http://zhangpengfan.xyz:3000/simi/song?id=" + id)
        .then(res => {
          this.simiFiveSongs = this.simiFiveSongs.concat(res.data.songs);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //上一首
    last() {
      this.lyricObj.stop();
      const id = this.simiFiveSongs[0].id;
      this.$store.commit("getSongId", id);
      this.reload();
      this.$router.push("play");
    },
    //下一首
    next() {
      const id = this.simiFiveSongs[4].id;
      this.lyricObj.stop();
      this.$store.commit("getSongId", id);
      this.reload();
      this.$router.push("play");
    },
    //获取歌词
    getLyric() {
      const id = this.$store.state.songId;
      this.$axios
        .get("http://zhangpengfan.xyz:3000/lyric?id=" + id)
        .then(res => {
          this.lyric = res.data.lrc.lyric;
          this.lyricObj = new Lyric(res.data.lrc.lyric, this.handler);

          if (!this.loading) {
            this.lyricObj.play();
          }
        })
        .catch(err => {
         
        });
    },
    //lyric  歌词跳转
    handler({ lineNum, txt }) {
      if (document.getElementById(lineNum)) {
        
        document.getElementById(lineNum).scrollIntoView();
        document.getElementById(lineNum).style.color = "#409EFF";
        if (lineNum >= 1) {
          document.getElementById(lineNum - 1).style.color = "#9E9E9E";
        }
      }
    },
    //喜欢本首音乐
    likeThisSong() {
      const id = this.$store.state.songId;
      this.$axios
        .get("http://zhangpengfan.xyz:3000/like?id=" + id)
        .then(res => {    
          if (res.data.code == 200) {
            this.likeThisSongImg = true;
            this.$message({
              type: "success",
              message: "已添加至喜欢列表"
            });
          }
        })
        .catch(err => {
         
        });
    }
  }
};
</script>
<style scoped>
.likeSong {
  width: 30px;
  height: 30px;
  line-height: 40px;
  position: absolute;
  right: 10px;
  margin-top: 5px;
}
.el-icon-back:before {
  content: "\E6EA";
}
.el-icon-caret-left:before {
  content: "\E792";
}
.el-icon-video-pause:before {
  content: "\E7C1";
}
.el-icon-caret-right:before {
  content: "\E791";
}

.icon {
  font-size: 30px;
  margin: 0;
  line-height: 40px;
  margin: 0 30px;
}
.songimg {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  animation: run 10s linear 0s infinite;
}
@keyframes run {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.musicWords {
  width: 100%;
  height: 200px;
  overflow: scroll;
  position: relative;
}
.musicWords::-webkit-scrollbar {
  display: none;
}
#music {
  width: 0;
  height: 0;
}
.el-slider {
  margin: 0 40px;
}
</style>