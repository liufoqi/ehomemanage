<template>
    <div class="main">
        <div class="header">
          导航栏
        </div>
          <div class="main">
              <el-menu
                background-color="#91d"
              >
                <el-submenu  index="1">
                    <template slot="title">管理员</template>
                  <router-link :to="{path:'/add'}">
                    <el-menu-item index="1-1">添加管理员</el-menu-item>
                  </router-link>
                  <router-link :to="{path:'/list'}">
                    <el-menu-item index="1-2">管理员列表</el-menu-item>
                  </router-link>
                  <router-link :to="{path:'/myAlter'}">
                    <el-menu-item index="1-3">修改个人信息</el-menu-item>
                  </router-link>
                </el-submenu>
              </el-menu>
            <el-menu
              background-color="#81d"
            >
              <el-submenu  index="2">
                <template slot="title">轮播图</template>
                <router-link :to="{path:'/addSwiper'}">
                  <el-menu-item index="1-4">添加轮播图</el-menu-item>
                </router-link>
                <el-menu-item index="1-5">轮播图列表</el-menu-item>
                <el-menu-item index="1-6">轮播图列表</el-menu-item>
              </el-submenu>
            </el-menu>
            <el-menu
              background-color="#81d"
            >
              <el-submenu  index="2">
                <template slot="title">新闻</template>
                <router-link :to="{path:'/addNew'}">
                  <el-menu-item index="1-4">添加新闻</el-menu-item>
                </router-link>
                <router-link :to="{path:'/newsList'}">
                  <el-menu-item index="1-5">新闻列表</el-menu-item>
                </router-link>
              </el-submenu>
            </el-menu>
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
        .header {
          border-bottom: 1.5px solid red;
           padding-bottom: 1.5vh;
        }
        .main {

        }
        .footer {

        }
    }
</style>
