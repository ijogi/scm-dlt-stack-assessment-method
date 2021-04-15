<template>
  <decision-category 
    :title="title"
    :description="description"
    :steps="steps"
    current-page="interoperability"
    next-page="result"
  />
</template>

<script>
import { useStore } from '@nuxtjs/composition-api'
import DecisionCategory from '~/components/DecisionCategory.vue'

export default {
  components: { DecisionCategory },
  setup () {
    const { state } = useStore()
    const { network } = state.requirements

    const title = 'Interoperability'
    const description = `
      DLT interoperability allows DLT networks with different protocols to interact and exchange data with each other, 
      enabling to connect different ecosystems and industry specific networks into greater value chains.
    `

    const steps = {
      step0: {
        title: 'Does the use case involve conflicting requirements that could be resolved by combining different DLTs? ',
        info: 'Complex use cases can leverage the combination of different DLT networks to combine functionalities that cater to different stakeholders or business processes.',
        inclusionCriteria: [],
        exclusionCriteria: [],
        yes: ['Cross-chaininteroperable (must-have)'],
        no: 'step1',
      },
      step1: {
        title: 'Does the use case have intersection points with other DLT compatible industries such as a finance or insurance?',
        info: 'Interoperability can be used for connecting industry specific networks into greater value chains.',
        inclusionCriteria: ['Identity based access', 'Data privacy'],
        exclusionCriteria: [],
        yes: ['Cross-chain interoperable (should-have)'],
        no: network.includes('Private network (should-have)') || network.includes('Private network (must-have)')
          ? ['Cross-chain interoperable (should-have)']
          : [],
      },
    }
  
    return {
      title,
      description,
      steps,
    }
  }
}
</script>
