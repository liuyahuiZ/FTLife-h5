<template>
    <div >
       <div class="display_none">
        <audio src="../Img/bgm.mp3" loop="loop" id="audioPlay" ref="bgm" preload="auto" controls />
      </div>
      <div class="absolute right-1r top-2r zindex-900">
        <img src="../Img/music.png" class="widthr-2" v-show="playstatus" @click="pruesmusic"/>
        <img src="../Img/music-off.png" class="widthr-2" v-show="!playstatus" @click="playmusic"/>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      author: 'Jinkey',
      playstatus: false
    }
  },
  created: function () {
    const self = this;
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
      WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
            // 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
            // alert(res.err_msg);
            self.playmusic()
      });
    }
  },
  methods: {
    playmusic: function() {
        const myVid = this.$refs.bgm;
        myVid.play();
        this.playstatus = true;
    },
    pruesmusic: function() {
      const myVid = this.$refs.bgm;
      myVid.pause();
      this.playstatus = false;
    }
  },
  components: {
  }
}
</script>