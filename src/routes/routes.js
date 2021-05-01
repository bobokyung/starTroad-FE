import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';


const requireAuth = () => (from, to, next) => {
  var isAuthenticated= false;
  //this is just an example. You will have to find a better or 
  // centralised way to handle you localstorage data handling 
  if(localStorage.getItem('accessToken'))
    // 나중에는 여기서 서버에 접속해서 인증 보내야함.
    isAuthenticated = true;
   else
    isAuthenticated= false;
   if(isAuthenticated) 
   {
    next(); // allow to enter route
   } 
   else
   {
    next('/login'); // go to '/login';
   }
}


const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    beforeEnter : requireAuth(),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        beforeEnter : requireAuth(),
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/makemap',
        name: 'makemap',
        component: () => import(/* webpackChunkName: "demo" */ '../views/MakeRoadmap.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/mymap',
        name: 'mymap',
        component: () => import(/* webpackChunkName: "demo" */ '../views/MyMap.vue')
      },
      {
        path: '/mystudy',
        name: 'mystudy',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];


export default routes;