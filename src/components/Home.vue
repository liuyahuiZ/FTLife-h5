<template>
  <div class="main-home relative bg-show" id="home">
    <img src="../Img/title.jpg" class="display_none">
    <div class="box-flex flex-direction-column" >
        <div class="width-100 top-1r zindex-9">
          <img src="../Img/page9_bg.jpg"  class="width-100"/>
        </div>
        <div class="padding-all-2rem margin-top-1r" :class="{ 'line-animate': line1Animate }">
           <img src="../Img/home_title.png" class="images-con">
           <img src="../Img/home_title1.png" class="width-60">
        </div>
        <div class="bg-activity-status width-90 textclolor-white padding-1m-2m">
            <div :class="{ 'line-animate': line2Animate, 'opacity-0':!line2Animate }">奉献爱心大行动</div>
            <div :class="{ 'line-animate': line2Animate, 'opacity-0':!line2Animate }">与富通一起</div>
            <div :class="{ 'line-animate': line2Animate, 'opacity-0':!line2Animate }">支持希望工程</div>
        </div>
        <div class="margin-left-2r margin-top-2" :class="{ 'pic-animate': line3Animate, 'opacity-0':!line3Animate }">
            <img src="../Img/logo.png" class="width-60">
        </div>
        <div class="margin-top-5" :class="{ 'pic-animate': line4Animate, 'opacity-0':!line4Animate }">
            <img src="../Img/home_b.png" class="width-60">
        </div>
        <div class="absolute bottom-5 right-5 width-20" @click="goNext" :class="{ 'pic-animate': btnAnimate, 'opacity-0':!btnAnimate }">
            <div class="width-100 textcolor-EF4224 relative top-f5r font-size-9">立即行动</div>
            <img src="../Img/loading_next.png" class="width-100 relative" :class="{ 'btn-animate': btnAnimate=== true }">
        </div>
        <div class="absolute bottom-0 bg-activity-status width-100 heightr-1 overflow-hide" >
            <img src="../Img/loading_bar.png" class="width-100 heightr-1 loading relative" />
        </div>
        <div class="absolute top-0 bg-activity-status width-100 heightr-1 overflow-hide zindex-10" >
            <img src="../Img/loading_bar.png" class="width-100 heightr-1 loading relative" />
        </div>
    </div>
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
      goNextStatus: false,
      line1Animate: false,
      line2Animate: false,
      line3Animate: false,
      line4Animate: false
    }
  },
  components: {
  },
  beforeCreate: function () {
      const that = this;
      setTimeout(()=>{
          that.btnAnimate = true;
          that.goNextStatus = true;
      }, 5000)
  },
  created: function () {
    // console.log('beforeCreate is triggered.')
    const that = this;
    that.line1Animate = true;
    setTimeout(()=>{
          that.line2Animate = true;
    }, 500)
    setTimeout(()=>{
          that.line3Animate = true;
    }, 1000)
    setTimeout(()=>{
          that.line4Animate = true;
    }, 1500)
  },
  methods: {
      goNext: function() {
          this.$router.push({path: '/page1' })
      }
  }
}
</script>
<style>
.loading{
    animation: loading-in 5s ease;
}
.btn-animate{
    animation: anit-in  1.5s infinite;
}
.line-animate{
  position: relative;
  animation: right-in  1.5s;
  animation-fill-mode: forwards;
}
.pic-animate{
  position: relative;
  animation: left-in  1.5s;
  animation-fill-mode: forwards;
}
@keyframes loading-in {
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
}
@keyframes anit-in {
  0% {
    left: 0%;
  }
  50%{
    left: 10%;
  }
  100% {
    left: 0%;
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

</style>
