<template>
  <section class="fade-in-image">
    <div class="row my-4">
      <div class="col">
        <div>
          <h4>{{ title }}</h4>
          <i>{{ info }}</i>

          <hr>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <b-button class="mr-4 btn-info" @click="onDecide(step, 'yes')">Yes</b-button>
      </div>
      <div class="col">
        <b-button class="ml-4 btn-info" @click="onDecide(step, 'no')">No</b-button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h6 v-if="inclusionCriteria.length">
          Criteria for consideration
        </h6>
        <p>
          <em>{{ inclusionCriteria.join(', ')}}</em>
        </p>
      </div>
      <div class="col">
        <h6 v-if="exclusionCriteria.length">
          Criteria for consideration
        </h6>
        <p>
          <em>{{ exclusionCriteria.join(', ')}}</em>
        </p>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    step: {
      type: String,
      required: true
    },
    onDecide: {
      type: Function,
      required: true,
    },
    inclusionCriteria: {
      type: Array,
      required: true,
    },
    exclusionCriteria: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style>
  .fade-in-image {
    animation: fadeIn 1s;
    -webkit-animation: fadeIn 1s;
    -moz-animation: fadeIn 1s;
    -o-animation: fadeIn 1s;
    -ms-animation: fadeIn 1s;
  }
  @keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-moz-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-webkit-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-o-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-ms-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
</style>
