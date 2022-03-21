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
import * as sanitizeHtml from 'sanitize-html';
import { mapState, mapActions } from 'vuex'

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
    filterUsers (users, search) {
      if(!search) return users

      return users.reduce((acc, user) => {
        const { address, city, email, name, title } = user
        const userDetails = `/${address}/${city}/${email}/${name}/${title}`.toLowerCase()
        const isAMatch = userDetails.includes(search.toLowerCase())
        if (isAMatch) {
          const highlightMatch = (value) => sanitizeHtml(value.replace(new RegExp(search, "gi"), (match) => `<mark>${match}</mark>`))
          acc.push({
            ...user,
            address: highlightMatch(address),
            city: highlightMatch(city),
            email: highlightMatch(email),
            name: highlightMatch(name),
            title: highlightMatch(title)
          })
        }
        return acc
      }, [])
    },
    onSearch (searchResult) {
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

<style lang="scss" scoped>
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

