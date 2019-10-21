import Vue from 'vue';
import Vuex from 'vuex';
import { SERVER_ADDRESS, API_PREFIX } from '../constant/serverInfo';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        searchResult: {},
        currentResearcher: {},
        currentPaper: {},
        publicationYears: [],
        publicationFromYear: '',
        publicationToYear: ''
    },
    mutations: {
        'UPDATE_SEARCH_RESULT'(state, payload) {
            state.searchResult = payload;
        },
        'UPDATE_CURRENT_RESEARCHER'(state, payload) {
            state.currentResearcher = payload;
            state.publicationYears = [];
            const from = payload.publicationYearRange.from;
            state.publicationFromYear = from;
            const to = payload.publicationYearRange.to;
            state.publicationToYear = to;
            for (let i = from; i <= to; i++) {
                state.publicationYears.push(i);
            }
        },
        'UPDATE_PUBLICATION_FROM_YEAR'(state, payload) {
            state.publicationFromYear = payload;
        },
        'UPDATE_PUBLICATION_TO_YEAR'(state, payload) {
            state.publicationToYear = payload;
        },
        'UPDATE_CURRENT_PAPER'(state, payload) {
            state.currentPaper = payload;
        }
    },
    actions: {
        'SEARCH'({ commit, state }, params) {
            axios.get(`${SERVER_ADDRESS}${API_PREFIX}/search`, {
                params: params
            }).then((res) => {
                commit('UPDATE_SEARCH_RESULT', res.data);
            });
        },
        'GET_RESEARCHER_INFO'({ commit, state }, params) {
            axios.get(`${SERVER_ADDRESS}${API_PREFIX}/researcher`, {
                params: params
            }).then((res) => {
                commit('UPDATE_CURRENT_RESEARCHER', res.data);
            });
        },
        'GET_PAPER_INFO'({ commit, state }, params) {
            axios.get(`${SERVER_ADDRESS}${API_PREFIX}/paper`, {
                params: params
            }).then((res) => {
                commit('UPDATE_CURRENT_PAPER', res.data);
            });
        }
    }
});
