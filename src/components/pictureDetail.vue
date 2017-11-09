<template>
  <div id="pictureDetail">
    <div class="box-flex flex-direction-column" >
        <div class="padding-all masonry">
            <img class="images-con imgpic" v-bind:src="(config.api+picture._id)">
        </div>
        <div class="padding-all">赞数量: {{collect}}</div>
        <div class="padding-all" @click="doCreat">点赞</div>
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
    let reqbody={
        "id" : this.$route.params.id
    }
    Service.Post('files/ImageDetail',reqbody)
    .then(data => {
        console.log(data,data.respBody.data)
        this.picture = data.respBody.data[0]
    })
    .catch(error => console.log(error))
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
    // console.log('beforeCreate is triggered.')
  },
  methods: {
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
      }
  }
}
</script>