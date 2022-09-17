<template>
  <SourceUser v-if="username"></SourceUser>
  <SourceGuest v-else></SourceGuest>
</template>

<script>

import SourceGuest from "@/components/Source/SourceGuest";
import SourceUser from "@/components/Source/SourceUser";
import store from "@/store";

export default {
  name: "source",
  data() {
    return {
      username: ""
    };
  },
  components: {
    SourceGuest,
    SourceUser
  },
  mounted() {


  },
  created() {
    this.username = store.getters.username
  },
  methods: {

  }
}
</script>

<style scoped>

</style>