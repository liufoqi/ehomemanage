<template>
  <div class="main">
    <!--status-icon :rules="rules2" -->
    <el-form :model="swiper"
             ref="swiper"
             label-width="100px"
             class="demo"
             :label-position= "left"
    >
      <el-form-item  prop="username">
        <h2>添加轮播图</h2>
      </el-form-item>
      <el-form-item label="头像：">
        <UploadImg class="avatar" v-on:getImg="getImg"></UploadImg>
      </el-form-item>
      <el-form-item label="账号:" prop="username">
        <el-input type="text" v-model="swiper.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="swiper.password" autocomplete="off"></el-input>
      </el-form-item>
      <!--<el-form-item label="确认密码:" prop="checkPass">-->
      <!--<el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="昵称:" prop="nickname">
        <el-input type="text" v-model="swiper.nickname" autocomplete="off"
                  required="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话:" prop="phone">
        <el-input type="text" v-model="swiper.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!--<el-form-item label="工作类型：">-->
        <!--<el-select v-model="swiper.job" placeholder="请选择工作类型">-->
          <!--<el-option-->
            <!--v-for="item in job"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="轮播图介绍:" prop="desc">
        <el-input type="text" v-model="swiper.desc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import UploadImg from  '../../../components/uploadImg/upload'
  export default {
    components:{
      UploadImg,
    },
    data() {
      return {
        left:'left',
        swiper: {
          username: '1234',
          pass: '123456',
          checkPass: '',
          nickname: '111',
          desc: '2222222',
          phone: '11111111111',
          avatar: '',
          sex: 0,
          job: 3,
        },
      }
    },
        methods:{
          getImg: function (url) {
            this.swiper.avatar = url;
            console.log(url)
          },
          submitForm() {
            this.$axios.post('/admin/user', this.swiper).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.$router.push('/')
              } else {
                this.$message.error(res.msg);
              }
            });
          },
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
