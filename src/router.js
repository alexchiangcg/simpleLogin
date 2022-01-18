import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('./components/Login.vue'),
            beforeEnter(to, from, next) {
                localStorage.token ? next('/url-list') : next();
            }
        },
        {
            path: '/url-list',
            name: 'url-list',
            component: () => import('./components/UrlList.vue'),
            beforeEnter(to, from, next) {
                localStorage.token ? next() : next('/login');
            }
        },
        {
            path: '*',
            redirect: '/login',
        }
    ]
})

export default router;