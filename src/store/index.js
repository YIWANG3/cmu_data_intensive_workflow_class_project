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
        currentChannel: {},
        publicationYears: [],
        publicationFromYear: '',
        publicationToYear: '',
        currentTopicYear: ''
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
        },
        'UPDATE_CURRENT_CHANNEL'(state, payload) {
            if (payload.statistic && payload.statistic.length > 0) {
                for (let i = 0; i < payload.statistic.length; i++) {
                    payload.statistic[i].vol = 'Vol ' + payload.statistic[i].vol;
                }
            }
            state.currentChannel = payload;
            state.currentTopicYear = payload.allTopics && payload.allTopics[0] && payload.allTopics[0].year;
        },
        'UPDATE_CURRENT_TOPIC_YEAR'(state, payload) {
            state.currentTopicYear = payload;
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
        },
        'GET_CHANNEL_INFO'({ commit, state }, params) {
            axios.get(`${SERVER_ADDRESS}${API_PREFIX}/channel`, {
                params: params
            }).then((res) => {
                commit('UPDATE_CURRENT_CHANNEL', res.data);
            });
        }
    }
});
