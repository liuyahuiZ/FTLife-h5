<template>
<div class="main-home relative bg-show">
    <div class="box-flex relative flex-direction-column zindex-10" v-show="!showImgBox">
      <div class="width-100 relative">
        <img src="../Img/takeText_top.png" class="width-60">
        <img src="../Img/takeText_logo.png" class="width-30">
      </div>
      <div class="width-70 box-flex text-align-center font-size-12 line-heightr-3 relative margin-left-15 margin-top-3r margin-bottom-1">
        <div class="width-50 bg-show textcolor-EF3F24 margin-right-1" :class="{ 'bg-ea3f21-r9 textclolor-white': isActive=== 'shs' }" @click="setActive('shs')">盛世</div>
        <div class="width-50 bg-show textcolor-EF3F24" :class="{ 'bg-ea3f21-r9 textclolor-white': isActive=== 'sh' }" @click="setActive('sh')">
          <span v-show="fontType==='jian'">守护</span>
          <span v-show="fontType==='fan'">守護</span>
        </div>
      </div>
      <div class="bg-ea3f21-r9 relative width-70 margin-left-15 textclolor-white font-size-8 padding-1m ">
          <textarea class="width-100 heightr-9 font-size-12" v-model="textInfo" />
          <img src="../Img/change.png" class="absolute widthr-4 top-9r right-1r" @click="changeWrod()"/>
          <div class="margin-top-2">1.选择盛世或者守护</div>
          <div>2.选择或者输入你想要合成的文字</div>
          <div>3.点击拍照按钮选择你想要合成的照片</div>
      </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r">
        <div class="width-100 textclolor-white margin-bottom-3 font-size-8 ">上传或者立刻拍摄你的“盛世”、“守护”时刻</div>
        <img src="../Img/action.png" class="width-20 relative" @click="EditImg" :class="{ 'takepic-animate': line4Animate, 'takepic-deful':!line4Animate }"/>
    </div>
    <img src="../Img/takeText_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
    <div align="center" class="main-screen" v-show="!showImgBox" ref="mainScreen">
        <img class="photo-img" ref="selectImg" v-bind:src="(selectImgSrc)" @click='EditImg' alt="" />
        <img src="../Img/pic_hover.png" class="hover-img">
        <div class="absolute bottom-28 width-100 zindex-100 text-align-left textclolor-white padding-1m">
          <div class="font-size-12">我的{{textTitle}}</div>
          <div>{{textInfo}}</div>
        </div>
    </div>
    <div id="imgBox" class="imgBox zindex-100" v-show="showImgBox">
      <img v-bind:src="(imgBox)"/>
    </div>
    <div class="options">
      <input id="hideenInput" class="hideenInput" type="file" accept="image/*" @change="inputChange"  ref="hideenInput" />
    </div>
    <div class="loadings" v-show="showLoading">
      <div class="text-align-center zindex-200 textclolor-white">图片生成中...</div>
      <vue-loading type="cylon" color="#fff" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>
    <div class="black-bg zindex-110" v-show="showLoading" />
</div>
</template>
<script>
import Service from '@/util/service'
import configs from '@/util/configs'
import '@/util/canvas2image'
import EXIF from'@/util/exif'
import vueLoading from 'vue-loading-template'

