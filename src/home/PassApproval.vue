<template>
  <div>
    <div style="display: flex; flex-direction: row;" v-for="pass in passes" :key="pass._id">
      <div class='box'>
        <div class="header">
          <div id="id">{{ pass._id }}</div>
          <div class="date">{{ formatDate(pass.created) }}</div>
        </div>

        <div class="header" style="margin-bottom: 8px">
          <div id="requestor">Requested by <strong>{{ pass.req.name }}</strong></div>
        </div>
        
        <div style="font-size: 18px; font-weight: bold; text-align: center; margin: 15px 0 5px 0; text-transform: uppercase;"> {{ fieldNames[pass.nature.type] }} </div>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around;">
          <div v-for="(entry, key) in pass.nature" :key="key">
              <div class="entry">
                <div id="top">
                  {{ fieldNames[entry] || entry }}
                </div>
                <div id="bottom">
                  {{ fieldNames[key] || key }} 
              </div>
            </div>
          </div>
        </div>

        <div v-if="pass.showAllItems">
          <div class="item_wrap">
            <div class="wrap_box" v-for="(entry, key) in pass.ptcs" :key="key">
              <div v-for="(value, prop) in entry" :key="prop">
                <div v-if="prop !== '_id' && prop !== 'tag' ">
                  <strong>{{ fieldNames[prop] || prop }}</strong>: {{ fieldNames[value] || value }} 
                </div>
              </div>
            </div>
          </div>
        </div>
       
        <div :class="['status', { 'success': pass.approvalStatus, 'error': pass.unapprovedItems.length > 0 }]">
          <div v-if="pass.approvalStatus == 'approved'">
            <div id="label">{{ pass.approvalStatus }}</div>
          </div>
          
          <div v-else-if="pass.approvalStatus == 'unapproved'">
            <div id="label">{{ pass.approvalStatus }}</div>
          </div>
        </div>

        <div v-if="pass.showAllItems && pass.unapprovedItems.length > 0" id="item">
          <span v-html="pass.unapprovedItems.join('<br>')"></span>
        </div>
      </div>
      <div class="p_wrap">
        <div class="square_btn" @click="pass.showAllItems = !pass.showAllItems">
            <img style="height: 18px; width: 18px;" v-if="!pass.showAllItems" src="../assets/plus.png">
            <img style="height: 18px; width: 18px;" v-else src="../assets/minus.png">
        </div>

        <div v-if="pass.approvalStatus == 'unapproved'">
          <UploadButton/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axinst from '@/../server/axios-config.js';
import fieldNames from '@/../server/fieldNames.js';
import UploadButton from './UploadButton';

export default {
  name: 'PassApproval',
  components: {
    UploadButton
  },

  data() {
    return {
      passes: [],
      currentDate: ''
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
      axinst.get(`/passes/check_approval/${pass._id}`)
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
    },

    setCurrentDate() {
      // Get the current date
      var currentDate = new Date();

      // Format the date
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = currentDate.toLocaleDateString(undefined, options);
    }
  },
  created() {
    this.getAllPasses();
  },
  
  computed: {
    fieldNames() {
      return fieldNames;
    }
  },

  mounted() {
    this.setCurrentDate();
  }
}
</script>

<style scoped>
.entry{
  margin: 6px 5px;
  text-align: center;
  flex-grow: 1;
}
.entry #top{
  font-size: 15px;
  font-weight: bold;
}
.entry #bottom{
  font-size: 12px;
  text-transform: uppercase;
  color: #6d6d75;
}
.p_wrap{
  margin-top: 30px;
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.p_wrap * {
  margin: 4px;
}

.item_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 0 0;
}

.wrap_box {
  font-size: 15px;
  border-radius: 6px;
  flex-grow: 1;
  margin: 0 5px 10px 5px;
  padding: 12px;
  background-color: #e7e9f0;
}

.wrap_box:first-child {
  margin: 0 5px 10px 0 !important;
}

.wrap_box:last-child {
  margin: 0 0 10px 5px  !important;
}

.wrap_box:only-child{
  margin: 0;
}

.wrap_box:nth-child(n+3) {
  margin-left: 0 !important;
}

#details{
  background-color: #dbdce2;
  border: 0;
  color: var(--tColor2);
  border-radius: 8px;
  box-sizing: border-box;
  font-family: var(--text);
  font-size: 15px;
  padding: 6px 12px;
  text-transform: uppercase;
  transition: 0.2s;
}

#details:hover{
  background-color: #b9bac9;
  color: #fff;
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
  color: #7a1d26;
  margin-top: 20px;
  text-align: center;
}

#label {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
}

#id {
  font-size: 20px;
  font-weight: bold;
}

#requestor{
  font-size: 14px;
  text-transform: uppercase;
  color: #6d6d75;
}
.status.success {
  background-color: #6bca49;
  color: #ffffff;
}

.status.error {
  background-color: #fae3e3;
  border: 1px solid #d41b2a;
  color: #d41b2a;
}

.status{
  border-radius: 6px;
  padding: 7px 0;
  width: auto;
  margin-top: 25px;
}

.box {
  border-radius: 8px;
  border: var(--borGrey);
  box-sizing: border-box;
  height: auto;
  margin-top: 30px;
  padding: 20px;
  text-align: left;
  width: 600px;
}
</style>
