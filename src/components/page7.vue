<template>
  <div class="main-home relative bg-show" id="home">
    <div class="main-home" :class="{ 'picture-screen zindex-200': showPicture=== true }">
      <div class="box-flex relative flex-direction-column zindex-10" >
          <div class="bg-ea3f21-r width-75 margin-top-3r margin-left-25 textclolor-white padding-1m font-size-12" :class="{ 'padding-1m': showPicture=== true }">
              <div :class="{ 'font-size-6': showPicture=== true, 'font-size-8': showPicture=== false }">
                <span v-show="fontType==='jian'">我扶着颤颤巍巍学骑单车的你</span>
                <span v-show="fontType==='fan'">我扶著顫顫巍巍學騎單車的你</span>
              </div>
              <div :class="{ 'font-size-6': showPicture=== true, 'font-size-8': showPicture=== false }">
                <span v-show="fontType==='jian'">慢慢放开手</span>
                <span v-show="fontType==='fan'">慢慢放開手</span>
              </div>
              <div :class="{ 'font-size-6': showPicture=== true, 'font-size-8': showPicture=== false }">
                <span v-show="fontType==='jian'">看你疾驰出去</span>
                <span v-show="fontType==='fan'">看你疾馳出去</span>
              </div>
              <div class="line-heightr-2" :class="{ 'font-size-7': showPicture=== true, 'font-size-10': showPicture=== false }">
                <span v-show="fontType==='jian'">我要守护你成长的每一步</span>
                <span v-show="fontType==='fan'">我要守護你成長的每一步</span>
              </div>
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
        <img class="width-100" src="../Img/page7_bg.jpg" />
      </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r" @click="goNext">
        <img src="../Img/action.png" class="width-20 "/>
    </div>
    <div class="black-bg zindex-100" v-show="btnAnimate" :class="{ 'action-animate': btnAnimate=== true }"></div>
    <img src="../Img/page7_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
      fontType: sessionStorage.getItem('fontType')
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
          this.$router.push({path: '/page8' })
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
