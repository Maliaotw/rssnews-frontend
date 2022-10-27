<template>
  <SourceAdmin v-if="is_superuser"></SourceAdmin>
  <SourceUser v-else-if="username"></SourceUser>
  <SourceGuest v-else></SourceGuest>
</template>

<script>

import SourceGuest from "@/components/Source/SourceGuest";
import SourceUser from "@/components/Source/SourceUser";
import SourceAdmin from "@/components/Source/SourceAdmin";
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
    SourceUser,
    SourceAdmin
  },
  mounted() {


  },
  created() {
    this.username = store.getters.username
    this.is_superuser = store.getters.is_superuser
  },
  methods: {

  }
}
</script>

<style scoped>

</style>