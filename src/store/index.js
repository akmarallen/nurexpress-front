import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    updatedSection: null,
    updatedTest: null,
    updatedQuestion: null,
  },
  
  getters: {
    getCurrentUser: state => state.currentUser,
    getUpdatedSection: state=>state.updatedSection,
    getUpdatedTest: state=>state.updatedTest,
    getUpdatedQuestion: state=>state.updatedQuestion,
  },
  
  mutations: {
    loggedIn(state, user) {
      state.currentUser = user;
    },
    loggedOut(state) {
      state.currentUser = null;
    },
    setUpdatedSection(state, updatedSection) {
      state.updatedSection = updatedSection;
    },
    setUpdatedTest(state, updatedTest) {
      state.updatedTest = updatedTest;
    },
    setUpdatedQuestion(state, updatedQuestion) {
      state.updatedQuestion = updatedQuestion;
    },
  },

  actions: {
    loggedIn({commit}, user) {
      commit('loggedIn', user);
    },
    loggedOut({commit}) {
      commit('loggedOut');
    },
    setUpdatedSection({commit}, section) {
      commit('setUpdatedSection', section);
    },
    setUpdatedTest({commit}, test) {
      commit('setUpdatedTest', test);
    },
    setUpdatedQuestion({commit}, ques) {
      commit('setUpdatedQuestion', ques);
    },
  }
})
