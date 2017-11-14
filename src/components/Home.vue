<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex flex-direction-column" >
        <div class="padding-all-2rem margin-top-5r">
           <img src="../Img/home_title.png" class="images-con">
           <img src="../Img/home_title1.png" class="width-60">
        </div>
        <div class="bg-activity-status width-90 textclolor-white padding-1m-2m">
            <div>奉献爱心大行动</div>
            <div>与富通一起</div>
            <div>支持希望工程</div>
        </div>
        <div class="margin-left-2r margin-top-2">
            <img src="../Img/logo.png" class="width-60">
        </div>
        <div class="margin-top-5">
            <img src="../Img/home_b.png" class="width-60">
        </div>
        <div class="absolute bottom-5 right-5 width-20" @click="goNext">
            <div class="width-100 textcolor-EF4224 relative top-f5r font-size-9">立即行动</div>
            <img src="../Img/loading_next.png" class="width-100 relative" :class="{ 'btn-animate': btnAnimate=== true }">
        </div>
        <div class="absolute bottom-0 bg-activity-status width-100 heightr-1 overflow-hide" >
            <img src="../Img/loading_bar.png" class="width-100 heightr-1 loading relative" />
        </div>
        <div class="absolute top-0 bg-activity-status width-100 heightr-1 overflow-hide" >
            <img src="../Img/loading_bar.png" class="width-100 heightr-1 loading relative" />
        </div>
    </div>
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
  beforeCreate: function () {
      const that = this;
      setTimeout(()=>{
          that.btnAnimate = true;
      }, 5000)
  },
  created: function () {
    // console.log('beforeCreate is triggered.')
  },
  methods: {
      goNext: function() {
          this.$router.push({path: '/page1' })
      }
  }
}
</script>
<style>
.loading{
    animation: loading-in 5s ease;
}
.btn-animate{
    animation: anit-in  1.5s infinite;
}

@keyframes loading-in {
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
}
@keyframes anit-in {
  0% {
    left: 0%;
  }
  50%{
    left: 10%;
  }
  100% {
    left: 0%;
  }
}
</style>
