<template>
  <section class="fade-in">
    <div class="row my-4">
      <div class="col">
        <div>
          <h4 class="my-4">{{ title }}</h4>
          <i class="mb-4">{{ info }}</i>

          <hr>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <b-button class="btn-info text-center" @click="onDecide(step, 'yes')">Yes</b-button>
        <div class="my-5">
          <h6 v-if="inclusionCriteria.length">
            Criteria for consideration*
          </h6>
          <p>
            <em>{{ inclusionCriteria.join(', ')}}</em>
          </p>
        </div>
      </div>
      <div class="col">
        <b-button class="btn-info" @click="onDecide(step, 'no')">No</b-button>
        <div class="my-5">
          <h6 v-if="exclusionCriteria.length">
            Criteria for consideration*
          </h6>
          <p>
            <em>{{ exclusionCriteria.join(', ')}}</em>
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          <small>
            * While certain DLT platforms offer features such as data privacy or high transaction peformance natively, 
            there are technologies that can enhance these properites.
          </small>
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
