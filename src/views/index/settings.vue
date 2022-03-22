<template>
  <div class="p-5">

    <el-form ref="form" :model="form" label-width="100px">
      <label>一般設定</label>
      <el-row>
        <el-col :span="16" :offset="3">

          <el-form-item label="使用者名稱" class="align-left">
            <el-input v-model="form.name" @blur="update('form')"></el-input>
          </el-form-item>

          <el-form-item label="電子郵箱" class="align-left">
            <el-input v-model="form.email"></el-input>
          </el-form-item>


          <el-form-item label="密碼">
            <el-button type="danger" @click="dialogPasswordVisible = true">修改密碼</el-button>
          </el-form-item>

        </el-col>

      </el-row>
      <label>綁定通知方式</label>
      <el-row class="mt-3">
        <el-col :span="7" class="text-right">
          <p class="m-1">
<!--            <i class="fa fa-telegram" style="font-size: 22px;color: #52a8e5"></i>-->
            <font-awesome-icon :icon="['fab', 'telegram']" style="font-size: 22px;color: #52a8e5"/>
            <span class="ml-1">TELEGRAM(<span v-if="bindStatus" style='color: red'>綁定中</span><span
                v-else>未綁定</span>)</span>
          </p>
        </el-col>

        <el-col :span="14" class="ml-2">
          <p v-if="bindStatus">
            <el-button type="danger" @click="open">取消綁定</el-button>
          </p>

          <p v-else>
            <el-button type="info" style="" @click="dialogTGVisible=true">點擊綁定</el-button>
          </p>

        </el-col>
      </el-row>
    </el-form>

    <el-dialog
        title="修改密碼"
        width="60%"
        :center="true"
        :visible.sync="dialogPasswordVisible"
        @close="handleClose('ruleForm')"
    >

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="center">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>


    </el-dialog>


    <el-dialog
        title="綁定TG說明"
        width="60%"
        :visible.sync="dialogTGVisible"
        :center="true"
        @close="loading=false,token=''"
    >

      <p>1. 打開連結機器人<a href="https://t.me/MarioNews_bot" target="_blank">@MarioNews_bot</a></p>
      <p>2. 輸入驗證碼進行驗證</p>

      <p class="ml-3">
        <el-button type="primary" :loading="loading" @click="getToken()">獲取驗證碼</el-button>
        <span class="red">{{ token }}</span></p>


    </el-dialog>

  </div>

</template>

<script>
import {
  getUserProfile,
  updateUserProfile,
  getBindToken,
  updateResetPassword,
  updateResetTelegram
} from '@/api/common'


export default {


  name: "settings",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: '',
      },
      dialogPasswordVisible: false,
      dialogTGVisible: false,
      ruleForm: {},
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      },
      loading: false,
      token: '',
      bindStatus: ''
    }
  },
  mounted() {
    getUserProfile().then((res => {
      console.log(res)
      this.form = res
      this.bindStatus = res.telegram
    }))


  },
  methods: {
    update(formName) {
      const form = this.$refs[formName]

      form.validate((valid) => {
        if (valid) {
          // console.log(valid)
          // console.log(form)
          updateUserProfile(this.form).then((res) => {
            console.log(res)
            this.$message.success('修改成功')
          })

        } else {
          console.log('error')
          return false
        }
      })

      // updateUserProfile()
    },
    getToken() {
      this.loading = true

      getBindToken().then((res) => {
        console.log(res)
        this.token = res.token
      })
    },
    submitForm(formName) {
      const form = this.$refs[formName]

      form.validate((valid) => {
        if (valid) {
          // console.log(valid)
          // console.log(form)
          updateResetPassword(this.ruleForm)
              .then((res) => {
                console.log(res)
                this.$message.success(res.message)
                this.dialogPasswordVisible = false
              })
              .catch((res) => {
                console.log(res)
                this.$message.error(res.message)
              })


        } else {
          console.log('error')
          return false
        }
      })

    },
    handleClose(formName) {
      console.log('close')
      this.$refs[formName].resetFields();
    },
    open() {
      this.$confirm('此操作將取消綁定TG訂閱服務, 是否繼續?', '取消綁定', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        updateResetTelegram()
            .then((res) => {
                  this.$message({
                    type: 'success',
                    message: res.message
                  });
                  this.bindStatus = false;
                }
            )
      }).catch(() => {
        // console.log('catch')
      });
    }

  }
}
</script>

<style scoped>

</style>