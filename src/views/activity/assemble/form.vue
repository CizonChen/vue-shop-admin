<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible"
             width="60%">
    <el-form ref="dataForm"
             :rules="rules"
             :model="formData"
             label-position="left"
             label-width="100px">
      <el-form-item label="活动名称"
                    prop="activityName">
        <el-input v-model="formData.activityName"
                  placeholder="请设置" />
      </el-form-item>
      <el-form-item label="活动图片"
                    prop="activityImg">
        <div style="margin-bottom: 20px;">
          <Upload v-model="formData.activityImg" />
        </div>
      </el-form-item>
      <el-form-item label="活动时间"
                    prop="timeRange">
        <el-date-picker v-model="formData.timeRange"
                        :default-time="['00:00:00', '23:59:59']"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        class="filter-item" />
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button v-permission="'ROLE_SUPER_ADMIN'"
                 type="primary"
                 @click="dialogStatus==='create'?createData():updateData()">确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { create, modify } from '@/api/activity/assemble'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission'
import Upload from '@/components/Upload/singleImage3'

export default {
  components: { Upload },
  directives: { waves, permission },
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogStatus: undefined,
      dialogFormVisible: false,
      rules: {
        activityName: [{ required: true, message: '活动标题不能为空', trigger: 'blur' }],
        activityImg: [{ required: true, message: '活动图片不能为空', trigger: 'blur' }],
        beginTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
        endTime: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {

    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.formData.createUser = this.$store.state.user.username
          this.formData.updateUser = this.$store.state.user.username
          create(this.formData).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogFormVisible = false
            this.$parent.getList()
          })
        }
      })
    },
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.formData)
          tempData.updateUser = this.$store.state.user.username
          modify(tempData).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogFormVisible = false
            this.$parent.getList()
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
