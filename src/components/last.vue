<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
      <div class="width-100 relative">
        <img src="../Img/takeText_top.png" class="width-60">
        <img src="../Img/takeText_logo.png" class="width-30">
      </div>
      <div class="bg-ea3f21-r9 relative width-70 margin-left-15 textclolor-white font-size-8 padding-1m margin-top-3r padding-bottom-3r">
          <div><img src="../Img/last_title.png" class="width-60 margin-top-3r"></div>
          <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-80 margin-left-10 margin-top-3r" @click="goTakeText">
            了解真正的盛世
          </div>
          <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-80 margin-left-10 margin-top-2" @click="goNext">
            了解真正的守护
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
      btnAnimate: false
    }
  },
  components: {
  },
  created: function () {
    sessionStorage.setItem('type','盛世')
  },
  methods: {
      goNext: function() {
        // this.$router.push({path: '/takePicture' })
      },
      goTakeText: function() {
        // this.$router.push({path: '/takeText' })
      }
  }
}
</script>
<style>

</style>
