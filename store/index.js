import Vuex from "vuex";
import axios from '@nuxtjs/axios'

export default () => new Vuex.Store({
    state: {
        currentUser: {email:""}
    },
    getters : {

    },
    mutations: {
        LOGIN_USER(state, user) {
            state.currentUser = user;
        },
        LOGOUT_USER(state) {
            state.currentUser = {};
        }
    },
    actions: {
        loginUser({commit}, {email, password}) {
            commit("LOGIN_USER", user);
        },
        logoutUser({commit}) {
            commit("LOGOUT_USER");
        },
        getShells({ commit }) {
            axios.get("")
        }
    }
});