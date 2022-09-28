import {createRouter, createWebHistory} from 'vue-router'
import Catalogs from '../components/Catalogs'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Home'),
    },
    {
        path: '/catalog',
        name: 'Catalog',
        component: Catalogs,
    },
    {
        path: '/product',
        name: 'Product',
        component: () => import('../components/ProductPage'),
    },
    {
        path: '/busket',
        name: 'Busket',
        component: () => import('../components/Busket'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
