<template>
  <div id="pictureDetail">
    <div class="box-flex flex-direction-column" >
        <div class="width-100">
            <img class="images-con imgpic" v-bind:src="(config.api+picture._id)">
        </div>
    </div>
    <div class="absolute top-10 right-5 width-40 zindex-100 text-align-right">
        <div class="width-100 heightr-3 relative margin-bottom-2r">
            <div class="line-heightr-3 bg-2A2B2C text-align-left textclolor-white padding-left-1r">{{collect}}/{{AllCollect}}</div>
            <img src="../Img/hert_group.png" class="widthr-3 heightr-3 absolute right-0 top-0"/>
        </div>
        <div class="width-100 ">
            <img src="../Img/do_hert.png" class="widthr-3 heightr-3" @click="doCreat" />
        </div>
    </div>
    <img src="../Img/heart_icn.png" class="absolute top-1 right-3 display_none" :class="{ 'heart-animate display_block': showHearAnimat }"/>
    <div class="absolute top-1 right-3 width-30 zindex-200" v-show="showShare" @click="goShare">
        <img src="../Img/shareto.png" class="width-100 relative"/>
    </div>
    <div class="absolute main-home top-0 zindex-200" v-show="shareStatus">
      <div class="width-100 relative">
        <img src="../Img/takeText_top.png" class="width-60">
        <img src="../Img/takeText_logo.png" class="width-30">
      </div>
      <div class="width-70 margin-left-15 margin-top-3r relative">
        <img src="../Img/share_text.png" class="width-100">
      </div>
      <div class="width-70 margin-left-15 relative margin-top-2 padding-1m bg-ea3f21-r9 textclolor-white padding-bottom-3r">
        <div class="width-70 margin-top-3r font-size-16"> 分享成功</div>
        <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-100 margin-top-3r font-size-8" @click="goWorkList">
          查看更多「盛世」和「守护」时刻
        </div>
        <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-100 margin-top-2 font-size-8" @click="goNext">
          了解真正「盛世」和「守护」
        </div>
      </div>
    </div>
    <div class="black-bg zindex-110" v-show="showBg" />
    <div class="absolute bottom-0 width-100 zindex-100 text-align-center padding-1m bg-000-r" v-show="showBack">
        <div class="width-70 margin-left-15 bg-show line-heightr-3 textcolor-EF3F24" @click="goWorkList">返回相册</div>
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
      deny: 0,
      picture: {},
      config: configs.config,
      collect: 0,
      showShare: false,
      shareStatus: false,
      showBg: false,
      from: this.$route.params.from,
      AllCollect: 1000,
      showHearAnimat: false,
      showBack: false
    }
  },
  components: {
  },
  beforeCreate: function () {
    console.log('beforeCreate is triggered.')
  },
  created: function () {
    const self = this;
    this.getPicture();
    this.getSelect();
    // console.log('beforeCreate is triggered.')
  },
  methods: {
      goShare: function(){
        const self = this;
        console.log('goShare');
        self.shareStatus = true;
        self.showShare = false;
      },
      getPicture: function() {
        const self = this;
        let reqbody={
        "id" : this.$route.params.id
        }
        Service.Post('files/ImageDetail',reqbody)
        .then(data => {
            console.log(data,data.respBody.data)
            self.picture = data.respBody.data[0]
            const userid = localStorage.getItem("FTL_user_id");
            console.log(userid,self.picture.userid)
            if(userid && self.picture.userid) {
                if(userid!==self.picture.userid) {
                    self.showBack = true
                } else {
                    if(self.from && self.from==='takePicture') {
                        setTimeout(()=>{
                            self.showShare = true;
                            self.showBg = true;
                        },4000);
                        setTimeout(()=>{
                            self.shareStatus = true;
                            self.showShare = false;
                        },15000)
                    } else{
                        self.showBack = true
                    }
                }
            }
        })
        .catch(error => console.log(error))
      },
      getSelect: function(){
        const self = this;
        let reqbodys={
            "fileid" : self.$route.params.id
        }
        Service.Post('collect/findCollects',reqbodys)
        .then(data => {
            console.log(data,data.respBody)
            self.collect = data.respBody.length
        })
        .catch(error => console.log(error))
      },
      doCreat: function() {
        const userid = localStorage.getItem("FTL_user_id");
        const self = this;
        let reqbody={
            "fileid" : this.$route.params.id,
            "userid" : userid
        }
        Service.Post('collect/createCollect',reqbody)
        .then(data => {
            console.log(data,data.respBody.data)
            self.getSelect();
            self.showHearAnimat = true;
            setTimeout(()=>{
                self.showHearAnimat = false;
            },3000)
        })
        .catch(error => console.log(error))
      },
      goWorkList: function(){
          this.$router.push({path: '/workList'})
      },
      goNext: function(){
      this.$router.push({path: '/last'})
    },
  }
}
</script>
<style>
.heart-animate{
    animation: doheart-in  1.5s linear;
    z-index: 1000;
    width: 1.9rem;
    animation-fill-mode: forwards;
}
@keyframes doheart-in {
  0% {
    transform: translate(-1rem,8rem);
  }
  20% {
    transform: translate(-2rem,6rem);
  }
  40% {
    transform: translate(-1rem,4rem);
  }
  60%{
    transform: translate(-2rem,2rem);
  }
  80% {
    opacity: 0.2;
    transform: translate(-1rem,0rem);
  }
  100% {
    width: 1.5rem;
    transform: translate(0rem,-2rem);
    opacity: 0;
  }
}
</style>