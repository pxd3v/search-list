<template>
  <div>
    <SearchIcon />
    <input 
      v-model="value" 
      @input="onInput"
    />
  </div>
</template>

<script>
import SearchIcon from '~/components/SearchIcon'

export default ({
  name: 'SearchInput',
  props: {
    debounceDelay: {
      type: Number,
      default: 500
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    debounce: null,
  }),
  components: {
    SearchIcon
  },
  methods: {
    getDebounce (debounce, debounceCallback, delay = 500) {
      if (debounce) {
        window.clearInterval(debounce)
      }

      return window.setTimeout(() => {
        debounceCallback()
      }, delay)
    },
    onInput (event) {
      const debounceCallback = () => {
        this.$emit('debounce', event.target.value)
      }
      this.debounce = this.getDebounce(this.debounce, debounceCallback, this.debounceDelay)
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

    &__input-container {
      width: 100%;
      display: flex;
      position: relative;
      box-shadow: 0px 0px 2px 0px #0000001F;
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
      width: 600px;
      margin-top: 12px;
    }
  }

  

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
  }

  
</style>

