<template>
  <RecycleScroller
    :items="users"
    :item-size="164"
    key-field="email"
    v-slot="{ item }"
    ref="userList"
  >
    <UserDetails :user="item"/>
  </RecycleScroller>
</template>

<script>
import UserDetails from '~/components/UserDetails'

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
  }
})
</script>
