<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="bg-ea3f21-r9 width-70 margin-left-1r textclolor-white padding-1m padding-bottom-6r  margin-top-12r">
            <div class="line-heightr-2 font-size-12">与富通保险一起</div>
            <div class="margin-top-2">用行动「守護」</div>
            <div>让每个人</div>
            <div>都有追逐属于自己的「盛世」</div>
        </div>
        <div class="margin-top-2 text-align-left margin-left-1r">
            <img src="../Img/logo.png" class="width-70">
        </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r">
        <img src="../Img/action.png" class="width-20 relative" @click="goNext"/>
    </div>
    <img src="../Img/page9_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
        this.$router.push({path: '/page10' })
      }
  }
}
</script>
<style>

</style>
