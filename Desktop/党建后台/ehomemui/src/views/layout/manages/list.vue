<template>
    <div class="main">
      <h2>管理员列表</h2>
      <el-table
        :data="userList"
        border
        style="width:100%;text-align: center"
      >
        <el-table-column
          label="头像"
          width="80"
        >
          <template slot-scope="scope">
            <img :src="scope.row.avatar">
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="个人介绍"
          width="140"
        >
        </el-table-column>
        <el-table-column
          label="性别"
          width="60"
        >
          <template slot-scope="scope">
          <p  v-if="scope.row.sex===0">男</p>
          <p v-else>女</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="job"
          label="工作"
          width="80"
        >
          <template slot-scope="scope">
            <p  v-if="scope.row.job===0">医生</p>
            <p  v-else-if="scope.row.job===1">军人</p>
            <p  v-else-if="scope.row.job===2">教师</p>
            <p  v-else-if="scope.row.job===3">程序猿</p>
            <p v-else>律师</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="60"
        ><el-button type="text" size="small">男</el-button>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              userList:[],
            }
        },
        methods: {
            getData() {
                this.$axios.get('/admin/user/list').then(res=>{
                  console.log(res.data.data);
                  this.userList=res.data.data
                })
            },
            handleEdit(id){
             this.$router.push(`/alter?Id=${id}`)
          },
          handleDelete(id){
           this.$axios.delete(`/admin/user/${id}`).then(res=>{
             if(res.code===200){
               this.$message.success(res.msg)
               this.getData()
            }else{
               this.$message.error(res.msg)
             }
           })
          }
        },
        created() {
            this.getData()
        }

    }
</script>

<style scoped lang="scss">
    .main {
      margin: 20px;
      height:100%;
      h2 {
        text-align: center;
      }
      img{
        height: 60px;
        width: 60px;
      }
    }
</style>
