<template>
    <div class="main">
      <label class="upload-wrap">
        <div v-if="!this.imgurl">
          <i class="el-icon-plus" v-if="!this.imgurls"></i>
          <img :src="this.imgurls" v-else>
          <input type="file" style="display:none" @change="upload">
        </div>
        <div v-else>
          <img :src="this.imgurl">
          <input type="file" style="display:none" @change="upload">
        </div>
      </label>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      props:{
        imgurls:String
        },
        data() {
            return {
              imgurl:'',
              token:''
            }
        },
        methods: {
          getToken(){
           this.$axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
            this.token=res.data.data;
             console.log(res.data.data)
               })
           },
        upload(event){
       let file = event.target.files[0];
       let formData = new FormData();
        formData.append('file',file,file.name);
        formData.append('token',this.token);
        axios.post('https://upload-z1.qiniup.com',formData,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }).then(res=>{
          if(res.data.url){
            this.imgurl=res.data.url;
            this.$message.success('获取图片成功！');
            console.log(res.data.url);
            this.$emit('getImg',res.data.url)
          }else{
            this.$message.error('上传图片失败，请再试一下！')
          }
        })

    }
    },
        created() {
            this.getToken()
        }

    }
</script>

<style scoped lang="scss">
    .main {
   .upload-wrap{
     position: relative;
     display: block;
     width: 100px;
     height: 100px;
     border: 1px solid #e8e8e8;
     border-radius:6px;
     cursor: pointer;
     .el-icon-plus{
       position: absolute;
       top:50%;
       left:50%;
       transform: translate(-50%,-50%);
     }
     img{
       width: 100px;
       height: 100px;
     }
   }
    }
</style>
