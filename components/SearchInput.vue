<template>
  <div>
    <SearchIcon />
    <input 
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