export default {
  data () {
    return {
      config: configs.config,
      selectImgSrc: '',
      imgBox: '',
      showImgBox: false,
      Orientation: null,
      textTitle: '盛世',
      textInfo: '盛世胸懷成就心，富過三代可成真',
      showLoading: false,
      isActive: 'shs',
      fontType: localStorage.getItem('fontType')!==null?localStorage.getItem('fontType') : 'jian',
      line4Animate: false,
      SHwordArr: {
        'fan': ['守護心常伴左右，健康人生由您擁有','無懼心是一份信任，來自無微不至的守護','讓您無憂開拓健康未來才是真守護','呵護一生才是真守護','守護您，讓人生不留遺憾'],
        'jian': ['守护心常伴左右，健康人生由您拥有','无惧心是一份信任，来自无微不至的守护','让您无忧开拓健康未来才是真守护','呵护一生才是真守护','守护您，让人生不留遗憾']
      },
      SHSwordArr: {
        'fan': ['盛世胸懷成就心，富過三代可成真','傳承不止於財富，更是造就盛世的家族心','盛世人生，代代相傳','富過三代才是真傳承','有一種盛世叫傳承'],
        'jian': ['盛世胸怀成就心，富过三代可成真','传承不止于财富，更是造就盛世的家族心','盛世人生，代代相传','富过三代才是真传承','有一种盛世叫传承']
      }
    }
  },
  watch: {
  },
  beforeCreate: function () {
      //console.log('beforeCreate is triggered.')
  },
  created: function(){
    let msg = localStorage.getItem("wetalks_user");
    console.log(msg)
    const that = this;
    setTimeout(()=>{
          that.line4Animate = true;
    }, 1500)
  },
  components: {
      vueLoading
  },
  methods: {
    EditImg: function() {
        this.$refs.hideenInput.click();
    },
    inputChange:function() {
      let file = this.$refs.hideenInput.files[0];
      let self = this;
      if (file) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (event) {
          self.selectImgSrc = event.target.result;
        };
        EXIF.getData(file, function() {
          // alert(EXIF.pretty(this));
          EXIF.getAllTags(this);
          //alert(EXIF.getTag(this, 'Orientation'));
          self.Orientation = EXIF.getTag(this, 'Orientation');
          //return;
          self.draw();
        });
      }
    },
    convertBase64UrlToBlob(urlData) {
      const bytes = window.atob(urlData.split(',')[1]);        // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      const ab = new ArrayBuffer(bytes.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
    },
    draw(fn) {
      this.showImgBox = true;
      let self = this;
      var data1= new Array();
      var _width = 375;
      var _height = 600;
      let images = this.$refs.mainScreen.querySelectorAll('img');
      for(var i=0;i<images.length;i++){
          data1[i]=images[i].src;
      }
      let c = document.createElement('canvas');
      let ctx=c.getContext('2d');
      let len=data1.length;
      c.width=_width;
      c.height=_height;
      ctx.rect(0,0,c.width,c.height);
      ctx.fillStyle='transparent';//画布填充颜色
      ctx.fill();
      function drawing(n){
        //获取照片方向角属性，用户旋转控制
          if(n<len){
              var img=new Image;
              //img.crossOrigin = 'Anonymous'; //解决跨域
              img.src=data1[n];
              img.onload=function(){
                  if(navigator.userAgent.match(/iphone/i)){
                    if(self.Orientation === 6){
                      if(n===0) {
                        // alert('需要顺时针（向左）90度旋转');
                        ctx.rotate(90 * Math.PI / 180);
                        ctx.drawImage(img, 0, -_width, _height, _width);
                      } else if(n===1){
                        // alert('文字框需要顺时针（向左）270度旋转');
                        ctx.rotate(270 * Math.PI / 180);
                        ctx.drawImage(img,0,0,_width, _height);
                      }
                    } else {
                      ctx.drawImage(img,0,0,_width,_height);
                    }
                  } else{
                    ctx.drawImage(img,0,0,_width,_height);
                  }

                  drawing(n+1);//递归
              }
          }else{
            //保存生成作品图片
            let info = '我的'+self.textTitle;
            ctx.font="19px Verdana";
            // 用渐变填色
            ctx.fillStyle='#fff';

            ctx.fillText(info,20,430);

            let text = self.textInfo;
            ctx.font="15px Verdana";
            // 用渐变填色
            ctx.fillStyle='#fff';

            ctx.fillText(text,20,460);
            self.convertCanvasToImage(c);
            // Canvas2Image.saveAsJPEG(c); //保存到电脑
          }
      }
      drawing(0);
    },
    convertCanvasToImage(canvas) {
      this.imgBox = canvas.toDataURL("image/png");
      const newfile = this.convertBase64UrlToBlob(canvas.toDataURL("image/png"));
      this.updateFile(newfile);
    },
    updateFile(file) {
      const self = this;
      const data = new FormData();
      const userid = localStorage.getItem("FTL_user_id");
      data.append('file', file);
      data.append('userid', userid);
      // fetch('http://localhost:2019/files/fileUp', {
      //   method: 'POST',
      //   'Content-Type': 'multipart/form-data',
      //   body: data
      // }).then((result)=>{
      //   console.log(result);
      // });
      self.showLoading= true;
      Service.FileUP(data).then(resp => {
        console.log(resp.respBody); //userid
        const id= resp.respBody._id
        self.showLoading = false;
        setTimeout(()=>{
          self.$router.push({path: '/pictureDetail/'+id+'/takePicture' })
        },1000)
      })
      .catch(error => {console.log(error); self.showLoading = false;})
    },
    getMore: function(){
      this.$router.push({path: '/workList'})
    },
    setActive: function(wod) {
      this.isActive= wod;
      if(wod==='shs'){
        this.textTitle='盛世';
      } else{
        this.textTitle='守护';
      }
    },
    changeWrod: function() {
      console.log(this.isActive);
      if(this.isActive==='shs'){
        this.textInfo= this.SHSwordArr[this.fontType][Math.round(Math.random()*4)]
      } else{
        this.textInfo= this.SHwordArr[this.fontType][Math.round(Math.random()*4)]
      }
      
    }
  }
}
</script>
<style>
.loadings{
  position: absolute;
    top: 50%;
    z-index: 120;
    left: 50%;
    transform: translate(-50%,-50%);
}
.takepic-animate{
    animation: anit-in  1.5s infinite;
}
.takepic-deful{
   animation: anit-out  1.5s infinite;
}
 .p1-line-animate{
  position: relative;
  animation: right-in  1.5s;
  animation-fill-mode: forwards;
}
.p1-pic-animate{
  position: relative;
  animation: left-in  1.5s;
  animation-fill-mode: forwards;
}
.left-logo{
  position: relative;
  animation: top-in  1.5s;
  animation-fill-mode: forwards;
}
.right-logo{
  animation: right-in  1.5s;
  animation-fill-mode: forwards;
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
@keyframes anit-out {
  0% {
    transform: scale(0.1,0.1);
  }
  50%{
    transform: scale(0.4,0.4);
  }
  100% {
    transform: scale(1,1);
  }
}
 @keyframes right-in {
  0% {
    transform: translateX(30vw);
    opacity: 0;
  }
  50%{
    transform: translateX(-10vw);
    opacity: 1;
  }
  100% {
    transform: translateX(0vw);
    opacity: 1;
  }
}

@keyframes left-in {
  0% {
    transform: translateX(-30vw);
    opacity: 0;
  }
  50%{
    transform: translateX(10vw);
    opacity: 1;
  }
  100% {
    transform: translateX(0vw);
    opacity: 1;
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
</style>

