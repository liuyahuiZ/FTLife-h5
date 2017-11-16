<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="bg-ea3f21-r9 relative width-80 margin-left-10 textclolor-white font-size-9 padding-1m margin-top-3r">
            <div class="margin-top-3r" :class="{ 'bottom-line': line1Animate, 'opacity-0':!line1Animate }">
              <span v-show="fontType==='jian'">上传你的「盛世」和「守护」时刻照片</span>
              <span v-show="fontType==='fan'">上傳你的「盛世」和「守護」時刻照片</span>
            </div>
            <div :class="{ 'bottom-line': line2Animate, 'opacity-0':!line2Animate }">生成照片模版</div>
            <div :class="{ 'bottom-line': line3Animate, 'opacity-0':!line3Animate }">
              <span v-show="fontType==='jian'">让大家为你的时刻给心</span>
              <span v-show="fontType==='fan'">讓大家為你的时刻給心</span>
            </div>
            <div :class="{ 'bottom-line': line4Animate, 'opacity-0':!line4Animate }">
              <span v-show="fontType==='jian'">同时你也可以为别人的时刻给心</span>
              <span v-show="fontType==='fan'">同時你也可以為別人的時刻給心</span>
            </div>
            <div class="absolute top-0 left-0 text-align-left ">
                <img src="../Img/logo.png" class="width-70">
            </div>
        </div>
        <div class="bg-2A2B2C-r relative width-80 margin-left-10 textclolor-white font-size-9  padding-1m">
            <div :class="{ 'bottom-line': line5Animate, 'opacity-0':!line5Animate }">只要收集到
              <span class="textcolor-EF3F24 font-size-12">1,680个</span>
              <img src="../Img/heart.png" class="width-10" />
            </div>
            <div :class="{ 'bottom-line': line6Animate, 'opacity-0':!line6Animate }">
              <span v-show="fontType==='jian'">富通保险会向</span>
              <span v-show="fontType==='fan'">富通保險會向</span>
            </div>
            <div class="textcolor-EF3F24 font-size-12" :class="{ 'bottom-line': line7Animate, 'opacity-0':!line7Animate }">
              <span v-show="fontType==='jian'">希望工程圆梦行动</span>
              <span v-show="fontType==='fan'">希望工程圓夢行動</span>
            </div>
            <div :class="{ 'bottom-line': line8Animate, 'opacity-0':!line8Animate }">
              <span v-show="fontType==='jian'">为三名农村家庭经济困难、品学兼优的大学生提供四年的学习生活费用</span>
              <span v-show="fontType==='fan'">為三名農村家庭經濟困難、品學兼優的大學生提供四年的學習生活費用</span>
            </div>
            <div :class="{ 'bottom-line': line9Animate, 'opacity-0':!line9Animate }" >
              <span v-show="fontType==='jian'">「守护」他们实现</span>
              <span v-show="fontType==='fan'">「守護」他們實現</span>
            </div>
            <div :class="{ 'bottom-line': line10Animate, 'opacity-0':!line10Animate }">
              <span v-show="fontType==='jian'">他们人生的「盛世」时刻</span>
              <span v-show="fontType==='fan'">他們人生的「盛世」時刻</span>
            </div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-80 margin-left-10 margin-top-2" @click="goTakeText" :class="{ 'bottom-line': line11Animate, 'opacity-0':!line11Animate }">
              <span v-show="fontType==='jian'">立马上传</span>
              <span v-show="fontType==='fan'">立馬上傳</span>
            </div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-80 margin-left-10 margin-top-2" @click="goWorkList" :class="{ 'bottom-line': line12Animate, 'opacity-0':!line12Animate }">
              <span v-show="fontType==='jian'">先去看看给心</span>
              <span v-show="fontType==='fan'">先看看去給心</span>
            </div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-80 margin-left-10 margin-top-2" @click="goLast" :class="{ 'bottom-line': line13Animate, 'opacity-0':!line13Animate }">
              <span v-show="fontType==='jian'">了解真正的「盛世」和「守护」</span>
              <span v-show="fontType==='fan'">了解真正「盛世」及「守護」</span>
            </div>
        </div>
    </div>
    <img src="../Img/page10_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
      line7Animate: false,
      line8Animate: false,
      line9Animate: false,
      line10Animate: false,
      line11Animate: false,
      line12Animate: false,
      line13Animate: false,
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
    }, 100)
    setTimeout(()=>{
          that.line3Animate = true;
    }, 200)
    setTimeout(()=>{
          that.line4Animate = true;
    }, 300)
    setTimeout(()=>{
          that.line5Animate = true;
    }, 400)
    setTimeout(()=>{
          that.line6Animate = true;
    }, 500)
    setTimeout(()=>{
          that.line7Animate = true;
    }, 600)
    setTimeout(()=>{
          that.line8Animate = true;
    }, 700)
    setTimeout(()=>{
          that.line9Animate = true;
    }, 800)
    setTimeout(()=>{
          that.line10Animate = true;
    }, 900)
    setTimeout(()=>{
          that.line11Animate = true;
    }, 1500)
    setTimeout(()=>{
          that.line12Animate = true;
    }, 1700)
    setTimeout(()=>{
          that.line13Animate = true;
    }, 1900)
  },
  methods: {
      goNext: function() {
        this.$router.push({path: '/page6' })
      },
      goTakeText: function() {
        this.$router.push({path: '/takePicture' })
      },
      goWorkList: function() {
        this.$router.push({path: '/workList' })
      },
      goLast: function() {
        this.$router.push({path: '/last' })
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
