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
import { onMounted, useStore } from '@nuxtjs/composition-api'
import DecisionCategory from '~/components/DecisionCategory.vue'

import { NAME, VALUE, TYPE } from '~/constants'

export default {
  components: { DecisionCategory },
  setup () {
    const { dispatch, state } = useStore()

    onMounted(() => dispatch('setProgress', 5))

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
        inclusionCriteria: ['Needs both transparency and privacy', 'Needs both decentralization and scalability'],
        exclusionCriteria: ['Use case doesn\'t involve conflicting requirements'],
        yes: [{ name: NAME.INTEROP, value: VALUE.MUST_HAVE, type: TYPE.REQ }],
        no: 'step1',
      },
      step1: {
        title: 'Does the use case have intersection points with other DLT compatible industries such as a finance or insurance?',
        info: 'Interoperability can be used for connecting industry specific networks into greater value chains.',
        inclusionCriteria: ['Intersection points with financial, insurance, manufacturing or retail industries'],
        exclusionCriteria: ['Use case doesn\'t expand to other industries'],
        yes: [{ name: NAME.INTEROP, value: VALUE.SHOULD_HAVE, type: TYPE.REQ }],
        no: network.find((n) => n.name === NAME.PRIVATE_NETWORK)
          ? [{ name: NAME.INTEROP, value: VALUE.SHOULD_HAVE, type: TYPE.REQ }]
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
