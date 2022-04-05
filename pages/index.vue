<template>
  <div class="app-container">
    <div class="search-list">
      <SearchInput 
        class="search-list__input-container"
        @debounce="onSearch"
      />
      <UserList 
        class="search-list__scroller"
        :users="filteredUsers" 
        @listRefGenerated="onListRefGenerated"
      />
    </div>
  </div>
</template>

<script>
import SearchInput from '~/components/SearchInput'
import { mapState, mapActions, mapMutations } from 'vuex'

export default ({
  name: 'IndexPage',
  data: () => ({
    filteredUsers: [],
    debounce: 0,
    listRef: null
  }),
  components: {
    SearchInput
  },
  computed: {
    ...mapState([
      'users'
    ])
  },
  async fetch() {
    await this.$store.dispatch('fetchUsers')
    this.filteredUsers = [ ...this.users ]
  },
  methods: {
    ...mapActions([
      'fetchUsers'
    ]),
    ...mapMutations([
      'setSearch'
    ]),
    filterUsers (users, search) {
      if(!search) return users

      return users.filter(user => {
        const { address, city, email, name, title } = user
        const userDetails = `/${address}/${city}/${email}/${name}/${title}`.toLowerCase()
        return userDetails.includes(search.toLowerCase())
      })
    },
    onSearch (searchResult) {
      this.setSearch(searchResult)
      const { filterUsers, users } = this
      this.filteredUsers = filterUsers(users, searchResult)
      this.listRef.scrollToPosition(0)
    },
    onListRefGenerated (listRef) {
      this.listRef = listRef
    },
  }
})
</script>

<style lang="scss">
  .app-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #eee;
  }

  .search-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    padding: 12px;
    width: 80%;
    max-width: 700px;

    &__input-container {
      width: 100%;
      display: flex;
      position: relative;
      box-shadow: 0px 2px 2px 0px #0000003D;

      background: #fafafa;

      input {
        width: 100%;
        border: 0;
        font-size: 24px;
        padding: 10px 36px;
        background: none;
        opacity: 0.75;
      }

      svg {
        position: absolute;
        top: 12px;
        left: 8px;
      }
    }

    &__scroller {
      height: 600px;
      width: 100%;
      margin-top: 12px;
    }
  }
</style>

