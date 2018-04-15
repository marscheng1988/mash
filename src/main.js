// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import ajax from './static/network';
import constants from './static/constants';
import vueTools from './static/vueTools.js';
import cache from './static/cache-1.0.0';
import VueLazyload from 'vue-lazyload';
const FastClick = require('fastclick');
FastClick.attach(document.body);
Vue.config.productionTip = false;

Vue.use(cache);
Vue.use(ajax);
Vue.use(constants);
Vue.use(vueTools);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: require('./assets/no-img.png'),
    loading: '',
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
