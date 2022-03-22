<template>

    <div>

        <el-form ref="form" :model="form" label-width="100px">
            <label></label>
            <el-row>
                <el-col :span="16" :offset="3">

                    <el-form-item label="用戶名" class="align-left">
                        <el-input v-model="form.username" @blur="update('form')"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" class="align-left">
                        <el-input v-model="form.password" show-password></el-input>
                    </el-form-item>


                    <el-form-item class="align-center">
                        <el-button type="info" style="width: 100%" @click="login">登入</el-button>
                    </el-form-item>

                </el-col>

            </el-row>

        </el-form>

    </div>
</template>

<script>
    import VueCookie from 'vue-cookie'

    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            reloadPage() {
                window.location.reload()
            },
            login() {
                const data = {
                    username: this.form.username,
                    password: this.form.password
                }
                self = this
                this.$axios.post("/api/v1/api-token-auth/", data)
                    .then((result) => {
                        console.log(result)
                        VueCookie.set('csrftoken', result.token, 1)
                        VueCookie.set('username', result.username, 1)
                        this.reloadPage()
                    })
            }
        },
        mounted() {


        },
        created() {
            // if (this.$store.state.jwt) {
            //     // TODO 要在驗證一下
            //     console.log(this.$store.state.jwt)
            //     this.$router.push({name: 'Home'})
            // }
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