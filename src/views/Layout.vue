<template>
  <div class="content">
    <Header/>


    <el-main class="mt-2 white-bg" style="min-height: 400px">
      <router-view/>
    </el-main>

    <Footer class="mt-2"> </Footer>

  </div>

</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  components: {Header, Footer},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

.content {
  margin-right: auto;
  margin-left: auto;
  max-width: 680px;
  padding: 0 15px;
  margin-top: 20px;
  /*max-width: 1140px;*/

}

.el-main {
  padding: 0;

}

</style>
