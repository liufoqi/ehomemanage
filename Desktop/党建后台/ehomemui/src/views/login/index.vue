<template>
    <div class="main">
      <el-form :model="login"  label-width="100px" class="demo">
        <el-form-item>
          <h2>欢迎来到登录页面</h2>
        </el-form-item>
        <el-form-item label="账号">
          <el-input type="text" v-model="login.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button @click="register">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              login:{
                username:'',
                password:'',
              }
            }
        },
        methods: {
          submit() {
            this.$axios.post('/admin/user/login',this.login).then(res=>{
              console.log(res.user);

              if(res.code===200){
                this.$store.commit('CHANGE_user',res.user)
                this.$message.success(res.msg);
                this.$router.push('/index')
                console.log(this.$store.state.myUser)
              }else{
                this.$message.error(res.msg);
              }
            });
          },
          register() {
            this.login={}
          }
        },

    }
</script>

<style scoped lang="scss">

    .main {
      margin:150px  auto;
      text-align: center;
      .demo{
        margin: 0 auto;
        width: 360px;
        background: #61dafb;
        padding:0 60px 10px 0;
        border-radius: 15px;

      }
    }
</style>
