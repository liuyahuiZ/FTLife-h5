<template>
  <div id="articleList">
    <div id="page" class="page-header-main" @mousedown="startDrag" @touchstart="startDrag"
    @mousemove="onDrag" @touchmove="onDrag"
    @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag">
      <div class="width-100 relative">
        <img src="../Img/takeText_top.png" class="width-60">
        <div class="absolute top-1r right-1 width-40 zindex-100 text-align-right">
            <div class="width-100 heightr-2fr relative margin-bottom-2r">
                <div class="line-heightr-2fr bg-2A2B2C text-align-left textclolor-white padding-left-f5r font-size-6">{{collected}}/{{AllCollect}}</div>
                <img src="../Img/hert_group.png" class="heightr-2fr absolute right-0 top-0"/>
            </div>
        </div>
      </div>
      <div class="width-70 margin-left-15 relative bg-show zindex-10">
        <img src="../Img/list_top.png" class="width-100">
      </div>
      <div class="heightv-65 width-70 margin-left-15 overflow-hide" :style="contentPosition">
        <div class="loadmore-top" v-if="!refresh" v-bind:class="{ transroute: rotate, transnone: !rotate }">↓</div>
        <div class="loadmore-top" v-if="refresh"><div class="spanner span-inner" ></div></div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(L,index) in workListLeft" key={{index}}>
             <img class="images-con imgpic" v-bind:src="(config.api+L._id)" @click="goDetail(L._id)">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="loadmore-bottom" v-if="!showloading" v-bind:class="{ transroute: !rotate, transnone: rotate }">↓</div>
        <div class="loadmore-bottom" v-if="showloading"><div class="spanner span-inner"></div></div>
      </div>
      <div class="width-100 absolute bottom-1r">
        <div class="text-align-center bg-53575A textclolor-white line-heightr-3 width-70 margin-left-15 margin-top-2 font-size-8" @click="getMyPicture">
          上传我的盛世和守护
        </div>
        <div class="text-align-center bg-53575A textclolor-white line-heightr-3 width-70 margin-left-15 margin-top-2 font-size-8" @click="goNext">
          了解真正盛世及守护
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require('swiper/dist/css/swiper.css')
import Service from '@/util/service'
import configs from '@/util/configs'
import dynamics from 'dynamics.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Vue from 'vue'
// let page = document.getElementById('page')
// console.log(page)

