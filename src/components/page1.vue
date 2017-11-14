<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
        <div class="box-flex relative margin-left-2r margin-top-5r width-70">
          <div class="text-align-left width-60">
            <img src="../Img/page1_logo.png" class="width-60">
          </div>
          <div class="box-flex absolute right-0 top-0 text-align-right">
            <div class="text-items bg-show textcolor-EF3F24 margin-right-1" :class="{ 'bg-ea3f21-r9 textclolor-white': isActive=== 'fan' }" @click="setActive('fan')">繁</div>
            <div class="text-items bg-show textcolor-EF3F24" :class="{ 'bg-ea3f21-r9 textclolor-white': isActive=== 'jian' }" @click="setActive('jian')">简</div>
          </div>
        </div>
        <div class="bg-ea3f21-r width-70 margin-left-2r textclolor-white padding-1m-2m font-size-12">
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
      btnAnimate: false,
      isActive: 'jian'
    }
  },
  components: {
  },
  created: function () {
    // console.log('beforeCreate is triggered.')
    sessionStorage.setItem('fontType','jian')
  },
  methods: {
      goNext: function() {
        this.$router.push({path: '/page2' })
      },
      setActive: function(wod) {
        this.isActive= wod;
        if(wod==='fan'){
          sessionStorage.setItem('fontType','fan')
        } else{
          sessionStorage.setItem('fontType','jian')
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
</style>
