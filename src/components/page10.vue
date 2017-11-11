<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="bg-ea3f21-r9 relative width-80 margin-left-10 textclolor-white font-size-9 padding-1m margin-top-3r">
            <div class="margin-top-3r">上傳你的 「盛世」和「守護」時刻照片</div>
            <div>生成照片模版</div>
            <div>讓大家為你的时刻給心</div>
            <div>同時你也可以為別人的時刻給心</div>
            <div class="absolute top-0 left-0 text-align-left ">
                <img src="../Img/logo.png" class="width-70">
            </div>
        </div>
        <div class="bg-2A2B2C-r relative width-80 margin-left-10 textclolor-white font-size-9  padding-1m">
            <div >只要收集到
              <span class="textcolor-EF3F24 font-size-12">1,000个</span>
              <img src="../Img/heart.png" class="width-10" />
            </div>
            <div>富通保险会向</div>
            <div class="textcolor-EF3F24 font-size-12">希望工程圆梦行动</div>
            <div>为三名农村家庭经济困难、品学兼优的大学生提供四年的学习生活费用</div>
            <div>「守护」他們實現</div>
            <div>他們人生的「盛世」時刻</div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-70 margin-left-15 margin-top-2" @click="goTakeText">
              立马上传
            </div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-70 margin-left-15 margin-top-2">
              先去看看给心
            </div>
            <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-70 margin-left-15 margin-top-2">
              了解真正的盛世和守护
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
      btnAnimate: false
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
        this.$router.push({path: '/takeText' })
      }
  }
}
</script>
<style>

</style>
