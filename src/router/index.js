import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import ProduitPage from '../views/ProduitVendue.vue';
import VentePage from '../views/VenteVendue.vue';
const routes = [
  {
    path: '/',
    redirect: '/home',//memories
    name:HomePage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/produit',
    name: 'Produit',
    component: ProduitPage
  }, 
  {
    path: '/vente',
    name: 'vente',
    component: VentePage
  }, 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
