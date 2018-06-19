<template>
  <div>
    <div>
      <span>用户列表</span>
      <div class="fr">
        <el-button @click="handleAdd" type="paymery">新增用户</el-button>  
      </div> 
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" v-if="scope.row.id !== 'admin'">
          <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
          <span>|</span>
          <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="mt-10 mb-10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <mdialog @successCBK="initTableList" ref="dialog"></mdialog>
  </div>
</template>

<script>
  import mdialog from './modules/dialog.vue'
  export default {
    components : {
      mdialog,
    },
    data() {
      return {
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
      }
    },
    mounted() {
      this.initTableList();
    },
    methods : {
      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/queryUserList.json',
          data : {
            pageSize : this.pageSize,
            currentPage : this.currentPage,
          },
        }).then((res) => {
          this.tableData = res.result.list;
          this.total = res.result.total;
        });
      },
      // 页数 change
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initTableList();
      },
      // 分页 change
      handleCurrentChange(val) {
        this.currentPage = val; 
        this.initTableList();
      },

      // 表格相关 end

      // 点击新增
      handleAdd() {
        this.$refs.dialog.show('add');
      },

      // 点击 修改
      handleEdit(row) {
        this.$refs.dialog.show('edit',row);
      },
      // 点击 删除
      handleDelete(row) {
        this.$confirm('确定删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/userDelete.json',
            data : {
              id : row.id,
            },
          }).then(() => {
            this.$message.success('删除成功');
            this.initTableList();
          });
        }).catch(() => {
        });
      },
    },
  }
</script>

<style scoped>

</style>