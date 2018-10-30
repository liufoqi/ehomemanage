import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)
const components={
  Layout:()=>import('../views/Layout/layout'),
  Login:()=>import('../views/login/index'),
  Main:()=>import('../views/layout/index'),
  ManageAdd:()=>import('../views/layout/manages/add'),
  ManageList:()=>import('../views/layout/manages/list'),
  Alter:()=>import('../views/layout/manages/alter'),
  Myalter:()=>import('../views/layout/manages/myAlert'),
  AddSwiper:()=>import('../views/layout/swipers/add'),
  AddNew:()=>import('../views/layout/news/adds'),
  NewsList:()=>import('../views/layout/news/list'),
};
const router= new Router({
  routes: [
    {
      path: '/',
      component: components.Login,
    },
    {
      path: '/index',
      component: components.Layout,
      redirect: '/main',
      children: [
        {
          path:'/main',
          component:components.Main
        },
        {
          path:'/add',
          component:components.ManageAdd
        },{
          path:'/list',
          component:components.ManageList
        },
        {
         path:'/alter',
          component:components.Alter
        },
        {
        path:'/myAlter',
          component:components.Myalter
        },
        {
          path:'/addSwiper',
          component:components.AddSwiper
        },
        {
          path:'/addNew',
          component:components.AddNew
        },
        {
          path:'/newsList',
          component:components.NewsList
        }
      ]
    },
  ]
});
router.beforeEach((to,from,next)=>{
  Nprogress.start();
  next()
});
router.afterEach((to,from)=>{
  Nprogress.done()
});
export default router
