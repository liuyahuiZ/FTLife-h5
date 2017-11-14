<template>
  <div class="main-home relative bg-show" id="home">
    <div class="width-100 relative zindex-110">
        <img src="../Img/takeText_top.png" class="width-60">
        <img src="../Img/page1_logo.png" class="width-30">
    </div>
    <div class="absolute top-12r width-100 zindex-200 text-align-center padding-1m" @click="playVieo">
      <video controls="controls" class="width-100" src="../Img/shouhu.mp4" id="audioPlay" ref="vieoPlay" />
    </div>
    <div class="absolute top-6r right-0 width-70 zindex-200 text-align-left">
      <div class="bg-ea3f21-r width-100 textclolor-white padding-1m-2m font-size-12">
            <div class="line-heightr-2" >
              <span v-show="fontType==='jian'">守护你</span>
              <span v-show="fontType==='fan'">守護你</span>
            </div>
            <div class="line-heightr-2" >
              <span v-show="fontType==='jian'">让人生不留遗憾</span>
              <span v-show="fontType==='fan'">讓人生不留遺憾</span>
            </div>
        </div>
    </div>
    <div class="absolute width-40 bottom-6r zindex-10" >
        <img class="width-100" src="../Img/page2_my.png" />
      </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r" @click="goNext">
        <img src="../Img/action_movie.png" class="width-20 "/>
    </div>
    <img src="../Img/page8_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
  </div>
</template>

<script>
import Service from '@/util/service'
import configs from '@/util/configs'
import dynamics from 'dynamics.js'
import Vue from 'vue'
// let page = document.getElementById('page')
// console.log(page)

export default {
  data () {
    return {
      btnAnimate: false,
      showVieo: false,
      fontType: sessionStorage.getItem('fontType')
    }
  },
  components: {
  },
  created: function () {
    // console.log('beforeCreate is triggered.')
  },
  methods: {
      goNext: function() {
        console.log(this.showVieo);
        const self = this;
        this.$refs.vieoPlay.pause();
        this.$router.push({path: '/page9' })
      },
      playVieo:function() {
        this.showVieo= true;
        this.$refs.vieoPlay.play();
      },
      closeVieo: function() {
        this.showVieo= false;
        this.$refs.vieoPlay.pause();
      }
  }
}
</script>
<style>
.action-animate{
  animation: action-in  0.5s;
}

@keyframes action-in {
  0% {
    background: rgba(255,255,255, 0);
  }
  50% {
    background: rgba(255,255,255, 1);
  }
  100% {
    background: rgba(0,0,0, 0.7);
  }
}
</style>
