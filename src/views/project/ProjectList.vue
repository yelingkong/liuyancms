<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">框架列表</div>
      </div>
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
import project from '@/models/project'
import LinTable from '@/components/base/table/lin-table'
import BookEdit from './ProjectEdit'

export default {
  components: {
    LinTable,
    BookEdit,
  },
  data() {
    return {
      title: '',
      status: '',
      url: '',
      projecttype: '',
      framework: '',
      source: '',
      price: '',
      scale: '',
      tableColumn: [
        {
          prop: 'title',
          label: '名称',
        },
        {
          prop: 'price',
          label: '费用',
        },
        {
          prop: 'projecttype',
          label: '类型',
        },
        {
          prop: 'url',
          label: '地址',
        },
        {
          prop: 'framework',
          label: '框架',
        },
        {
          prop: 'source',
          label: '来源',
        },
        {
          prop: 'scale',
          label: '比例',
        },
        {
          prop: 'status',
          label: '状态',
        },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editBookID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getData()
    this.operate = [
      {
        name: '编辑',
        func: 'handleEdit',
        type: 'primary',
      },
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
    async getData() {
      try {
        const data = await project.getProjects()
        this.tableData = data
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
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await project.delectProject(val.row.id)
        if (res.error_code === 0) {
          this.getData()
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
      this.getData()
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
