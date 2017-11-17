<template>
  <div class="page-content">
  <playMusic ref="audio"  />
  <transition  :name="transitionName" :mode="transModule" >
    <router-view class="view"></router-view>
  </transition>
  </div>
</template>
<script>
import Service from '@/util/service'
import H from './util/history.js'
import playMusic from '@/components/playMusic'
import 'animate.css'
import wx from 'weixin-js-sdk'
console.log(H.history)
export default {
  data () {
    return {
      msg: 'Hello Vue!',
      selected: 'first',
      active: '',
      transitionName: 'slide-fade',
      transModule: 'out-in',
      historyRoute: H.history,
      showBar: false,
      totitle: '',
      fromtitle: '',
      transName: {},
      scrolled: false,
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter', to, from, next)
  },
  beforeCreate: function () {
  },
  beforeMount: function () {
    console.log('调用了beforeMount钩子函数')
    this.playmusic()
  },
  mounted: function () {
    console.log('调用了mounted钩子函数')
    this.playmusic()
  },
  watch: {
    '$route' (to, from) {
      let Toresult = this.inarray(this.historyRoute, to.path)
      let Fromresult = this.inarray(this.historyRoute, from.path)
      if (Toresult.status === false) {
        this.historyRoute.push({'path': to.path})
      }
      // console.log(to, from, Toresult, this.historyRoute)
      this.totitle = to.name
      this.fromtitle = from.name
      this.transitionName = Toresult.status ? 'slide-left' : 'slide-fade'
      if (Toresult.index >= Fromresult.index) {
        this.transitionName = 'slide-fade'
        this.transModule = 'out-in'
        this.transName.enter = 'animated fadeInRight'
        this.transName.leave = 'animated fadeOutLeft'
      } else {
        this.transitionName = 'slide-left'
        this.transName.enter = 'animated fadeInLeft'
        this.transName.leave = 'animated fadeOutRight'
      }
      if (to.name === 'home') {
        this.showBar = false
      }
      console.log(this.transitionName)
      document.body.scrollTop=0
    }
  },
  created: function () {
    const self = this;
    window.addEventListener('scroll', this.handleScroll)
    let msg = localStorage.getItem("FTL_user");
    if(msg){
      console.log(msg)
    }else{
      let tmp_name = (Date.parse(new Date())/1000);
      let userid = tmp_name + '_' + (Math.round(Math.random()*9999));
      let username = 'FTLsuser_' + this.randomString(9)
      localStorage.setItem("FTL_user",username);
      localStorage.setItem("FTL_user_id",userid);
      this.register(userid, username);
    }
    setTimeout(()=>{
      const myVid = self.$refs.audio;
      myVid.playmusic();
    },2000)
    this.playmusic()
    // this.getSign();
    
  },
  methods: {
    inarray: function (arr, item) {
      let status = {}
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].path === item) {
          status = {'status': true, 'index': i}
          break
        }
        if (i === (arr.length - 1)) {
          status = {'status': false, 'index': i}
        }
      }
      if (arr.length === 0) {
        status = {'status': false, 'index': 0}
      }
      return status
    },
    scroll: function () {
      console.log('123')
    },
    handleScroll:function () {
      // console.log(window.scrollY)
      if (window.scrollY > 30) {
        this.showBar = true
      } else {
        this.showBar = false
      }
    },
    randomString :function(len) {
      len = len || 32;
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      let maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    register: function (userid, username) {
      const self = this;
      let reqbody={
        "userid":userid,
        "username":username,
      }
      Service.Post('users/register',reqbody)
      .then(resp => {
          console.log(resp,resp.respBody)
      })
      .catch(error => console.log(error));
    },
    playmusic: function () {
      const self = this;
      const myVid = self.$refs.audio;
      if (window.WeixinJSBridge) {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                myVid.playmusic();
            }, false);
        } else {
            document.addEventListener("WeixinJSBridgeReady", function () {
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    myVid.playmusic();
                });
            }, false);
        }
    },
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
            const myVid = self.$refs.audio;
            myVid.playmusic();
          });

          wx.error(function(res){

            console.log('wx err',res);

            //可以更新签名
          });
        })
        .catch(error => console.log(error))
      },
  },
  components: {
    playMusic
  }
}
</script>
<style>
body {
  font-family: Helvetica, sans-serif;
  -webkit-overflow-scrolling: touch;
}
a{text-decoration: blink;}
.slide-fade-enter-active {
  animation: bounce-in 0.15s ease;
}

.slide-fade-leave-active {
  animation: bounce-out 0.15s ease;
}

@keyframes bounce-in {
  0% {
    /* transform: translateY(800px); */
    transform: translateX(100vw);
  }
  100% {
    /* transform: translateY(0px); */
    transform: translateX(0vw);
  }
}
@keyframes bounce-out {
  0% {
    /* transform: translateY(0px); */
    transform: translateX(0vw);
  }
  100% {
    /* transform: translateY(-800px); */
    transform: translateX(-100vw);
  }
}
@keyframes pounce-in {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes pounce-out {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(800px);
  }
}

.slide-left-enter-active {
  animation: pounce-in 0.15s ease;
}
.slide-left-leave-active {
  animation: pounce-out 0.15s ease;
}
.slide-left-enter, .slide-left-leave-active {
  opacity: 1;
}

</style>
