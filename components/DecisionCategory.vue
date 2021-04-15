<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mb-4">
          {{ title }}
          <span v-b-toggle.collapse>
            <b-icon icon="question-circle" shift-v="5" font-scale="0.5" />
          </span>
        </h1>
        
        <b-collapse id="collapse">
          <p>
            <small>
              {{ description }}
            </small>
          </p>
        </b-collapse>

      </div>
    </div>
    <template v-for="(value, key) in steps">
      <decision-point
        v-if="currentStep === key"
        :key="key"
        :step="key"
        :title="value.title"
        :info="value.info"
        :inclusion-criteria="value.inclusionCriteria"
        :exclusion-criteria="value.exclusionCriteria"
        :on-decide="onDecide"
      />
    </template>
  </div>
</template>

<script>

import { reactive, toRefs, useRouter, useStore } from '@nuxtjs/composition-api'
import DecisionPoint from '~/components/DecisionPoint.vue'

export default {
  components: { DecisionPoint },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    steps: {
      type: Object,
      required: true,
    },
    currentPage: {
      type: String,
      required: true,
    },
    nextPage: {
      type: String,
      required: true,
    }
  },
  setup (props) {
    const { dispatch } = useStore()
    const router = useRouter()
    const state = reactive({
      currentStep: 'step0',
    })

    let requirements = []

    const onDecide = (step, value) => {
      const result = props.steps[step][value]
      let nextStep = result

      if (Array.isArray(result)) {
        requirements = [...requirements, ...result]
        if (!props.steps[step].continue) {
          dispatch('setRequirements', { category: props.currentPage, requirements })
          router.push(props.nextPage)
        }
        nextStep = props.steps[step].continue
      }
      state.currentStep = nextStep
    }
  
    return {
      onDecide,
      ...toRefs(state),
    }
  }
}
</script>

<style>

html {
  background: url(assets/images/pexels-pixabay-262353.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

body {
  height: 100vh;
  width: 100vw;
  background-color: transparent;
}

.container {
  margin: 5rem auto;
  padding: 5rem;
  text-align: center;
  background: rgba( 255, 255, 255, 0.90 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 3.5px );
  -webkit-backdrop-filter: blur( 3.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
</style>
