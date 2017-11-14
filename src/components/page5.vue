<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="box-flex margin-left-2r margin-top-5r width-50">
          <div class="text-align-left">
            <img src="../Img/page1_logo.png" class="width-60">
          </div>
        </div>
        <div class="bg-ea3f21-r width-70 margin-left-2r textclolor-white padding-1m-2m">
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
        <div class="margin-top-5-d text-align-right">
            <img src="../Img/page1_b.png" class="width-80">
        </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r">
        <img src="../Img/action.png" class="width-20 relative" @click="goNext"/>
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
      }
  }
}
</script>
<style>

</style>
