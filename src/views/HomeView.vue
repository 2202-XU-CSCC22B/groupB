<template>
  <div class="wrapper">
    <PassApproval/>
  </div>
</template>

<script>
// @ is an alias to /src
import PassApproval from "@/pass_appr/PassApproval.vue";

export default {
  name: 'HomeView',
  components: {
    PassApproval
  }
}
</script>

<style scoped>
.wrapper{
  margin: 0 auto;
}
</style>
