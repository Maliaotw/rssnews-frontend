<template>

    <div>

        <el-form ref="form" :model="form" label-width="100px">
            <label></label>
            <el-row>
                <el-col :span="16" :offset="3">

                    <el-form-item label="用戶名" class="align-left" prop="username" :rules="rules.username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" class="align-left">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>

                    <el-form-item class="align-center">
                        <el-button type="primary" style="width: 100%" @click="signup">註冊</el-button>
                    </el-form-item>

                </el-col>

            </el-row>

        </el-form>

    </div>
</template>

<script>
    import VueCookie from 'vue-cookie'

    export default {
        name: 'Registrations',
        data() {
          var validateHostname = (rule, value, callback) => {
                console.log('chkname');
                if (value === '') {
                    callback(new Error('名稱不得為空'));
                } else {
                    this.$axios.get(`/api/v1/registrations/?name=${value}`,)
                        .then((response) => {
                            if (response.length !== 0) {
                                // console.log(`response.data ${response.data}`);
                                callback(new Error('用戶名已被使用'));
                            } else {
                                callback()
                            }
                        })

                }
            };
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                  username: [
                        {validator: validateHostname, trigger: 'blur'}
                    ],
                },
            }
        },

        methods: {
            reloadPage() {
                window.location.reload()
            },
            signup() {
                const data = {
                    username: this.form.username,
                    password: this.form.password
                }
                self = this
                this.$axios.post("/api/v1/registrations/", data)
                    .then((result) => {
                          console.log(result)
                          VueCookie.set('csrftoken', result.token, 14)
                          VueCookie.set('username', result.username, 14)
                          VueCookie.set('is_superuser', result.is_superuser, 14)
                          self.reloadPage()
                    })
            }
        },
        mounted() {


        },
        created() {
              const token = VueCookie.get('csrftoken')
              if (token) {
                  this.$router.push({name: 'home'})
              } else if (token === "") {
                  VueCookie.delete("csrftoken")
                  this.reloadPage()
              }

          }
    }
</script>

<style scoped>
    h1 {
        text-align: center;
        color: #606266;
    }

    form {
        padding: 20px;
        background: #fff;
        border-radius: 2px;
    }


</style>