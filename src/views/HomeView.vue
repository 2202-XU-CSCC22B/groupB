<template>
  <div class="wrapper">
      <div class="dash">
        <div id="title">Active Passes</div>
      <PassApproval/>
    </div>
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

.dash{
  width: auto;
  padding: 40px 150px;
  border-left: 2px solid #ccccd3; 
  border-right: 2px solid #ccccd3; 
}

#title{
  font-family: var(--header);
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 5px;
}
</style>
