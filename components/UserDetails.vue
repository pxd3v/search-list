<template>
  <div class="user">
      <img :src="user.avatar" :key="user.email">
      <div class="user__info">
        <span>
          <h2 v-html="user.name" />
          <p v-html="user.email" />
        </span>
        <p class="user-title" v-html="user.title" />
        <p class="user-address" v-html="getFullAddress(user.address, user.city)" />
      </div>
  </div>
</template>

<script>
export default ({
  name: 'UserDetails',
  props: {
    user: {
      type: Object,
      required: true,
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
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    height: 150px;
    box-shadow: 0px 2px 2px 0px #0000003D;
    background: #FAFAFA;

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

