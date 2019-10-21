import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
}, {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
}, {
    path: '/researcher',
    name: 'researcher',
    component: () => import(/* webpackChunkName: "about" */ '../views/Researcher.vue')
}];

const router = new VueRouter({
    routes
});

export default router;
