import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginUser from '../components/LoginUser.vue'
import VideoBrowser from "../components/VideoBrowser.vue"
import SubmitMedia from "../components/SubmitMedia.vue"
import UserProfile from "../components/UserProfile.vue"
import SearchMedia from "../components/SearchMedia.vue"
import CustomiseProfile from "../components/CustomiseProfile.vue"
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: LoginUser
  },
  {
    path: '/customiseprofile',
    name: 'CustomiseProfile',
    component: CustomiseProfile
  },
  {
    path: '/searchmedia',
    name: 'SearchMedia',
    component: SearchMedia,
  },

  {
    path: '/submitmedia',
    name: 'SubmitMedia',
    component: SubmitMedia,

  },
  {
    path: '/videobrowser/:id',
    name: 'VideoBrowser',
    component: VideoBrowser,
  },
  {
    path: '/userprofile/:name',
    name: 'UserProfile',
    component: UserProfile,
  },

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requireAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requireAuth && !currentUser) {
    next('/login')

  }
  if (requireAuth && currentUser) {
    next('/login')
  }
  else {
    next();

  }
}
)
// )

export default router