<template>
  <div class="white-bg">
    <div class="app-container">
      <el-row>
        <el-col :span="18">
          <h2>NEWS</h2>
        </el-col>

        <el-col :span="6" class="text-right pl-2">
          <el-dropdown v-if="username">
                <span class="el-dropdown-link">
                    <p>{{ username }} <font-awesome-icon icon="user-circle"/></p>
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout"><font-awesome-icon icon="power-off"/> 登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


          <span v-else><a href="#/login">登入</a> / <a href="#/registrations/new">註冊</a></span>
        </el-col>
      </el-row>
    </div>

    <div class="">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          router
          :default-active="activeTag">
        <el-menu-item index="/home">新聞列表</el-menu-item>
        <el-menu-item index="/subscription" v-if="username">我的訂閱</el-menu-item>
        <el-menu-item index="/settings" v-if="username">個人設定</el-menu-item>
      </el-menu>

    </div>
  </div>
</template>

<script>
import store from '@/store'
import VueCookie from 'vue-cookie'

export default {
  data() {
    return {
      menu: "",
      activeTag: "",
      username: ""
    }
  },
  computed: {},
  methods: {
    logout() {
      console.log('logout')
      console.log(this.$route.path)
      VueCookie.delete('csrftoken')
      VueCookie.delete('username')
      this.$router.push({name: 'login'})
      window.location.reload()
    },


  },
  mounted() {
    // console.log('mounted')
  },
  created() {
    this.username = store.getters.username
    this.activeTag = this.$route.path

  }
}
</script>


<style>

</style>