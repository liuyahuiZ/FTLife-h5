<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="bg-ea3f21-r9 relative width-80 margin-left-10 textclolor-white font-size-9 padding-1m margin-top-3r">
            <div class="margin-top-3r">
              <span v-show="fontType==='jian'">上传你的「盛世」和「守护」时刻照片</span>
              <span v-show="fontType==='fan'">上傳你的「盛世」和「守護」時刻照片</span>
            </div>
            <div>生成照片模版</div>
            <div>
              <span v-show="fontType==='jian'">让大家为你的时刻给心</span>
              <span v-show="fontType==='fan'">讓大家為你的时刻給心</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">同事你也可以为别人的时刻给心</span>
              <span v-show="fontType==='fan'">同時你也可以為別人的時刻給心</span>
            </div>
            <div class="absolute top-0 left-0 text-align-left ">
                <img src="../Img/logo.png" class="width-70">
            </div>
        </div>
        <div class="bg-2A2B2C-r relative width-80 margin-left-10 textclolor-white font-size-9  padding-1m">
            <div >只要收集到
              <span class="textcolor-EF3F24 font-size-12">1,680个</span>
              <img src="../Img/heart.png" class="width-10" />
            </div>
            <div>
              <span v-show="fontType==='jian'">富通保险会向</span>
              <span v-show="fontType==='fan'">富通保險會向</span>
            </div>
            <div class="textcolor-EF3F24 font-size-12">
              <span v-show="fontType==='jian'">希望工程圆梦行动</span>
              <span v-show="fontType==='fan'">希望工程圓夢行動</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">为三名农村家庭经济困难、品学兼优的大学生提供四年的学习生活费用</span>
              <span v-show="fontType==='fan'">為三名農村家庭經濟困難、品學兼優的大學生提供四年的學習生活費用</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">「守护」他們实现</span>
              <span v-show="fontType==='fan'">「守護」他們實現</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">他们人生的「盛世」时刻</span>
              <span v-show="fontType==='fan'">他們人生的「盛世」時刻</span>
            </div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-70 margin-left-15 margin-top-2" @click="goTakeText">
              <span v-show="fontType==='jian'">立马上传</span>
              <span v-show="fontType==='fan'">立馬上傳</span>
            </div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-70 margin-left-15 margin-top-2" @click="goWorkList">
              <span v-show="fontType==='jian'">先去看看给心</span>
              <span v-show="fontType==='fan'">先看看去給心</span>
            </div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-70 margin-left-15 margin-top-2" @click="goLast">
              <span v-show="fontType==='jian'">了解真正的盛世和守护</span>
              <span v-show="fontType==='fan'">了解真正盛世及守護</span>
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

</style>
