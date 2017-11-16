<template>
  <div id="pictureDetail">
    <div class="box-flex flex-direction-column" >
        <div class="width-100">
            <img class="images-con imgpic" v-bind:src="(config.api+picture._id)">
        </div>
    </div>
    <div class="absolute top-10 right-5 width-40 zindex-100 text-align-right" v-show="showzan">
        <div class="width-100 heightr-2fr relative margin-bottom-2r">
            <div class="line-heightr-2fr bg-2A2B2C text-align-left textclolor-white padding-left-1r">{{collect}}/{{AllCollect}}</div>
            <img src="../Img/hert_group.png" class="heightr-2fr absolute right-0 top-0"/>
        </div>
        <div class="hearts" @click="doCreat">
            <img src="../Img/heart_icn.png" class="relative heightr-1fr top-f5r" :class="{ 'img-scale': line6Animate }" @click="doCreat" />
            <!-- <img src="../Img/do_hert.png" class="heightr-2fr" @click="doCreat" /> -->
        </div>
    </div>
    <img src="../Img/heart_icn.png" class="absolute top-1 right-3 display_none" :class="{ 'heart-animate display_block': showHearAnimat }"/>
    <div class="absolute top-1 right-3 width-30 zindex-200" v-show="showShare">
        <img src="../Img/shareto.png" class="width-100 relative"/>
    </div>
    <div class="absolute main-home top-0 zindex-200" v-show="shareStatus">
      <div class="width-100 relative">
        <img src="../Img/takeText_top.png" class="width-60">
        <img src="../Img/page1_logo.png" class="width-30">
      </div>
      <div class="width-70 margin-left-15 margin-top-3r relative">
        <img src="../Img/share_text.png" class="width-100">
      </div>
      <div class="width-70 margin-left-15 relative margin-top-2 padding-1m bg-ea3f21-r9 textclolor-white padding-bottom-3r" :class="{ 'bg-scale': line1Animate, 'opacity-0':!line1Animate }">
        <div class="width-70 margin-top-3r font-size-16" :class="{ 'word-scale': line2Animate, 'opacity-0':!line2Animate }"> 分享成功</div>
        <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-100 margin-top-3r font-size-8" @click="goWorkList" :class="{ 'bottom-line': line3Animate, 'opacity-0':!line3Animate }">
          <span v-show="fontType==='jian'">查看更多「盛世」和「守护」时刻</span>
          <span v-show="fontType==='fan'">查看更多「盛世」和「守護」時刻</span>
        </div>
        <div class="text-align-center bg-show textcolor-EF3F24 line-heightr-3 width-100 margin-top-2 font-size-8" @click="goNext" :class="{ 'bottom-line': line4Animate, 'opacity-0':!line4Animate }">
          <span v-show="fontType==='jian'">了解真正「盛世」和「守护」</span>
          <span v-show="fontType==='fan'">了解真正「盛世」及「守護」</span>
        </div>
      </div>
    </div>
    <div class="black-bg zindex-110" v-show="showBg" />
    <div class="absolute bottom-0 width-100 zindex-100 text-align-center padding-1m bg-000-r" v-show="showBack">
        <div class="width-70 margin-left-15 bg-show line-heightr-3 textcolor-EF3F24" @click="goWorkList">返回相册</div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r" v-show="showNoShare">
        <div class="width-70 margin-left-15 bg-show line-heightr-3 textcolor-EF3F24" @click="goNoShare">暂不分享</div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-100 text-align-center padding-1m bg-000-r" v-show="showMyplay">
        <div class="width-70 margin-left-15 bg-show line-heightr-3 textcolor-EF3F24" @click="goHome">我也要玩</div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r" v-show="showoption">
        <img src="../Img/action.png" class="width-20 relative" @click="showShareApp"/>
    </div>
  </div>
</template>

