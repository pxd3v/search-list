<template>
  <RecycleScroller
    :items="users"
    :item-size="180"
    key-field="email"
    v-slot="{ item }"
    ref="userList"
  >
    <UserDetails 
      :user="item"
      @userToggled="onUserToggle"
    />
  </RecycleScroller>
</template>

<script>
import UserDetails from '~/components/UserDetails'
import { mapMutations } from 'vuex'

export default ({
  name: 'IndexPage',
  props: {
    users: {
      type: Array,
      required: true,
    }
  },
  components: {
    UserDetails
  },
  mounted () {
    this.$emit('listRefGenerated', this.$refs.userList)
  },
  methods: {
    ...mapMutations([
      'toggleSelectedUser'
    ]),
    onUserToggle (userEmail) {
      this.toggleSelectedUser(userEmail)
    }
  }
})
</script>
