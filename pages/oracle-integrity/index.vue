<template>
  <decision-category
    :title="title"
    :description="description"
    :steps="steps"
    current-page="oracle"
    next-page="iot"
  />
</template>

<script>
import { onMounted, useStore } from '@nuxtjs/composition-api'
import DecisionCategory from '~/components/DecisionCategory.vue'

import Technologies from '~/models/technologies'

export default {
  components: { DecisionCategory },
  setup() {
    const { dispatch } = useStore()

    onMounted(() => dispatch('setProgress', 2))

    const title = 'Oracle integrity'
    const description = `
      Oracles are software and hardware agents that interface with smart contracts in order to provide them with data from external systems.
      To ensure data integrity, oracles can make use of cryptographic proofs, 
      aggregated data and reputation systems to attest accuracy, validity and the origin of data
    `

    const steps = {
      step0: {
        title: 'Is there a substantial risk for erroneous or malicious data coming from external systems?',
        info: 'Oracle attestation methods can protect against data faults originating from external systems that can’t be recognized by DLT networks.',
        inclusionCriteria: ['Unreliable input data or untrusted data sources'],
        exclusionCriteria: ['Trusted data sources'],
        yes: 'step1',
        no: [],
      },
      step1: {
        title: 'Can same data be obtained from multiple sources?',
        info: 'By aggregating data from multiple sources, the impact of individual faults can be reduced. Oracles can use cryptographic proofs to verify the integrity of data coming from a single source.',
        inclusionCriteria: ['Multiple data sources for same data'],
        exclusionCriteria: ['Single source of data'],
        continue: 'step2',
        yes: [Technologies.getDataAggregation()],
        no: [Technologies.getCryptProof()],
      },
      step2: {
        title: 'Can data sources be reliably identified?',
        info: 'Identities can be used to build reputation systems, while data sources that can’t be reliably verified can be attest by oracles using cryptographic proofs.',
        inclusionCriteria: ['Identities of external data sources are verifiable'],
        exclusionCriteria: ['Identities of external data sources can\'t be reliably verified'],
        yes: [Technologies.getRepSystem()],
        no: [Technologies.getCryptProof()],
      },
    }

    return {
      title,
      description,
      steps,
    }
  },
}
</script>
