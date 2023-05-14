<template>
  <div>
    <div v-for="pass in passes" :key="pass._id">
      <div class="james">
        <div id="id">{{ pass._id }}</div>
        <div>{{ pass.remarks }}</div>
        <div>{{ pass.nature }}</div>
        <br>
        <div v-if="approvalStatus" class="success-message">{{ pass.approvalStatus }}</div>
        <div v-else-if="pass.unapprovedItems.length > 0" class="error-message">
          Pass is not fully approved.<br>Unapproved items: {{ pass.unapprovedItems.join(", ") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axinst from '@/../server/axios-config.js';

export default {
  name: 'PassApproval',
  data() {
    return {
      passes: []
    };
  },
  methods: {
    checkApproval(pass) {
      axinst.get(`/check_approval/${pass._id}`)
        .then(response => {
          if (response.data.message === 'The pass is approved') {
            pass.approvalStatus = response.data.message;
            pass.unapprovedItems = [];
          } else if (response.data.message === 'The pass is not fully approved') {
            pass.approvalStatus = '';
            pass.unapprovedItems = response.data.unapprovedItems;
          } else {
            pass.approvalStatus = '';
            pass.unapprovedItems = [];
          }
        })
        .catch(error => {
          console.log(error);
          pass.approvalStatus = '';
          pass.unapprovedItems = [];
        });
    },
    getAllPasses() {
      axinst.get('/passes')
        .then(response => {
          this.passes = response.data;
          this.passes.forEach(pass => {
            this.checkApproval(pass);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getAllPasses();
  }
}
</script>

<style scoped>
#id{
  font-size: 18px;
  font-weight: bold;
}
.success-message {
  color: green;
}

.error-message {
  color: red;
}

.james{
  box-sizing: border-box;
  width: 450px;
  height: auto;
  padding: 20px;
  margin-top: 30px;
  border-radius: 4px;

  background-color: #dddddd;
  text-align: left;
}
</style>
