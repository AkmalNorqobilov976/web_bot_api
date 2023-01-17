import { useAuthStore } from '@/store/authStore'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
        requiresAuth: true
    },
    component: HomeView
},

{
    path: '/customers',
    component: () => import('@/views/markets/index.vue'),
    children: [
        {
            path: "",
            name: "customers",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/customers/index.vue'),
        },
        {
            path: "generate-promocode",
            name: "generate-promocode",
            meta: {
                requiresAuth: true
            },
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
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/all.vue')
        },
        {
            path: "new",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/new.vue')
        },
        {
            path: "ready",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/ready.vue')
        },
        {
            path: "active",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/active.vue')
        },
        {
            path: "deliveried",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/deliveried.vue')
        },
        {
            path: "cancelled",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/cancelled.vue')
        },
        {
            path: "not-necessary",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/not-necessary.vue')
        },
        {
            path: "archive",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/archive.vue')
        },
        {
            path: "spam",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/spam.vue')
        },
    ]
  },

  {
    path: "/markets",
    component: () => import('@/views/markets/index.vue'),
    children: [
        {
            path: '',
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/all.vue')
        },
        {
            path: "new",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/new.vue')
        },
        {
            path: "ready",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/ready.vue')
        },
        {
            path: "active",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/active.vue')
        },
        {
            path: "deliveried",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/deliveried.vue')
        },
        {
            path: "cancelled",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/cancelled.vue')
        },
        {
            path: "not-necessary",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/not-necessary.vue')
        },
        {
            path: "archive",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/archive.vue')
        },
        {
            path: "spam",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/tabs/spam.vue')
        },
    ]
  },

  {
    path: "/streams",
    component: () => import('@/views/streams/index.vue'),
    children: [
        {
            path: "",
            name: "my-streams",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/streams/my-streams.vue')
        },
        {
            path: "create-stream",
            name: "create-stream",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/streams/CreateStream.vue')
        },
        {
            path: "created-stream",
            name: "created-stream",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/streams/created-stream.vue')
        },
        {
            path: "final-level-create-stream",
            name: "final-level-create-stream",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/streams/FinalLevelCreateStream.vue')
        }
    ]
  },
  
  {
    path: "/payments",
    name: "payments",
    meta: {
        requiresAuth: true
    },
    component: () => import('@/views/payments/index.vue')
  },

  {
    path: "/profile",
    name: "profile",
    component: () => import('@/views/profile/index.vue')
  },
  {
    path: "/balance-history",
    name: "balance-history",
    component: () => import('@/views/balance-history/index.vue')
  },
  {
    path: "/statistics",
    component: () => import('@/views/statistics/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: "/login",
    name: "login",
    meta: {
        requiresAuth: false
    },
    component: () => import('@/views/auth/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    
    let isAuthenticated = auth.$state.isAuthenticated
    if(!isAuthenticated) {
        

        if(to.path !== '/login') {
            // next('/login')
        }
        // next()
    }
    next();
})

export default router
