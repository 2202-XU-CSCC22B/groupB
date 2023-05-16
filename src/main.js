import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

main().catch(err => console.log(err));

async function main() {
}

createApp(App).use(router).mount('#app')
