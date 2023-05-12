<template>
  <div>
    <button @click="checkApproval">Check Approval</button>
    <div v-if="approvalStatus" class="success-message">{{ approvalStatus }}</div>
    <div v-else-if="unapprovedItems.length > 0" class="error-message">
      Pass is not fully approved. Unapproved items: {{ unapprovedItems.join(", ") }}
    </div>
    <div v-else class="error-message">Pass not found</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FetchForm',
  data() {
    return {
      passId: 'your-pass-id',
      approvalStatus: '',
      unapprovedItems: []
    };
  },
  methods: {
    checkApproval() {
      axios.get(`/check_approval/${this.passId}`)
        .then(response => {
          if (response.data.message === 'The pass is approved') {
            this.approvalStatus = response.data.message;
            this.unapprovedItems = [];

          } else if (response.data.message === 'The pass is not fully approved') {
            this.approvalStatus = '';
            this.unapprovedItems = response.data.unapprovedItems;
            
          } else {
            this.approvalStatus = '';
            this.unapprovedItems = [];
          }
        })
        .catch(error => {
          console.log(error);
          this.approvalStatus = '';
          this.unapprovedItems = [];
        });
    }
  }
}
</script>

<style scoped>
.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>


<style scoped>

</style>

