<template>
  <div class="main-home relative bg-show" id="home">
    <div class="main-home" :class="{ 'picture-screen zindex-200': showPicture=== true }">
      <div class="box-flex relative flex-direction-column zindex-10" :class="{ 'p1-line-animate': line1Animate, 'opacity-0':!line1Animate }" >
          <div class="bg-ea3f21-r width-70 margin-top-3r margin-left-30 textclolor-white padding-1m-2m font-size-12" :class="{ 'padding-1m': showPicture=== true }">
              <div class="line-heightr-2" :class="{ 'font-size-9': showPicture=== true , 'p1-line-animate': line2Animate, 'opacity-0':!line2Animate  }">我的盛世</div>
              <div :class="{ 'font-size-7': showPicture=== true, 'font-size-8': showPicture=== false, 'p1-line-animate': line3Animate, 'opacity-0':!line3Animate  }">是握着你稚嫩的手</div>
              <div :class="{ 'font-size-7': showPicture=== true, 'font-size-8': showPicture=== false , 'p1-line-animate': line4Animate, 'opacity-0':!line4Animate }">
                <span v-show="fontType==='jian'">将祖辈的智慧传承下去</span>
                <span v-show="fontType==='fan'">將祖輩的智慧傳承下去</span>
              </div>
          </div>
      </div>
      <div class="absolute width-20 my-pic-bottom zindex-10" v-if="showPicture">
        <img class="width-100" src="../Img/pic_top.png" />
      </div>
      <div class="absolute width-20 my-pic-top zindex-10" v-if="showPicture">
        <img class="width-100" src="../Img/pic_top.png" />
      </div>
      <div class="absolute width-40 my-logo zindex-10" v-if="showPicture" :class="{'right-logo': line6Animate, 'opacity-0':!line6Animate}">
        <img class="width-100" src="../Img/page1_logo.png" />
      </div>
      <div class="absolute width-50 my-shs zindex-10" v-if="showPicture" :class="{'left-logo': line5Animate, 'opacity-0':!line5Animate}" >
        <img class="width-100" src="../Img/page2_my.png" />
      </div>
      <div class="absolute width-100 heightp-100 top-0 zindex-9 overflow-hide " v-if="showPicture" >
        <img class="width-100" src="../Img/page2_bg.jpg" />
      </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r" @click="goNext" >
        <img src="../Img/action.png" class="width-20 " :class="{ 'takepic-animate': line4Animate, 'takepic-deful':!line4Animate }"/>
    </div>
    
    <div class="black-bg zindex-100" v-show="btnAnimate" :class="{ 'action-animate': btnAnimate=== true }"></div>
    <img src="../Img/page2_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
      fontType: localStorage.getItem('fontType')!==null?localStorage.getItem('fontType') : 'jian',
      line1Animate: false,
      line2Animate: false,
      line3Animate: false,
      line4Animate: false,
      line5Animate: false,
      line6Animate: false,
    }
  },
  components: {
    music
  },
  created: function () {
    // console.log('beforeCreate is triggered.')
    const that = this;
    that.line1Animate = true;
    setTimeout(()=>{
          that.line2Animate = true;
    }, 200)
    setTimeout(()=>{
          that.line3Animate = true;
    }, 1000)
    setTimeout(()=>{
          that.line4Animate = true;
    }, 1500)
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
          setTimeout(()=>{
            self.line5Animate= true;
          },1000);
          setTimeout(()=>{
            self.line6Animate= true;
          },1000);
        } else{
          this.$router.push({path: '/page3' })
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
.takepic-animate{
    animation: anit-in  1.5s infinite;
}
.takepic-deful{
   animation: anit-out  1.5s infinite;
}
 .p1-line-animate{
  position: relative;
  animation: right-in  1.5s;
  animation-fill-mode: forwards;
}
.p1-pic-animate{
  position: relative;
  animation: left-in  1.5s;
  animation-fill-mode: forwards;
}
.left-logo{
  position: relative;
  animation: top-in  1.5s;
  animation-fill-mode: forwards;
}
.right-logo{
  animation: right-in  1.5s;
  animation-fill-mode: forwards;
}
@keyframes anit-in {
  0% {
    transform: scale(1,1);
  }
  50%{
    transform: scale(1.2,1.2);
  }
  100% {
    transform: scale(1,1);
  }
}
@keyframes anit-out {
  0% {
    transform: scale(0.1,0.1);
  }
  50%{
    transform: scale(0.4,0.4);
  }
  100% {
    transform: scale(1,1);
  }
}
 @keyframes right-in {
  0% {
    transform: translateX(30vw);
    opacity: 0;
  }
  50%{
    transform: translateX(-10vw);
    opacity: 1;
  }
  100% {
    transform: translateX(0vw);
    opacity: 1;
  }
}

@keyframes left-in {
  0% {
    transform: translateX(-30vw);
    opacity: 0;
  }
  50%{
    transform: translateX(10vw);
    opacity: 1;
  }
  100% {
    transform: translateX(0vw);
    opacity: 1;
  }
}
@keyframes top-in {
  0% {
    transform: translateY(-30vw);
    opacity: 0;
  }
  50%{
    transform: translateY(10vw);
    opacity: 1;
  }
  100% {
    transform: translateY(0vw);
    opacity: 1;
  }
}
</style>
