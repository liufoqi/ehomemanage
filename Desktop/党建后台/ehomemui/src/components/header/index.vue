<template>
    <div class="main">
      <div class="login" @click="handleLogin">返回登录</div>
        <div class="header">
          党建后台管理系统
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        methods: {
          handleLogin(){
            this.$router.push('/')
          }
        },
    }
</script>

<style scoped lang="scss">
    .main {
      font-size: 25px;
     .login{
       float:right;
       margin-right: 40px;
     }
    }
</style>
