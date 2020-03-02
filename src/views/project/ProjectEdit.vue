<template>
  <div class="container">
    <div class="title">
      <span>修改项目</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="项目名称" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写名称"></el-input>
            </el-form-item>
            <el-form-item label="项目费用" prop="title">
              <el-input size="medium" v-model="form.price" placeholder="请填写费用"></el-input>
            </el-form-item>
            <el-form-item label="费用比例" prop="title">
              <el-input size="medium" v-model="form.scale" placeholder="请填写比例"></el-input>
            </el-form-item>
            <el-form-item label="项目来源" prop="title">
              <el-select size="medium" v-model="form.source" placeholder="请选择">
                <el-option v-for="item in sourcedata" :key="item.id" :label="item.title" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目框架" prop="title">
              <el-select size="medium" v-model="form.framework" placeholder="请选择">
                <el-option v-for="item in frameworkdata" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类型" prop="title">
              <el-select size="medium" v-model="form.projecttype" placeholder="请选择">
                <el-option v-for="item in frameworkdata" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目地址" prop="title">
              <el-input size="medium" v-model="form.url" placeholder="请填写地址"></el-input>
            </el-form-item>
            <el-form-item label="项目状态" prop="title">
              <el-switch v-model="form.status" active-color="#3963bc"> </el-switch>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import project from '@/models/project'
import framework from '@/models/framework'
import source from '@/models/source'

export default {
  props: {
    editBookID: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        title: '',
        status: '',
        url: '',
        projecttype: '',
        framework: '',
        source: '',
        price: '',
        scale: '',
      },
      frameworkdata: [],
      sourcedata: [],
    }
  },
  async mounted() {
    this.loading = true
    this.form = await project.getProject(this.editBookID)
    this.loading = false
    await this.getFrameworks()
    await this.getSourcies()
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
    async submitForm() {
      const res = await project.editProject(this.editBookID, this.form)
      if (res.error_code === 0) {
        this.$message.success(`${res.msg}`)
        this.$emit('editClose')
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
