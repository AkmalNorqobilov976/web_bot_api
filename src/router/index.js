import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
},

{
    path: '/customers',
    component: () => import('@/views/markets/index.vue'),
    children: [
        {
            path: "",
            name: "customers",
            component: () => import('@/views/customers/index.vue'),
        },
        {
            path: "generate-promocode",
            name: "generate-promocode",
            component: () => import('@/views/customers/generate-promocode.vue')
        }
    ]
  },

  {
    path: "/queries",
    name: "queries",
    component: () => import('@/views/queries/index.vue'),
    children: [
        {
            path: '',
            component: () => import('@/views/queries/tabs/all.vue')
        }
    ]
  },

  {
    path: "/markets",
    component: () => import('@/views/markets/index.vue'),
    children: [
        {
            path: "",
            name: "markets",
            component: () => import('@/views/markets/main.vue')
        },
        

        {
            path: "/donation",
            name: "donation",
            component: () => import('@/views/markets/donation.vue')
        },

        {
            path: "/define-amount",
            name: "define-amount",
            component: () => import('@/views/markets/define-amount.vue')
        }
    ]
  },

  {
    path: "/streams",
    component: () => import('@/views/streams/index.vue'),
    children: [
        {
            path: "",
            name: "my-streams",
            component: () => import('@/views/streams/my-streams.vue')
        },
        {
            path: "create-stream",
            name: "create-stream",
            component: () => import('@/views/streams/CreateStream.vue')
        },
        {
            path: "created-stream",
            name: "created-stream",
            component: () => import('@/views/streams/created-stream.vue')
        }
    ]
  },
  
  {
    path: "/payments",
    name: "payments",
    component: () => import('@/views/payments/index.vue')
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
