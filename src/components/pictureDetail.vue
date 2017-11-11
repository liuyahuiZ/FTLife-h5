<template>
  <div id="pictureDetail">
    <div class="box-flex flex-direction-column" >
        <div class="width-100">
            <img class="images-con imgpic" v-bind:src="(config.api+picture._id)">
        </div>
    </div>
    <div class="absolute top-0 right-1 width-100 zindex-200 text-align-right">
        <div class="padding-all">赞数量: {{collect}}</div>
        <div class="width-100">
            <img src="../Img/do_hert.png" class="width-10" @click="doCreat" />
        </div>
    </div>
    <div class="absolute bottom-0 width-100 zindex-200 text-align-center padding-1m bg-000-r">
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
      collect: 0
    }
  },
  components: {
  },
  beforeCreate: function () {
    console.log('beforeCreate is triggered.')
    let reqbodys={
        "fileid" : this.$route.params.id
    }
    Service.Post('collect/findCollects',reqbodys)
    .then(data => {
        console.log(data,data.respBody)
        this.collect = data.respBody.length
    })
    .catch(error => console.log(error))
  },
  created: function () {
      this.getPicture();
    // console.log('beforeCreate is triggered.')
  },
  methods: {
      getPicture: function() {
        const self = this;
        let reqbody={
        "id" : this.$route.params.id
        }
        Service.Post('files/ImageDetail',reqbody)
        .then(data => {
            console.log(data,data.respBody.data)
            self.picture = data.respBody.data[0]
        })
        .catch(error => console.log(error))
      },
      doCreat: function() {
        const userid = localStorage.getItem("FTL_user_id");
        let reqbody={
            "fileid" : this.$route.params.id,
            "userid" : userid
        }
        Service.Post('collect/createCollect',reqbody)
        .then(data => {
            console.log(data,data.respBody.data)
        })
        .catch(error => console.log(error))
      },
      goWorkList: function(){
          this.$router.push({path: '/workList'})
      }
  }
}
</script>