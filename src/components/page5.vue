<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="box-flex margin-left-2r margin-top-5r width-50">
          <div class="text-align-left">
            <img src="../Img/page1_logo.png" class="width-60">
          </div>
        </div>
        <div class="bg-ea3f21-r width-70 margin-left-2r textclolor-white padding-1m-2m">
            <div class=" line-heightr-2">那些「盛世」的瞬间</div>
            <div>构成了人生最自豪的篇章</div>
            <div>而成就「盛世」时刻</div>
            <div>往往来自</div>
            <div>身边爱你的人</div>
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
      }
  }
}
</script>
<style>

</style>
