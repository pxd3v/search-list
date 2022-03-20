<template>
  <button 
    class="user"
    @click="$emit('userToggled', user.email)"
  >
      <img :src="user.avatar" :key="user.email" alt="User profile picture">
      <div class="user__info">
        <span>
          <h2 v-html="user.name" />
          <p v-html="user.email" />
        </span>
        <p class="user-title" v-html="user.title" />
        <p class="user-address" v-html="getFullAddress(user.address, user.city)" />
        <p class="user-status"> 
          {{ status }}
        </p>
      </div>
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default ({
  name: 'UserDetails',
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapState([
      'selectedUsers'
    ]),
    status () {
      return this.selectedUsers[this.user.email] ? 'SKIP SELECTION' : 'MARK AS SIUTABLE'
    }
  },
  methods: {
    getFullAddress (address, city) {
      return `${address}, ${city}`
    }
  }
})
</script>

<style lang="scss" scoped>
  .user {
    padding: 0;
    margin: 0;
    text-align: left;
    width: 100%;
    border: 0;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    height: 150px;
    box-shadow: 0px 2px 2px 0px #0000003D;
    background: #FAFAFA;

    &:hover {
      cursor: pointer;
      outline: 5px auto -webkit-focus-ring-color;
    }

    img {
      height: 100%;
      background-color: #ccc;
    }

    &__info {
      display: flex;
      flex-direction: column;
      padding: 10px;
      width: 100%;
      
      p {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.54);
      }

      .user-title {
        color: rgba(0, 0, 0, 0.543846);
        font-weight: 700;
      }

      .user-status {
        margin-top: 24px;
        font-size: 14px;
        color: #009688;
      }

      span {
        display: flex;
        width: 100%;
        justify-content: space-between;

        h2 {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.87);
          line-height: 32px;
        }
      }
    }
  }
</style>