<script>
import Service from '@/util/service'
import configs from '@/util/configs'
import dynamics from 'dynamics.js'
import Vue from 'vue'
import wx from 'weixin-js-sdk'
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
      AllCollect: 1680,
      showHearAnimat: false,
      showBack: false,
      showzan: false,
      showoption: false,
      fontType: localStorage.getItem('fontType')!==null?localStorage.getItem('fontType') : 'jian',
      showMyplay: false,
      showNoShare: false,
      line1Animate: false,
      line2Animate: false,
      line3Animate: false,
      line4Animate: false,
      line6Animate: false
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
    this.getSign();
    this.line6Animate= true;
  },
  methods: {
      getSign: function() {
        const self = this;
        let reqbody={
        "id" : this.$route.params.id
        }
        Service.Post('wx/sign',reqbody)
        .then(data => {
          console.log(data,data.respBody)
           wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wxdbe18f838fcee2ba', // 必填，公众号的唯一标识
              timestamp: data.respBody.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.respBody.noncestr, // 必填，生成签名的随机串
              signature: data.respBody.signature,// 必填，签名，见附录1
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(()=>{
            console.log('wx.ready');
          });

          wx.error(function(res){

            console.log('wx err',res);

            //可以更新签名
          });
          wx.onMenuShareTimeline({
              title: '富通保险奉献爱心大行动', // 分享标题
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://futong.1dospace.com/images/title.jpg', // 分享图标
              success: function () { 
                  // 用户确认分享后执行的回调函数
                  self.goShare()
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
              }
          });
          wx.onMenuShareAppMessage({
              title: '富通保险奉献爱心大行动', // 分享标题
              desc: '与富通保险一起用行动「守护」，让每一个人都有机会追逐属于自己的「盛世」', // 分享描述
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://futong.1dospace.com/images/title.jpg', // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () { 
                  // 用户确认分享后执行的回调函数
                  self.goShare()
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
              }
          });
        })
        .catch(error => console.log(error))
      },
      goShare: function(){
        const self = this;
        console.log('goShare');
        self.shareStatus = true;
        self.showShare = false;
        self.showBg = true;
        self.showNoShare = false;
        self.line1Animate = true;
        setTimeout(()=>{
              self.line2Animate = true;
        }, 500)
        setTimeout(()=>{
              self.line3Animate = true;
        }, 1000)
        setTimeout(()=>{
              self.line4Animate = true;
        }, 1200)
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
                    if(self.from && self.from==='takePicture') {
                        self.showMyplay = true;
                        self.showzan = true;
                    } else{
                        self.showBack = true
                        self.showzan = true;
                    }
                } else {
                    if(self.from && self.from==='takePicture') {
                      self.showoption = true;
                    } else{
                        self.showBack = true
                        self.showzan = true;
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
      goNoShare: function() {
        this.$router.push({path: '/page10'})
      },
      goHome: function(){
        this.$router.push({path: '/'})
      },
      showShareApp: function(){
        this.showShare = true;
        this.showBg = true;
        this.showoption = false;
        this.showNoShare = true;
      }
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

.bg-scale{
  position: relative;
  animation: bg-in  1.5s;
  animation-fill-mode: forwards;
}
.word-scale{
  position: relative;
  animation: anit-in  1.5s;
  animation-fill-mode: forwards;
}
.bottom-line{
  position: relative;
  animation: bottom-in  1.5s;
  animation-fill-mode: forwards;
}
.img-scale{
  position: relative;
  animation: img-in  1.5s infinite;
}
@keyframes img-in {
  0% {
    transform: scale(1,1);
  }
  50%{
    transform: scale(1.2,1.2);
  }
  100% {
    transform: scale(1,1);
  }
}
@keyframes anit-in {
  0% {
    transform: scale(1,1);
  }
  50%{
    transform: scale(1.2,1.2);
  }
  100% {
    transform: scale(1,1);
  }
}

@keyframes bg-in {
  0% {
    transform: scale(0.5,0.5);
  }
  50%{
    transform: scale(1.2,1.2);
  }
  100% {
    transform: scale(1,1);
  }
}

@keyframes top-in {
  0% {
    transform: translateY(-30vw);
    opacity: 0;
  }
  50%{
    transform: translateY(10vw);
    opacity: 1;
  }
  100% {
    transform: translateY(0vw);
    opacity: 1;
  }
}
@keyframes bottom-in {
  0% {
    transform: translateY(30vw);
    opacity: 0;
  }
  100% {
    transform: translateY(0vw);
    opacity: 1;
  }
}
.hearts{
  width: 3rem;
    height: 3rem;
    text-align: center;
    line-height:3rem;
    position: absolute;
    right: 0;
    border-radius: 3rem;
    background: #2A2B2C;
}
</style>