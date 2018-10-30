<template>
    <div class="main">
      <el-table
        :data=" newsList"
        border
        style="width: 100%">
        <el-table-column
          label="头图"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="">
          </template>
        </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="120">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="发表时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="author.nickname"
          label="作者"
          width="80">
        </el-table-column>
        <el-table-column
          prop="type.title"
          label="新闻分类"
          width="100">
        </el-table-column>
        <el-table-column
          prop="look_num"
          label="阅读人数"
          width="80">
        </el-table-column>
        <el-table-column
          prop="contentText"
          label="简介"
          width="250">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
              newsList:[],
            }
        },
        methods: {
            getData() {
                this.$axios.get('/article').then(res=>{
                  console.log(res.data.data);
                  this.newsList=res.data.data
                })
            },
          handleEdit(id){
              this.$router.push(`/addNew?id=${id}`)
          },
          handleDelete(id){
             this.$axios.delete(`/article/${id}`).then(res=>{
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
      img{
        height: 90px;
        width: 90px;
      }
    }
</style>
