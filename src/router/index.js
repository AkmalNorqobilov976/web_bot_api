import { getLastRouter, getToken } from '@/utils/localStorage'
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
    path: '/promo-codes',
    component: () => import('@/views/promo-codes/main.vue'),
    children: [
        {
            path: "main",
            name: "promo-codes",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/promo-codes/index.vue'),
        },
        {
            path: "generate-promocode",
            name: "generate-promocode",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/promo-codes/generate-promocode.vue')
        }
    ]
  },

  {
    path: "/orders",
    name: "orders",
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
            path: "accepted",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/accepted.vue')
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
            path: "hold",
            name: "",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/queries/tabs/not-necessary.vue')
        },
        {
            path: "archived",
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
            path: 'preview/:status',
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/markets/preview.vue')
        },
        
    ]
  },
  {
    path: "/generated-promocode/:id",
    name: "generated-promocode",
    meta: {
        requiresAuth: true
    },
    component: () => import('@/views/promo-codes/generated-promocode.vue')
},
  {
      path: "/donation",
      name: "donation",
      component: () => import('@/views/markets/donation.vue')
  },
  {
    path: '/donation/:id',
    name: 'donation-update',
    component: () => import('@/views/markets/updates/donation.vue')
  },
  {
      path: "/define-amount",
      name: "define-amount",
      component: () => import('@/views/markets/define-amount.vue')
  },
  {
    path: "/define-amount/:id",
    name: "define-amount-update",
    component: () => import('@/views/markets/updates/define-amount.vue')
  },
  {
      path: "/advertesiment",
      name: "advertesiment",
      component: () => import('@/views/markets/advertesiment.vue')
  },
  {
    path: "/advertesiment/:id",
    name: "advertesiment-update",
    component: () => import('@/views/markets/updates/advertesiment.vue')
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
            path: "create-stream/:id",
            name: "create-stream",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/streams/CreateStream.vue')
        },
        {
            path: "created-stream/:id",
            name: "created-stream",
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/streams/created-stream.vue')
        },
        {
            path: "preview/:id",
            name: "stream-preview",
            component: () => import('@/views/streams/preview.vue')
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
    redirect: to => {
        return {
            path: "/statistics/preview/visited"
        }
    },
    component: () => import('@/views/statistics/index.vue'),
    children: [
        {
            path: "preview/:tab",
            name: "statistics-preview",
            component: import('@/views/statistics/preview.vue')
        }
    ]
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
  },

  
  {
    path: "/verify-sms-code",
    name: "verify-sms-code",
    meta: {
        requiresAuth: false
    },
    component: () => import('@/views/auth/verify-sms-code.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    console.log(to.fullPath);
    // localStorage.setItem('last-route', to.fullPath)
    if(!getToken()) {
        console.log(getToken(), "tokencha");
        
        
        if(to.path !== '/login') {
            next('/login')
        }
        next()
    }
    next();
})

export default router
