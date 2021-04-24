<template>
  <div class="col text-left px-sm-0 px-md-5">
    <slot />
    <p v-for="field of fields" :key="field.name" class="field-name">
      {{ field.name }}
      <span v-if="field.type === TYPE.QUALITY">
        - {{ field.value }}
      </span>
      <span v-if="field.description" v-b-toggle="field.id">
        <b-icon icon="chevron-up" class="open" scale="0.8" />
        <b-icon icon="chevron-down" class="closed" scale="0.8" />
      </span>
      <b-collapse :id="field.id" class="mt-2 ml-2">
        <small>{{ field.description }}</small>
      </b-collapse>
    </p>
  </div>
</template>

<script>
import { TYPE } from '~/constants'

export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      TYPE,
    }
  },
}
</script>

<style scoped>
  /* .field-name {
    max-width: 10rem;
  } */
  .collapsed > .open,
  .not-collapsed > .closed {
    display: none;
  }
</style>
