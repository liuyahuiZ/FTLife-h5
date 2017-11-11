<template>
  <div class="main-home relative bg-show" id="home">
    <div class="absolute bottom-50 width-100 zindex-200 text-align-center padding-1m" @click="playVieo">
      <img src="../Img/movie_play.png" class="width-20 "/>
    </div>
    <div class="absolute bottom-6r width-100 zindex-200 text-align-center padding-1m">
      <div class="bg-ea3f21-r width-70 margin-left-15 textclolor-white padding-1m-2m font-size-12">
            <div class="line-heightr-2" >盛世人生 代代相传</div>
        </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r" @click="goNext">
        <img src="../Img/action_movie.png" class="width-20 "/>
    </div>
    <div class="box-flex relative bg-show width-100 images-allhei flex-direction-column zindex-200"  v-show="showVieo">
        <div class="absolute bottom-0 width-100 text-align-center padding-1m bg-000-r textclolor-white" @click="closeVieo">
          关闭
        </div>
        <video controls="controls" class="width-100" src="../Img/back456.mp4" id="audioPlay" ref="vieoPlay" />
    </div>
    <img src="../Img/page4_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
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
      showVieo: false,
    }
  },
  components: {
  },
  created: function () {
    // console.log('beforeCreate is triggered.')
  },
  methods: {
      goNext: function() {
        console.log(this.showVieo);
        const self = this;
        this.$router.push({path: '/page5' })
      },
      playVieo:function() {
        this.showVieo= true;
        this.$refs.vieoPlay.play();
      },
      closeVieo: function() {
        this.showVieo= false;
        this.$refs.vieoPlay.pause();
      }
  }
}
</script>
<style>
.action-animate{
  animation: action-in  0.5s;
}

@keyframes action-in {
  0% {
    background: rgba(255,255,255, 0);
  }
  50% {
    background: rgba(255,255,255, 1);
  }
  100% {
    background: rgba(0,0,0, 0.7);
  }
}
</style>
