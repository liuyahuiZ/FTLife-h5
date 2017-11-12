<template>
<div class="main-home relative bg-show">
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
    <div class="absolute bottom-0 width-100 zindex-100 text-align-center padding-1m bg-000-r">
        <img src="../Img/action.png" class="width-20 relative" @click="EditImg"/>
    </div>
    <img src="../Img/takePicture_bg.jpg" class="absolute width-100 top-0 zindex-9"/>
</div>
</template>
<script>
import Service from '@/util/service'
import configs from '@/util/configs'
import '@/util/canvas2image'
import EXIF from'@/util/exif'

export default {
  data () {
    return {
      config: configs.config,
      selectImgSrc: '',
      imgBox: '',
      showImgBox: false,
      Orientation: null,
      textTitle: sessionStorage.type,
      textInfo: sessionStorage.text,
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
    
  },
  methods: {
    EditImg() {
        this.$refs.hideenInput.click();
    },
    inputChange() {
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
      var _height = 667;
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
                        alert('需要顺时针（向左）90度旋转');
                        ctx.rotate(90 * Math.PI / 180);
                        ctx.drawImage(img, 0, -_width, _height, _width);
                      } else if(n===1){
                        alert('文字框需要顺时针（向左）270度旋转');
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
            let info = '我的'+sessionStorage.getItem('type')
            ctx.font="19px Verdana";
            // 用渐变填色
            ctx.fillStyle='#fff';

            ctx.fillText(info,20,430);

            let text = sessionStorage.getItem('text')
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
      Service.FileUP(data).then(resp => {
        console.log(resp.respBody); //userid
        const id= resp.respBody._id
        setTimeout(()=>{
          self.$router.push({path: '/pictureDetail/'+id+'/takePicture' })
        },1000)
      })
      .catch(error => console.log(error))
    },
    getMore: function(){
      this.$router.push({path: '/workList'})
    },
    goNext: function(){
      this.$router.push({path: '/last'})
    }
  }
}
</script>
