import { createRouter, createWebHistory } from 'vue-router';
import auth from './middleware/auth';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import middlewarePipeline from './middleware/pipeline';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name : 'Home',
      meta: {
        middleware: [
            auth
        ]
      }
    },
    {
      path: '/login',
      name : 'Login',
      component: Login,
    }
  ],
})


router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }

const middleware = to.meta.middleware;
   const context = {
     to,
     from,
     next,
   }

   return middleware[0]({
       ...context,
       next:middlewarePipeline(context, middleware,1)
   })

});

export default router;
