export const state = () => ({
  users: [],
  selectedUsers: {},
  search: ''
})

export const mutations = {
  setUser(state, users) {
    state.users = [...users]
  },
  toggleSelectedUser(state, userEmail) {
    state.selectedUsers = {
      ...state.selectedUsers,
      [userEmail]:!state.selectedUsers[userEmail] 
    }
  },
  setSearch(state, search) {
    state.search = search
  }
}

export const actions = {
  async fetchUsers({ commit }) {
    const result = await this.$axios.$get(`${process.env.baseURL}/users.json`)
    commit('setUser', result)
  }
}
