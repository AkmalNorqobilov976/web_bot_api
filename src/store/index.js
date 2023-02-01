import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {},
    isAuthenticated: false
  },
  getters: {
    isAuthenticated(state) {
        return state.isAuthenticated
    }
  },
  mutations: {
    "SET_INFO"(data) {
        this.userInfo = data;
        this.isAuthenticated = true;
    }
  },
  actions: {
    login(ctx, data) {
        ctx.commit('SET_INFO', data)
    }
  },
  modules: {
  }
})
