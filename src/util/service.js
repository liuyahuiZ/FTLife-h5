import '@/util/jquery.js'
import configs from '@/util/configs'
class Service {
  constructor(){
    Promise.prototype.finally = function (callback) {
    let P = this.constructor;
      return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      );
    };
    Promise.prototype.done = function (onFulfilled, onRejected) {
      this.then(onFulfilled, onRejected)
        .catch(function (reason) {
          // 抛出一个全局错误
          setTimeout(() => { throw reason }, 0);
        });
    };
  }
  Get(api,reqbody){
    //console.log(api,reqbody)
    return new Promise(function (resolve, reject) {
      $.ajax({
          url:'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.downWeb&songid=877578&bit=24&_t=1393123213'+api,
          type:'GET', //GET
          async:true,    //或false,是否异步
          data:reqbody,
          timeout:5000,    //超时时间
          dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
          beforeSend:function(xhr){
              // console.log(xhr)
              // console.log('发送前')
          },
          success:function(data,textStatus,jqXHR){
            //   console.log(data)
            //   console.log(textStatus)
            //   console.log(jqXHR)
              resolve(data)
          },
          error:function(xhr,textStatus){
              // console.log('错误')
            //   console.log(xhr)
            //   console.log(textStatus)
              reject(textStatus)
          },
          complete:function(){
              // console.log('结束')
          }
      })
    })
  }
  Post(api,reqbody){
    // console.log(api,reqbody)
    return new Promise(function (resolve, reject) {
      $.ajax({
          url:configs.config.apiHost+api,
          type:'POST', //GET
          async:true,    //或false,是否异步
          data:reqbody,
          timeout:5000,    //超时时间
          dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
          beforeSend:function(xhr){
            //   console.log(xhr)
              // console.log('发送前')
          },
          success:function(data,textStatus,jqXHR){
            //   console.log(data)
            //   console.log(textStatus)
            //   console.log(jqXHR)
              resolve(data)
          },
          error:function(xhr,textStatus){
            //   console.log('错误')
            //   console.log(xhr)
            //   console.log(textStatus)
              reject(textStatus)
          },
          complete:function(){
              // console.log('结束')
          }
      })
    })
  }
  FileUP(data){
    // fetch(configs.apiHost+'files/fileUp', {
    //   method: 'POST',
    //   'Content-Type': 'multipart/form-data',
    //   body: data
    // }).then((result)=>{
    //   console.log(result);
    // });
    return new Promise(function (resolve, reject) {
      $.ajax({
          url:configs.config.apiHost+configs.config.fileUp,
          type:'POST', //GET
          async:true,    //或false,是否异步
          data:data,
          processData : false, 
          contentType : false,
          beforeSend:function(xhr){
            //   console.log(xhr)
              // console.log('发送前')
          },
          success:function(data,textStatus,jqXHR){
            //   console.log(data)
            //   console.log(textStatus)
            //   console.log(jqXHR)
              resolve(data)
          },
          error:function(xhr,textStatus){
            //   console.log('错误')
            //   console.log(xhr)
            //   console.log(textStatus)
              reject(textStatus)
          },
          complete:function(){
              // console.log('结束')
          }
      })
    })
  }
}
export default Service= new Service