Vue.use(VueAwesomeSwiper)
export default {
  data () {
    return {
      dragging: false,
      // quadratic bezier control point
      c: { x: 160, y: 160 },
      // record drag start point
      start: { x: 0, y: 0 },
      rotate: false,
      refresh: false,
      showloading: false,
      deny: 0,
      limitHight: 190,
      limitlow: -190,
      lineNem: 8,
      workListLeft: [],
      workListRight: [],
      config: configs.config,
      pageIndex: 1,
      pageNum: 6,
      allPage: 0,
      AllCollect: 1680,
      collected: 0,
      notNextTick: true,
      swiperOption: {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
      }
    }
  },
  components: {
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  created: function () {
    // console.log('beforeCreate is triggered.')
    const self = this
    let reqbody={
      "pageNum":this.pageIndex,
      "numPerPage":this.pageNum,
    }
    Service.Post('files/fileList',reqbody)
    .then(resp => {
        console.log(resp,resp.respBody)
        let data = resp.respBody;
        self.pageIndex = data.page.pageIndex
        self.allPage = data.page.allpage
        self.workListLeft.push(...data.data);
    })
    .catch(error => console.log(error))

    Service.Post('collect/findAllCollects',{})
    .then(resp => {
        console.log(resp,resp.respBody)
        let data = resp.respBody;
        self.collected = data.length;
    })
    .catch(error => console.log(error))
  },
  computed: {
    headerPath: function () {
      return 'M0,0 L320,0 320,160' +
        'Q' + this.c.x + ',' + this.c.y +
        ' 0,160'
    },
    contentPosition: function () {
      var dy = this.c.y - 160
      var dampen = dy > 0 ? 2 : 4
      return {
        transform: 'translate3d(0,' + dy / dampen + 'px,0)'
      }
    }
  },
  methods: {
    startDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      this.dragging = true
      this.start.x = e.pageX
      this.start.y = e.pageY
    },
    onDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging) {
        this.c.x = 160 + (e.pageX - this.start.x)
        // dampen vertical drag by a factor
        var dy = e.pageY - this.start.y
        var dampen = dy > 0 ? 1.5 : 2
        this.c.y = 160 + dy / dampen
        // console.log(dy)
        if (dy > 0) {
          if (dy > this.limitHight) {
            this.rotate = true
          } else {
            this.rotate = false
          }
        } else {
          if (dy < this.limitlow) {
            this.rotate = true
          } else {
            this.rotate = false
          }
        }
        this.deny = dy
      }
    },
    stopDrag: function () {
      if (this.dragging) {
        this.dragging = false
        this.rotate = false
        var o = this
        // console.log(o.deny)
        if (o.deny > 0) {
          if (o.deny > o.limitHight) {
            o.refresh = true // 显示loading
            o.rebacload(o)
            // 获取数据
            this.getdate(o).then(function (result) {
              // console.log(result)
              o.refresh = false
              o.rebac(o)
            })
          } else {
            o.rebac(o)
          }
        } else {
          if (o.deny < o.limitlow) {
            o.showloading = true // 显示loading
            o.moreload(o)
            // 获取数据
            this.loadMoreDate(o).then(function (result) {
              // console.log(result)
              o.showloading = false
              o.rebac(o)
            })
          } else {
            o.rebac(o)
          }
        }
      }
    },
    rebacload: function (o) {
      dynamics.animate(o.c, {
        x: 160,
        y: 300
      }, {
        type: dynamics.spring,
        duration: 700,
        friction: 280
      })
    },
    rebac: function (o) {
      dynamics.animate(o.c, {
        x: 160,
        y: 160
      }, {
        type: dynamics.spring,
        duration: 700,
        friction: 280
      })
    },
    moreload: function (o) {
      dynamics.animate(o.c, {
        x: 160,
        y: 0
      }, {
        type: dynamics.spring,
        duration: 700,
        friction: 280
      })
    },
    loadMoreDate () {
      const self=this
      return new Promise(function (resolve, reject) {
        let page=self.pageIndex
        if(self.pageIndex<=self.allPage){
          page=self.pageIndex+1
        }else{
          return resolve(null)
        }
        let reqbody={
          "pageNum":page,
          "numPerPage":self.pageNum,
        }
        Service.Post('files/fileList',reqbody)
        .then(resp => {
            // console.log(data,data.data)
            let data = resp.respBody;
            self.pageIndex = data.page.pageIndex
            self.allPage = data.page.allpage
            self.workListLeft.push(...data.data);
            resolve(data.data)
        })
        .catch(error => console.log(error))
      })
    },
    getdate: function () {
      const self=this
      return new Promise(function (resolve, reject) {
        self.workListLeft=[]
        self.workListRight=[]
        let reqbody={
          "pageNum":1,
          "numPerPage":self.pageNum,
        }
        Service.Post('files/fileList',reqbody)
        .then(resp => {
            let data = resp.respBody;
            console.log(data,data.data)
            self.pageIndex = data.page.pageIndex
            self.allPage = data.page.allpage
            self.workListLeft.push(...data.data);
            resolve(data.data)
        })
        .catch(error => console.log(error))
      })
    },
    getMyPicture: function(){
      this.$router.push({path: '/takePicture'})
    },
    goNext: function(){
      this.$router.push({path: '/last'})
    },
    goDetail(id) {
      this.$router.push({path: '/pictureDetail/'+id })
    }
  }
}
</script>
<style>
  h1 {
  font-weight: 300;
  font-size: 1.8em;
  margin-top: 0;
}
.bg-313991{
  background: #313991
}

.content {
  color: #333;
  line-height: 1.5em;
  min-height: 100vh;
}
.padding-all{
  padding: 3%;
}
/**/
.isshow{
  display: none
}
.loadmore-top{
  width: 100%;height: 50px;text-align: center;margin-top: -50px;line-height: 50px;
}
.loadmore-bottom{
  width: 100%;height: 50px;text-align: center;margin-bottom: -50px;line-height: 50px;
  position: absolute;bottom: 0px;
}
.transroute{
  transform:rotate(180deg);
  transition: all 0.5s ease;
}
.transnone{
  transform:rotate(0deg);
  transition: all 0.5s ease;
}
.spanner{
  -webkit-animation: mint-spinner-rotate 0.8s infinite linear;
    animation: mint-spinner-rotate 0.8s infinite linear;
    border: 4px solid transparent;
    border-radius: 50%;
}
.span-inner{
  margin: 0 auto;
   border-top-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    height: 20px;
    width: 20px;
}
.masonry img {
    transition: .8s all;
    opacity: 0.7;
}
.masonry img:hover { opacity: 0.9; box-shadow: 1px 1px 20px #333;cursor: pointer }

.swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }
  .swiper-container{
    overflow: inherit!important;
  }
  .swiper-pagination{
    bottom: -12%!important;
  }
</style>
