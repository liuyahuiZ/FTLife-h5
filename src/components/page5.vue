<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="box-flex margin-left-2r margin-top-5r width-50" :class="{ 'p1-pic-animate': line1Animate, 'opacity-0':!line1Animate }">
          <div class="text-align-left">
            <img src="../Img/page1_logo.png" class="width-60">
          </div>
        </div>
        <div class="bg-ea3f21-r width-70 margin-left-2r textclolor-white padding-1m-2m" :class="{ 'p1-pic-animate': line2Animate, 'opacity-0':!line2Animate }">
            <div class=" line-heightr-2">
              <span v-show="fontType==='jian'">那些「盛世」的瞬间</span>
              <span v-show="fontType==='fan'">那些「盛世」的瞬間</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">构成了人生最自豪的篇章</span>
              <span v-show="fontType==='fan'">構成了人生最自豪的篇章</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">而成就「盛世」时刻</span>
              <span v-show="fontType==='fan'">而成就【盛世】 時刻</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">往往来自</span>
              <span v-show="fontType==='fan'">往往來自</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">身边爱你的人的</span>
              <span v-show="fontType==='fan'">身邊愛你的人的</span>
            </div>
            <div><img src="../Img/page5_b.png" class="width-30 margin-top-f5r "/></div>
        </div>
        <div class="margin-top-5-d text-align-right" :class="{ 'p1-line-animate': line3Animate, 'opacity-0':!line3Animate }">
            <img src="../Img/page1_b.png" class="width-80">
        </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r">
        <img src="../Img/action.png" class="width-20 relative" @click="goNext" :class="{ 'takepic-animate': line4Animate, 'takepic-deful':!line4Animate }"/>
    </div>
    <img src="../Img/page5_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
        this.$router.push({path: '/page7' })
      }
  }
}
</script>
<style>
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
