<template>
  <div>
    <div class="dash" style="  width: 600px; text-align: left;">
      <div id="top-text">Active Passes</div>
      <PassApproval/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PassApproval from "@/home/PassApproval.vue";

export default {
  name: 'HomeView',
  components: {
    PassApproval,
  }
}
</script>

<style scoped>
.dash{
  width: auto;
  padding: 40px 100px;
  border-left: var(--borGrey);
  border-right: var(--borGrey);
}
</style>
