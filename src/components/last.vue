<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
      <div class="width-100 relative">
        <img src="../Img/takeText_top.png" class="width-60">
        <img src="../Img/page1_logo.png" class="width-30">
      </div>
      <div class="bg-ea3f21-r9 relative width-70 margin-left-15 textclolor-white font-size-8 padding-1m margin-top-3r padding-bottom-3r" :class="{ 'bg-scale': line1Animate, 'opacity-0':!line1Animate }">
          <div class="text-align-center" :class="{ 'word-scale': line2Animate, 'opacity-0':!line2Animate }"><img src="../Img/last_title.png" class="width-60 margin-top-3r"></div>
          <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-80 margin-left-10 margin-top-3r" @click="goTakeText" :class="{ 'bottom-line': line3Animate, 'opacity-0':!line3Animate }">
            了解真正的「盛世」
          </div>
          <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-80 margin-left-10 margin-top-2" @click="goNext" :class="{ 'bottom-line': line4Animate, 'opacity-0':!line4Animate }">
            <span v-show="fontType==='jian'">了解真正的「守护」</span>
            <span v-show="fontType==='fan'">了解真正的「守護」</span>
          </div>
      </div>
    </div>
    <img src="../Img/last_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
      fontType: sessionStorage.getItem('fontType'),
      line1Animate: false,
      line2Animate: false,
      line3Animate: false,
      line4Animate: false,
    }
  },
  components: {
  },
  created: function () {
    sessionStorage.setItem('type','盛世')
    const self =  this;
    self.line1Animate = true;
    setTimeout(()=>{
          self.line2Animate = true;
    }, 500)
    setTimeout(()=>{
          self.line3Animate = true;
    }, 1000)
    setTimeout(()=>{
          self.line4Animate = true;
    }, 1200)
  },
  methods: {
      goNext: function() {
        // this.$router.push({path: '/takePicture' })
        window.location="https://www.ftlife.com.hk/healthmanager/index.html";
      },
      goTakeText: function() {
        // this.$router.push({path: '/takeText' })
        window.location="https://www.ftlife.com.hk/tc/products/life-insurance/savings/regent-series.html";
      }
  }
}
</script>
<style>
.bg-scale{
  position: relative;
  animation: bg-in  1.5s;
  animation-fill-mode: forwards;
}
.word-scale{
  position: relative;
  animation: anit-in  1.5s;
  animation-fill-mode: forwards;
}
.bottom-line{
  position: relative;
  animation: bottom-in  1.5s;
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

@keyframes bg-in {
  0% {
    transform: scale(0.5,0.5);
  }
  50%{
    transform: scale(1.2,1.2);
  }
  100% {
    transform: scale(1,1);
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
@keyframes bottom-in {
  0% {
    transform: translateY(30vw);
    opacity: 0;
  }
  100% {
    transform: translateY(0vw);
    opacity: 1;
  }
}
</style>
