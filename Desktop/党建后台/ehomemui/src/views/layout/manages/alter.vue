<template>
        <div class="main">
          <!--status-icon :rules="rules2" -->
          <el-form :model="ruleForm2"
                   ref="ruleForm2"
                   label-width="100px"
                   class="demo"
                   :rules="rules"
                   :label-position= "left"
          >
            <el-form-item  prop="username">
              <h2>修改管理员信息</h2>
            </el-form-item>
            <el-form-item label="头像：">
              <UploadImg class="avatar" v-on:getImg="getImg"  :imgurls="this.ruleForm2.avatar"></UploadImg>
            </el-form-item>
            <el-form-item label="账号:" prop="username">
              <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
            </el-form-item>
            <!--<el-form-item label="确认密码:" prop="checkPass">-->
            <!--<el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="昵称:" prop="nickname">
              <el-input type="text" v-model="ruleForm2.nickname" autocomplete="off"
                        required="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
              <el-input type="text" v-model="ruleForm2.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作类型：">
              <el-select v-model="ruleForm2.job" placeholder="请选择工作类型">
                <el-option
                  v-for="item in job"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select v-model="ruleForm2.sex" placeholder="请选择性别">
                <el-option
                  v-for="item in sex"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人介绍:" prop="desc">
              <el-input type="text" v-model="ruleForm2.desc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
<script>
  import UploadImg from '../../../components/uploadImg/upload'
    export default {
        components: {
          UploadImg
        },
        data() {
            return {
              left:'left',
              ruleForm2: {
                username:'',
                pass: '',
                checkPass: '',
                nickname:'',
                desc:'2',
                phone:'',
                avatar:'',
                sex:0,
                job:3,
              },
              job: [{
                value: 0,
                label: '医生'
              }, {
                value: 1,
                label: '军人'
              }, {
                value: 2,
                label: '教师'
              }, {
                value: 3,
                label: '程序猿'
              }, {
                value: 4,
                label: '律师'
              }],
              sex:[{
                value: 0,
                label: '男'
              }, {
                value: 1,
                label: '女'
              }],
              rules:{
                username: [
                  { required: true, message: '请输入账号', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符之间', trigger: 'blur' }
                ],
                password:[
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { min: 6, max: 12, message: '长度在 6 到 12个字符之间', trigger: 'blur' }
                ],
                nickname:[
                  { required: true, message: '请输入昵称', trigger: 'blur' },
                  { min: 2, max: 20, message: '长度在4到 20个字符之间', trigger: 'blur' }
                ],
                phone:[
                  { required: true, message: '请输入手机号码', trigger: 'blur' },
                  { min:11 , max: 11, message: '长度为11位数字', trigger: 'blur' }
                ]
              }
            }
        },
        methods: {
            getData(){
              let id =this.$route.query.Id
              this.$axios.get(`/admin/user/${id}`).then(res=>{
                this. ruleForm2=res.data.data
              })
            },
            getImg(url){
               this.ruleForm2.avatar=url
            },
           submitForm(){
              // let id = this.$route.query.Id
              this.$axios.patch(`/admin/user/update`,this.ruleForm2).then(res=>{
                if(res.code===200){
                 this.$message.success(res.msg)
                }else {
                  this.$message.error(res.msg)
                }
          })},
              resetForm(formName){
              this.$refs[formName].resetFields();}
        },
        created() {
            this.getData()
        }

    }
</script>

<style scoped lang="scss">
    .main {
      .demo{
        margin: 0 auto;
        width: 400px;
        h2{
          text-align: center;
        }
      }
    }
</style>
