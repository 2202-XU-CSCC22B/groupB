<template>
  <div>
    <div class="dash" style="  width: 600px; text-align: left;">
      <h1>Active Passes</h1>
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
  border-left: 2px solid #ccccd3; 
  border-right: 2px solid #ccccd3; 
}
</style>
