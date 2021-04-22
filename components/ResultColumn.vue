<template>
  <div class="col text-left px-5">
      <slot />
      <p v-for="field of fields" :key="field.name">
        {{ field.name }}
        <span v-b-toggle="field.id" v-if='field.description'>
          <b-icon icon="question-circle" scale="0.8" />
        </span>
        <b-collapse :id="field.id" class="mt-2 ml-2">
          <small>{{ field.description }}</small>
        </b-collapse>
      </p>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
}
</script>
