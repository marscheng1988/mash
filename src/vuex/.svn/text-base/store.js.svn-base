import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import Cache from '../static/cache-1.0.0';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        type: '',
        pages: 0,
        loginState: false,
        indexScrollTop: '',
        firstOpen: true,
    },
    mutations: {
        loginIn (state) {
            state.loginState = true
        },
        loginOut (state) {
            state.loginState = false
        },
        setPrev (state) {
            state.type = 'prev';
        },
        setNext (state) {
            state.type = 'next';
        },
        setScrollTop (state,value) {
            state.indexScrollTop = value;
        },
        indexOpened (state) {
            state.firstOpen = false
        }
    },
})
