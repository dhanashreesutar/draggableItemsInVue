import { createRouter, createWebHistory } from 'vue-router';

import editor from '../components/editor.vue'
import drag from '../components/drag.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/drag',
      name: 'drag',
      component: drag
    },
    {
      path: '/editor',
      name: 'editor',
      component: editor
    },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
  ]
})

export default router
