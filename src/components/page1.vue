<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="box-flex margin-left-2r margin-top-5r width-70">
          <div class="text-align-left">
            <img src="../Img/page1_logo.png" class="width-70">
          </div>
          <div class="text-align-right">
            <img src="../Img/page1_top.png" class="width-50 relative top-f5r">
          </div>
        </div>
        <div class="bg-ea3f21-r width-70 margin-left-2r textclolor-white padding-1m-2m font-size-12">
            <div class="margin-top-3r line-heightr-2">人的一生</div>
            <div>有无数</div>
            <div>值得定格的</div>
            <div><img src="../Img/page1_shs.png" class="width-40 margin-top-f5r "/></div>
        </div>
        <div class="margin-top-5-d text-align-right">
            <img src="../Img/page1_b.png" class="width-80">
        </div>
    </div>
    <div class="absolute bottom-1r width-100 zindex-10 text-align-center">
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
        this.$router.push({path: '/page2' })
      }
  }
}
</script>
<style>

</style>
