<template>
  <div class="container">
    <div class="row px-sm-0 heading-row">
      <div class="col">
        <h1 class="mb-4">
          {{ title }}
          <span v-b-toggle.collapse @click="isOpen = !isOpen">
            <b-icon :icon="isOpen ? 'chevron-up' : 'chevron-down'" shift-v="5" font-scale="0.5" />
          </span>
        </h1>

        <b-collapse id="collapse" visible>
          <p class="px-md-5 py-3">
            {{ description }}
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

import {
  onMounted, ref, useRouter, useStore,
} from '@nuxtjs/composition-api'
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
    },
  },
  setup(props) {
    const { dispatch, state } = useStore()
    const router = useRouter()
    const currentStep = ref('step0')
    const isOpen = ref(true)

    let requirements = []

    onMounted(() => {
      dispatch('setCriteria', {
        category: props.currentPage,
        criteria: [],
      })
      dispatch('setRequirements', {
        category: props.currentPage,
        requirements: [],
      })
    })

    const onDecide = (step, value) => {
      const result = props.steps[step][value]
      const additionalCriteria = props.steps[step].additionalCriteria || []
      const criteria = [
        ...new Set([
          ...state.criteria[props.currentPage],
          ...props.steps[step][value === 'yes' ? 'inclusionCriteria' : 'exclusionCriteria'],
          ...additionalCriteria,
        ]),
      ]
      let nextStep = result

      dispatch('setCriteria', {
        category: props.currentPage,
        criteria,
      })

      if (Array.isArray(result)) {
        requirements = [...requirements, ...result]
        dispatch('setRequirements', { category: props.currentPage, requirements })
        if (!props.steps[step].continue) {
          router.push(props.nextPage)
        }
        nextStep = props.steps[step].continue
      }
      currentStep.value = nextStep
    }

    return {
      onDecide,
      currentStep,
      isOpen,
    }
  },
}
</script>
