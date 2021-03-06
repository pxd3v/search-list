<template>
  <button 
    class="user"
    @click="$emit('userToggled', user.email)"
  >
      <img :src="user.avatar" :key="user.email" alt="User profile picture">
      <div class="user__info">
        <span>
          <h2 v-html="name" />
          <p v-html="email" />
        </span>
        <p class="user-title" v-html="title" />
        <p class="user-address" v-html="getFullAddress(address, city)" />
        <p class="user-status"> 
          {{ status }}
        </p>
      </div>
  </button>
</template>

<script>
import { mapState } from 'vuex'
import * as sanitizeHtml from 'sanitize-html';

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
      'selectedUsers',
      'search'
    ]),
    status () {
      return this.selectedUsers[this.user.email] ? 'SKIP SELECTION' : 'MARK AS SIUTABLE'
    },
    address () {
      return this.highlightMatch(this.user.address, this.search)
    },
    city () {
      return this.highlightMatch(this.user.city, this.search)
    },
    email () {
      return this.highlightMatch(this.user.email, this.search)
    },
    name () {
      return this.highlightMatch(this.user.name, this.search)
    },
    title () {
      return this.highlightMatch(this.user.title, this.search)
    }
  },
  methods: {
    getFullAddress (address, city) {
      return `${address}, ${city}`
    },
    highlightMatch (value, search) {
      return sanitizeHtml(value.replace(new RegExp(search, "gi"), (match) => `<mark>${match}</mark>`))
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
    height: 164px;
    box-shadow: 0px 2px 2px 0px #0000003D;
    background: #FAFAFA;

    &:hover {
      cursor: pointer;
      outline: 5px auto -webkit-focus-ring-color;
    }

    img {
      height: 164px;
      width: 210px;
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
        margin-top: 16px;
        padding-top: 8px;
        font-size: 14px;
        color: #009688;
        border-top: 1px solid #ddd;
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
  
  @media only screen and (max-width: 1024px) {
    .user {
      &__info {
        p {
          font-size: 10px;
          line-height: 14px;
        }

        .user-status {
          font-size: 10px;
        }

        span {
          h2 {
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
    }
  }
</style>

