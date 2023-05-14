<template>
  <div class="wrapper">
    <div id="title">Active Passes</div>
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

#title{
  font-family: var(--header);
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 5px;
}
</style>
