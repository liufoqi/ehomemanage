<template>
    <div class="main">
      <el-row class="content">
        <el-col :span="4" class="left">
            <NavLeft></NavLeft>
        </el-col>
        <el-col :span="20">
          <div class="right-top">
            <Header></Header>
          </div>
          <div class="content">
            <router-view>
            </router-view>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Header from '../../components/header/index'
  import NavLeft from '../../components/navLeft/index'

    export default {
        components: {
          Header,
          NavLeft,
        },
        data() {
            return {}
        },
        methods: {
            getData() {

            }
        },
        created() {
            this.getData()
        }

    }
</script>

<style scoped lang="scss">
    .main {
      .content{
        height: 100%;
        .left{
          padding-top: 3vh;
          background: #c1d;
          height: 100%;
          text-align: center;
          a{
            text-underline: none;
          }

        }
        .right-top{
          padding-top: 3vh;
          height: 10%;
          background: #19d;
          font-size: 4vh;
          text-align: center;
        }
        .content{
          height: 90%;
        }

      }
    }
</style>
