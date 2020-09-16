<template>
  <div class="container">
    <div class="title">新增项目</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="项目名称" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写名称"></el-input>
            </el-form-item>
            <el-form-item label="项目费用" prop="title">
              <el-input size="medium" v-model="form.price" placeholder="请填写费用"></el-input>
            </el-form-item>
            <el-form-item label="开始日期" prop="title">
              <el-date-picker v-model="form.start_time" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="费用比例" prop="title">
              <el-input type="number" size="medium" v-model="form.scale" placeholder="请填写比例"></el-input>
            </el-form-item>
            <el-form-item label="项目来源" prop="title">
              <el-select size="medium" v-model="form.source" placeholder="请选择">
                <el-option v-for="item in sourcedata" :key="item.id" :label="item.title" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目框架" prop="title">
              <el-select size="medium" v-model="form.framework" placeholder="请选择">
                <el-option v-for="item in frameworkdata" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!--                        <el-form-item label="项目类型" prop="title">-->
            <!--                            <el-select size="medium" v-model="form.projecttype" placeholder="请选择">-->
            <!--                                <el-option v-for="item in frameworkdata" :key="item.id" :label="item.title"-->
            <!--                                           :value="item.id">-->
            <!--                                </el-option>-->
            <!--                            </el-select>-->
            <!--                        </el-form-item>-->
            <el-form-item label="项目地址" prop="title">
              <el-input size="medium" v-model="form.url" placeholder="请填写地址"></el-input>
            </el-form-item>
            <!--                        <el-form-item label="项目状态" prop="title">-->
            <!--                            <el-switch v-model="form.status" active-color="#3963bc"></el-switch>-->
            <!--                        </el-form-item>-->
            <el-form-item label="结束日期" prop="title">
              <el-date-picker v-model="form.finish_time" type="date" placeholder="选择日期"></el-date-picker>
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
  data() {
    return {
      form: {
        title: '',
        status: false,
        url: '',
        projecttype: '',
        framework: '',
        source: '',
        price: '',
        scale: 1,
        finish_time: '',
        start_time: '',
      },
      frameworkdata: [],
      sourcedata: [],
    }
  },
  async created() {
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
    async submitForm(formName) {
      try {
        const res = await project.addProject(this.form)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.$message.error(error.data.msg)
        console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
