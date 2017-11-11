<template>
  <div class="main-home relative bg-show" id="home">
    <div class="main-home" :class="{ 'picture-screen zindex-200': showPicture=== true }">
      <div class="box-flex relative flex-direction-column zindex-10" >
          <div class="bg-ea3f21-r width-70 margin-top-3r margin-left-30 textclolor-white padding-1m-2m font-size-12" :class="{ 'padding-1m': showPicture=== true }">
              <div :class="{ 'font-size-6': showPicture=== true, 'font-size-8': showPicture=== false }">我抱着软软糯糯的你</div>
              <div :class="{ 'font-size-6': showPicture=== true, 'font-size-8': showPicture=== false }">就算是在沙发上</div>
              <div :class="{ 'font-size-6': showPicture=== true, 'font-size-8': showPicture=== false }">也能熟睡</div>
              <div class="line-heightr-2" :class="{ 'font-size-7': showPicture=== true, 'font-size-10': showPicture=== false }">我要守护你的每一个梦</div>
          </div>
      </div>
      <div class="absolute width-20 my-pic-bottom zindex-10" v-if="showPicture">
        <img class="width-100" src="../Img/pic_top.png" />
      </div>
      <div class="absolute width-20 my-pic-top zindex-10" v-if="showPicture">
        <img class="width-100" src="../Img/pic_top.png" />
      </div>
      <div class="absolute width-40 my-logo zindex-10" v-if="showPicture">
        <img class="width-100" src="../Img/page1_logo.png" />
      </div>
      <div class="absolute width-50 my-shs zindex-10" v-if="showPicture">
        <img class="width-100" src="../Img/page2_my.png" />
      </div>
      <div class="absolute width-100 heightp-100 top-0 zindex-9 overflow-hide " v-if="showPicture">
        <img class="width-100" src="../Img/page6_bg.jpg" />
      </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r" @click="goNext">
        <img src="../Img/action.png" class="width-20 "/>
    </div>
    <div class="black-bg zindex-100" v-show="btnAnimate" :class="{ 'action-animate': btnAnimate=== true }"></div>
    <img src="../Img/page6_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
    <music ref="audio" />
  </div>
</template>

<script>
import Service from '@/util/service'
import configs from '@/util/configs'
import dynamics from 'dynamics.js'
import music from '@/components/music'
import Vue from 'vue'
// let page = document.getElementById('page')
// console.log(page)

export default {
  data () {
    return {
      btnAnimate: false,
      showPicture: false,
    }
  },
  components: {
    music
  },
  created: function () {
    // console.log('beforeCreate is triggered.')
  },
  methods: {
      goNext: function() {
        console.log(this.btnAnimate);
        const self = this;
        if(!this.btnAnimate) {
          const myVid = this.$refs.audio;
          myVid.play();
          this.btnAnimate= true;
          setTimeout(()=>{
            self.showPicture= true;
          },500);
        } else{
          this.$router.push({path: '/page7' })
        }
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
