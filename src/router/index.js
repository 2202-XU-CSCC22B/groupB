import { createRouter, createWebHistory } from "vue-router";
import FormInput from "@/views/FormInput.vue";
<<<<<<< HEAD

const routes = [
  {
    path: "/",
    name: "FormInput",
    component: FormInput,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.Base_URL),
  routes,
});
=======
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

>>>>>>> 4022c026 (cleaning up backend)
export default router;
