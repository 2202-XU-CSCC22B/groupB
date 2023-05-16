<template>
  <div>
    <div v-for="pass in passes" :key="pass._id">
      <div :class="['box', { 'success': pass.approvalStatus, 'error': pass.unapprovedItems.length > 0 }]">
        <div class="header">
          <div id="id">{{ pass._id }}</div>
          <div class="date">{{ formatDate(pass.created) }}</div>
        </div>

        <div class="header" style="margin-bottom: 8px">
          <div id="requestor">Requested by <strong>{{ pass.req.name }}</strong></div>
          <button id="seamen" @click="pass.showAllItems = !pass.showAllItems">
            {{ pass.showAllItems ? 'Hide Item Details' : 'Show Item Details' }}
          </button>
        </div>
        
        <div v-for="(entry, key) in pass.nature" :key="key">
          <div><strong>{{ fieldNames[key] || key }}:</strong> {{ fieldNames[entry] || entry }}</div>
        </div>
        <br>

        <div v-if="pass.showAllItems">
          <div v-for="(entry, key) in pass.ptcs" :key="key">
            <div v-for="(value, prop) in entry" :key="prop">
              <div v-if="prop !== '_id' && prop !== 'tag' "><strong>{{ fieldNames[prop] || prop }}:</strong> {{ fieldNames[value] || value }}</div>
            </div>
            <br>
          </div>
        </div>
       
        <br>
        <div v-if="pass.approvalStatus == 'approved'">
          <div id="label">{{ pass.approvalStatus }}</div>
        </div>
        
        <div v-else-if="pass.approvalStatus == 'unapproved'">
          <div id="label">{{ pass.approvalStatus }}</div>
          <div id="item">
            <span v-html="pass.unapprovedItems.join('<br>')"></span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axinst from '@/../server/axios-config.js';
import fieldNames from '@/../server/fieldNames.js';

export default {
  name: 'PassApproval',
  data() {
    return {
      passes: []
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    },

    checkApproval(pass) {
      axinst.get(`/check_approval/${pass._id}`)
        .then(response => {
          if (response.data.message === 'approved') {
            pass.approvalStatus = response.data.message;
            pass.unapprovedItems = [];
          } else if (response.data.message === 'unapproved') {
            pass.approvalStatus = response.data.message;
            pass.unapprovedItems = response.data.unapprovedItems;
          } else {
            pass.approvalStatus = 'Error in retrieving pass data!';
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

          this.passes.sort((a, b) => new Date(b.created) - new Date(a.created));
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getAllPasses();
  },
  
  computed: {
    fieldNames() {
      return fieldNames;
    }
  }
}
</script>

<style scoped>
#seamen{
  background-color: #f2f2f8;
  border-radius: 8px;
  box-sizing: border-box;
  color: var(--tColor);
  font-family: var(--text);
  font-size: 15px;
  text-transform: uppercase;
  padding: 6px 12px;
  transition: 0.2s;
}

#seamen:hover{
  background-color: #e0e0e7;
  cursor: pointer;
}

.header{
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: auto;
}
.date{
  font-weight: bold;
}

#item{
  margin-top: 6px;
}

#label {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

#id {
  font-size: 20px;
  font-weight: bold;
}

#requestor{
  font-size: 16px;
}
.box.success {
  background-color: #e4f5e4;
  border: 3px solid #258a25;
}

.box.error {
  background-color: #f7e5e7;
  border: 3px solid #ff3a4b;
}

.box {
  border-radius: 6px;
  box-sizing: border-box;
  height: auto;
  margin-top: 30px;
  padding: 20px;
  text-align: left;
  width: 600px;
}
</style>
