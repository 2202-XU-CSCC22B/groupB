import { createRouter, createWebHistory } from "vue-router";
import FormInput from "@/views/FormInput.vue";
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: "/form",
    name: "FormInput",
    component: FormInput,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
