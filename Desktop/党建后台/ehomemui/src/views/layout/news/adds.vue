<template>
  <div class="main">
    <el-row class="warp">
      <el-col  class="warp-breadcrum">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{path:'/main'}"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item >编写新闻</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!--
      Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
      -->
      <h3>添加新闻</h3>
      <el-col  class="warp-main" >
        <el-form :model="news"  label-width="120px" label-position="left">
          <el-form-item label="新闻标题">
            <el-input v-model="news.title"></el-input>
          </el-form-item>
          <el-form-item  label="新闻分类">
          <el-select v-model="news.type" placeholder="请选择">
            <el-option
              v-for="item in category"
              :key="item.value"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item  label="作者">
            <el-select v-model="news.author" placeholder="请选择">
              <el-option
                v-for="item in author"
                :key="item.value"
                :label="item.nickname"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传新闻头图">
            <UploadImg v-on:getImg="getImg" :imgurls="news.img"></UploadImg>
          </el-form-item>
          <!--使用编辑器-->
          <el-form-item label="编辑新闻内容" :span="20" >
            <quill-editor
              v-model="news.content"
              ref="content"
              :options="editorOption"
              @change="onEditorChange($event)">
            </quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import UploadImg from '../../../components/uploadImg/upload'
  import {quillEditor, Quill} from 'vue-quill-editor'//调用编辑器
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
  export default {
    components:{
      UploadImg
    },
    data() {
      return {
        category:[],
        author:[],
        token:'',
        new:'',
        news:{
          title:'',
          content:'',
          contentText:'',
          img:'',
          author:'5bd690eb18c10b1d9c1da5ad',
          type:'5bd46398c1937816a4f20210',
          look_num:0,
        },
        editorOption:{
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              action:'https://upload-z1.qiniup.com',
              change: (xhr, formData) => {
                // xhr.setRequestHeader('myHeader','myValue')
                formData.append('token',this.token)
              },
              response:(res) => {
                return res.url
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }

        },

      }},
    //初始化
    mounted() {
      console.log('this is current quill instance object', this.myQuillEditor)
    },
    methods: {
      getData(){
        let id = this.$route.query.id;
        if(id){
          this.$axios.get(`/article/${id}`).then(res=>{
            console.log(res.data.data);
            this.news=res.data.data;
            this.news.type=res.data.data.type.title;
            this.news.author=res.data.data.author.nickname
          })
        }
        else{

        }
      },
      getCategory(){
        this.$axios.get('/article/category/list').then(res => {
          console.log(res.data.data);
          this.category = res.data.data
        })
      },
      getAuthor(){
        this.$axios.get('admin/user/list').then(res => {
          console.log(res.data.data);
          this.author = res.data.data
        })
      },
      getToken(){
        axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
          this.token=res.data.data;
          console.log(res.data.data)
        })
       },
      getImg:function(url){
        this.news.img= url;
        console.log(url)
      },
      //提交
       onSubmit() {
        this.$axios.post('/article',this.news).then(res=>{
          if(res.code===200){
            this.$message.success(res.msg)
          } else{
            this.$message.error(res.msg)
          }
        })
      },
      onEditorBlur(){//失去焦点事件

      },
        onEditorFocus(){//获得焦点事件

      },
        onEditorChange({quill,html,text}){//内容改变事件
          this.news.contentText = text
      }
    },
    created(){
         this.getCategory();
         this.getAuthor();
         this.getToken();
         this.getData();
    }
  }
</script>
<style scoped lang="scss">
  .main{
    margin-left: 20px;
    h3{
      text-align: center;
      height: 20px;
    }
    .warp-main{
      margin:0 20px;
      width: 90%;
    }
  }

</style>
