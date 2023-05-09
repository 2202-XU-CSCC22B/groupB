<template>
<button @click="checkApproval">Check Approval</button>
<div v-if="approved" class="success-message">Pass has been approved!</div>
<div v-else class="error-message">Pass has been denied!</div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'FetchForm',
  methods: {
    checkApproval() {
      axios.get('/fetch-data')
      .then(response => {
          const data = response.data;
          const allApproved = data.every(doc => {
            return doc.ver.signed && doc.appr.every(item => item.approved) && doc.rcv.signed;
          });
          if (allApproved) {
            // Send a request to your server to mark the approval status as true
            axios.post('/mark-approved')
              .then(response => {
                // Handle the response
                this.approved = true;
              })
              .catch(error => {
                // Handle the error
                this.approved = false;
              });
          } else {
            this.approved = false;
          }
        })
        .catch(error => {
          // Handle the error
          this.approved = false;
        });
    }
  }
}
</script>

<style scoped>

</style>

