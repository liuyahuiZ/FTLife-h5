<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="bg-ea3f21-r9 width-70 margin-left-1r textclolor-white padding-1m padding-bottom-6r  margin-top-12r">
            <div class="line-heightr-2 font-size-12">
              <span v-show="fontType==='jian'">与富通保险一起</span>
              <span v-show="fontType==='fan'">與富通保險一起</span>
            </div>
            <div class="margin-top-2">
              <span v-show="fontType==='jian'">用行动「守护」</span>
              <span v-show="fontType==='fan'">用行動「守護」</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">让每个人</span>
              <span v-show="fontType==='fan'">讓每一個人</span>
            </div>
            <div>
              <span v-show="fontType==='jian'">都有追逐属于自己的「盛世」</span>
              <span v-show="fontType==='fan'">都有機會追逐屬於自己的「盛世」</span>
            </div>
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
      btnAnimate: false,
      fontType: localStorage.getItem('fontType')!==null?localStorage.getItem('fontType') : 'jian'
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
