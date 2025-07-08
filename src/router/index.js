import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const PasswordReset = () => import('@/views/users/PasswordReset')
const UserList = () => import('@/views/users/UserList')
const DelLogs = () => import('@/views/dels/DelLogs.vue')


Vue.use(Router)


function configRoutes() {
  return [
    {      
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },  
        {
          path: '/dels',
          redirect: '/dels/del-list',
          name: 'Deliveries',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'del-list',
              name: 'del-list',
              component: () => import("@/views/dels/DelList.vue"),
            },  
            {
              path: 'del-updated',
              name: 'del-updated',
              component: () => import("@/views/dels/DelUpdated.vue"),
              props: true
            },   
            {
              path: 'del-logs/:deliveryId',
              name: 'DelLogs',
              component: DelLogs,
              props: true
            }, 
            {
              path: 'del-debted',
              name: 'DelDebted',
              component: () => import("@/views/dels/DelDebted.vue"),
              props: true
            }, 
            {
              path: 'del-bank',
              name: 'DelBank',
              component: () => import("@/views/dels/DelBank.vue"),
              props: true
            },  
            {
              path: 'postman-dels',
              name: 'PostmanDels',
              component: () => import("@/views/dels/PostmanDels.vue"),
            },
            {
              path: 'postman-print',
              name: 'PostmanPrint',
              component: () => import("@/views/dels/PostmanPrint.vue"),
              props: true
            },  
            {
              path: 'sectors',
              name: 'Sectors',
              component: () => import("@/views/dels/Sectors.vue"),
            }, 
            {
              path: 'orders',
              name: 'orders',
              component: () => import("@/views/dels/Orders.vue"),
              props: true
            },   
          ]
        },
        {
          path: '/fins',
          redirect: '/fins/expenses',
          name: 'Expenses',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'daily-report',
              name: 'daily-report',
              component: () => import("@/views/fins/DailyReport.vue"),
              props: true
            },  
            {
              path: 'expenses',
              name: 'expenses',
              component: () => import("@/views/fins/Expenses.vue"),
              props: true
            }, 
            {
              path: 'podotchet',
              name: 'podotchet',
              component: () => import("@/views/fins/Podotchet.vue"),
              props: true
            },   
            {
              path: 'postmanreport',
              name: 'postmanreport',
              component: () => import("@/views/fins/PostmanReport.vue"),
              props: true
            }, 
            {
              path: 'region-report',
              name: 'RegionReport',
              component: () => import("@/views/fins/RegionReport.vue"),
              props: true
            }, 
          ]
        },
        {
          path: '/pages',
          redirect: '/pages/info-pages',
          name: 'Pages',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'login',
              name: 'login',
              component: () => import("@/views/pages/Login.vue"),
            },    
          ]
        },
        {
          path: '/users',
          redirect: '/users/users',
          name: 'Users',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'postman-collections',
              name: 'postColl',
              component: () => import("@/views/users/PostmanCollection.vue"),
            },
            {
              path: 'postmans',
              name: 'postmans',
              component: () => import("@/views/users/Postmans.vue"),
            },
            {
              path: 'user-list',
              name: 'UserList',
              component: UserList
            },  
            {
              path: 'password-reset',
              name: 'PasswordReset',
              component: PasswordReset
            },  
          ]
        }     
      ]
    },
  ]
}

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
