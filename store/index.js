export const state = () => ({
  users: []
})

export const mutations = {
  setUser(state, users) {
    state.users = [...users]
  }
}

export const actions = {
  async fetchUsers({ commit }) {
    const result = await this.$axios.$get(`${process.env.baseURL}/users.json`)
    commit('setUser', result)
    console.log('@@result', result)
  }
}
