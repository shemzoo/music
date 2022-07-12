import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  getters: {
    // getAuthModalShow: (state) => state.authModalShow,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      await auth.createUserWithEmailAndPassword(payload.email, payload.password);

      await usersCollection.add({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
        type: payload.type,
      });

      commit('toggleAuth');
    },
  },
  modules: {
  },
});
