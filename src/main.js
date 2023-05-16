import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://zen:RRqQveYMsiMRzgIR@eeppc.xm9nfsr.mongodb.net/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/');` if your database has auth enabled
}

createApp(App).use(router).mount('#app')
