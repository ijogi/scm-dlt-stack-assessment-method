<template>
  <div>
    <div class="container">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>

    <nuxt />
  </div>
</template>

<script>
import { computed, ref, useStore } from '@nuxtjs/composition-api'
  export default {
    setup() {

      const store = useStore()
      const progress = ref(0)

      store.subscribeAction((action) => {
        if (action.type === 'setProgress') {
          progress.value = action.payload
        }
      })

      const items = computed(() => [
        {
          text: 'Home',
          to: '/',
          active: false,
        },
        {
          text: 'Network',
          to: { name: 'network' },
          active: false,
        },
        {
          text: 'Permission model',
          to: { name: 'permission' },
          active: progress.value < 1,
        },
        {
          text: 'Oracle integrity',
          to: { name: 'oracle-integrity' },
          active: progress.value < 2,
        },
        {
          text: 'IOT',
          to: { name: 'iot' },
          active: progress.value < 3,
        },
        {
          text: 'Scalability',
          to: { name: 'scalability' },
          active: progress.value < 4,
        },
        {
          text: 'Interoperability',
          to: { name: 'interoperability' },
          active: progress.value < 5,
        },
        {
          text: 'Result',
          to: { name: 'result' },
          active: progress.value < 6,
        },
        {
          text: '',
          active: false,
        },
      ])

      return {
        items,
      }
    },
  }
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
