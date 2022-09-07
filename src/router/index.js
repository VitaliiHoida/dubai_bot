import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import TransportView from "@/views/TransportView";
import SendView from "@/views/SendView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/transport',
    name: 'transport',
    component: TransportView
  },
  {
    path: '/send',
    name: 'send',
    component: SendView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
