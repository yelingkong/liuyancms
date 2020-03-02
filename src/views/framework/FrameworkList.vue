<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">框架列表</div></div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"
      ></lin-table>
    </div>

    <!-- 编辑页面 -->
    <book-edit v-else @editClose="editClose" :editBookID="editBookID"></book-edit>
  </div>
</template>

<script>
import framework from '@/models/framework'
import LinTable from '@/components/base/table/lin-table'
import BookEdit from './FrameworkEdit'

export default {
  components: {
    LinTable,
    BookEdit,
  },
  data() {
    return {
      tableColumn: [{ prop: 'title', label: '框架' }],
      tableData: [],
      operate: [],
      showEdit: false,
      editBookID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getFrameworks()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        auth: '删除框架',
      },
    ]
    this.loading = false
  },
  methods: {
    async getFrameworks() {
      try {
        const frameworks = await framework.getFrameworks()
        this.tableData = frameworks
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editBookID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该框架, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await framework.delectFramework(val.row.id)
        if (res.error_code === 0) {
          this.getFrameworks()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getFrameworks()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
