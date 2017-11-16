<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="box-flex relative margin-left-2r margin-top-5r width-70">
          <div class="text-align-left width-60" :class="{ 'p1-line-animate': line1Animate, 'opacity-0':!line1Animate }">
            <img src="../Img/page1_logo.png" class="width-60">
          </div>
          <div class="box-flex absolute right-0 top-0 text-align-right" :class="{ 'p1-line-animate': line1Animate, 'opacity-0':!line1Animate }">
            <div class="text-items bg-show textcolor-EF3F24 margin-right-1" :class="{ 'bg-ea3f21-r9 textclolor-white': isActive=== 'fan' }" @click="setActive('fan')">繁</div>
            <div class="text-items bg-show textcolor-EF3F24" :class="{ 'bg-ea3f21-r9 textclolor-white': isActive=== 'jian' }" @click="setActive('jian')">简</div>
          </div>
        </div>
        <div class="bg-ea3f21-r width-70 margin-left-2r textclolor-white padding-1m-2m font-size-12" :class="{ 'p1-pic-animate': line2Animate, 'opacity-0':!line2Animate }">
            <div class="margin-top-3r line-heightr-2">人的一生</div>
            <div>
              <span v-show="isActive==='jian'">有无数</span>
              <span v-show="isActive==='fan'">有無數</span>
            </div>
            <div>
              <span v-show="isActive==='jian'">值得定格的</span>
              <span v-show="isActive==='fan'">值得記錄定格的</span>
            </div>
            <div><img src="../Img/page1_shs.png" class="width-40 margin-top-f5r "/></div>
            <div>
              <span v-show="isActive==='jian'">时刻</span>
              <span v-show="isActive==='fan'">時刻</span>
            </div>
        </div>
        <div class="margin-top-5-d text-align-right" :class="{ 'p1-line-animate': line3Animate, 'opacity-0':!line3Animate }">
            <img src="../Img/page1_b.png" class="width-80">
        </div>
    </div>
    <div class="absolute bottom-1r width-100 zindex-10 text-align-center" :class="{ 'takepic-animate': line4Animate, 'takepic-deful':!line4Animate }">
        <img src="../Img/action.png" class="width-20 relative" @click="goNext"/>
    </div>
    <img src="../Img/page1_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
      isActive: 'jian',
      line1Animate: false,
      line2Animate: false,
      line3Animate: false,
      line4Animate: false,
    }
  },
  components: {
  },
  created: function () {
    // console.log('beforeCreate is triggered.')
    sessionStorage.setItem('fontType','jian');
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
        this.$router.push({path: '/page3' })
      },
      setActive: function(wod) {
        this.isActive= wod;
        if(wod==='fan'){
          localStorage.setItem('fontType','fan')
        } else{
          localStorage.setItem('fontType','jian')
        }
      }
  }
}
</script>
<style>
 .text-items{
   width: 2rem;
   height: 2rem;
   line-height: 2rem;
   text-align: center;
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
</style>
