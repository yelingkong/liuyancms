<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">项目列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="名称" prop="title"> </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <!--                <el-table-column-->
        <!--                        label="类型"-->
        <!--                >-->
        <!--                    <template slot-scope="scope">-->
        <!--                        <span>{{scope.row.projecttype}}</span>-->
        <!--                    </template>-->
        <!--                </el-table-column>-->
        <el-table-column label="来源">
          <template slot-scope="scope">
            <span>{{ scope.row.source | filtersdata(sourcedata) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="框架">
          <template slot-scope="scope">
            <span>{{ scope.row.framework | filtersdata(frameworkdata) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time | filtersdate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.finish_time | filtersdate }}</span>
          </template>
        </el-table-column>
        <!--                <el-table-column-->
        <!--                        label="状态"-->
        <!--                >-->
        <!--                    <template slot-scope="scope">-->
        <!--                        <span>{{scope.row.status?'结束':'进行中'}}</span>-->
        <!--                    </template>-->
        <!--                </el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope)">编辑 </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope)">删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <book-edit v-else @editClose="editClose" :editBookID="editBookID"></book-edit>
  </div>
</template>

<script>
import moment from 'moment'
import project from '@/models/project'
import BookEdit from './ProjectEdit'
import framework from '@/models/framework'
import source from '@/models/source'

export default {
  components: {
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
      frameworkdata: [],
      sourcedata: [],
    }
  },
  async created() {
    this.loading = true
    await this.getData()
    await this.getFrameworks()
    await this.getSourcies()
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
    async getFrameworks() {
      try {
        const frameworks = await framework.getFrameworks()
        this.frameworkdata = frameworks
      } catch (error) {
        if (error.error_code === 10020) {
          this.frameworkdata = []
        }
      }
    },
    async getSourcies() {
      try {
        const data = await source.getSourcies()
        this.sourcedata = data
      } catch (error) {
        if (error.error_code === 10020) {
          this.sourcedata = []
        }
      }
    },
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
      console.log(val.row.id)
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
  filters: {
    filtersdata(data, datalist) {
      for (let i = 0; i < datalist.length; i++) {
        if (data === datalist[i].id) {
          return datalist[i].title
        }
      }
    },
    filtersdate(dates) {
      if (dates) {
        return moment(dates).format('YYYY-MM-DD')
      }
      return '进行中'
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
