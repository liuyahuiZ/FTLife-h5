<template>
  <div class="main-home relative bg-show" id="home">
    <div class="box-flex relative flex-direction-column zindex-10" >
      <div class="width-100 relative">
        <img src="../Img/takeText_top.png" class="width-60">
        <img src="../Img/takeText_logo.png" class="width-30">
      </div>
      <div class="width-70 box-flex text-align-center font-size-12 line-heightr-3 relative margin-left-15 margin-top-3r margin-bottom-1">
        <div class="width-50 bg-show textcolor-EF3F24 margin-right-1" :class="{ 'bg-ea3f21-r9 textclolor-white': isActive=== 'shs' }" @click="setActive('shs')">盛世</div>
        <div class="width-50 bg-show textcolor-EF3F24" :class="{ 'bg-ea3f21-r9 textclolor-white': isActive=== 'sh' }" @click="setActive('sh')">守护</div>
      </div>
      <div class="bg-ea3f21-r9 relative width-70 margin-left-15 textclolor-white font-size-8 padding-1m ">
          <textarea class="width-100 heightr-9 font-size-12" v-model="text" />
          <div class="margin-top-2">1.选择盛世或者守护</div>
          <div>2.选择或者输入你想要合成的文字</div>
          <div>3.点击拍照按钮选择你想要合成的照片</div>
      </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r">
        <div class="width-100 textclolor-white margin-bottom-3 font-size-8 ">上传或者立刻拍摄你的“盛世”、“守护”时刻</div>
        <img src="../Img/action.png" class="width-20 relative" @click="goNext"/>
    </div>
    <img src="../Img/takeText_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
      isActive: 'shs',
      text: '盛世胸懷成就心，富過三代可成真'
    }
  },
  components: {
  },
  created: function () {
    sessionStorage.setItem('type','盛世')
  },
  methods: {
      setActive: function(wod) {
        this.isActive= wod;
        if(wod==='shs'){
          sessionStorage.setItem('type','盛世')
        } else{
          sessionStorage.setItem('type','守护')
        }
      },
      goNext: function() {
        console.log(this.text)
        sessionStorage.setItem('text',this.text)
        this.$router.push({path: '/takePicture' })
      },
      goTakeText: function() {
        this.$router.push({path: '/takeText' })
      }
  }
}
</script>
<style>

</style>
