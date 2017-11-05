<template>
<div class="home absolute bg-333">
    <div align="center" class="main-screen" v-show="!showImgBox" ref="mainScreen">
        <img class="photo-img" ref="selectImg" v-bind:src="(selectImgSrc)" @click='EditImg' alt="" />
        <img src="../Img/bg.png" class="hover-img">
        <input class="textInput" id="textInput" />
    </div>
    <!-- <div onClick="draw()" style="display:block;width: 100px;height:30px;background:'#999'; margin: 0 auto;" >
      一键合成
    </div> -->
    <div id="imgBox" class="imgBox" v-show="showImgBox">
      <img v-bind:src="(imgBox)"/>
      <div class="getMore" @click="getMore" v-show="showImgBox">查看更多</div>
    </div>
    <div class="options">
      <div class="addFile" @click='EditImg'>+</div>
      <input id="hideenInput" class="hideenInput" type="file" accept="image/*" @change="inputChange"  ref="hideenInput" />
    </div>
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
      Orientation: null
    }
  },
  watch: {
  },
  beforeCreate: function () {
      //console.log('beforeCreate is triggered.')
  },
  created: function(){
    let msg = localStorage.getItem("wetalks_user");
    if(msg){
      //console.log(msg)
    }else{
      let tmp_name = (Date.parse(new Date())/1000);
      let userid = 'wetalksuser-' + tmp_name + '-' + (Math.round(Math.random()*9999));
      let username = this.randomString(5)
      localStorage.setItem("wetalks_user",username);
      localStorage.setItem("wetalks_user_id",userid);
    }
  },
  methods: {
    randomString (len) {
      len = len || 32;
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      let maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
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
      var text = $('#textInput').val();
      console.log(text);
      this.showImgBox = true;
      let self = this;
      var data1= new Array();
      var _width = 337;
      var _height = 533;
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
            ctx.font="30px Verdana";
            // 用渐变填色
            ctx.fillStyle='#333';

            ctx.fillText(text,100,200);
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
      data.append('file', file);
      data.append('user', 'hubot');
      // fetch('http://localhost:2019/files/fileUp', {
      //   method: 'POST',
      //   'Content-Type': 'multipart/form-data',
      //   body: data
      // }).then((result)=>{
      //   console.log(result);
      // });
      Service.FileUP(data).then(resp => {
        console.log(resp);
      })
      .catch(error => console.log(error))
    },
    getMore(){
      this.$router.push({path: '/workList'})
    }
  }
}
</script>
