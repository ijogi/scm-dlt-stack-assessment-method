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
import DecisionCategory from '~/components/DecisionCategory.vue'

export default {
  components: { DecisionCategory },
  setup () {
    const title = 'Oracle integrity'
    const description = `
      Oracles are software and hardware agents that interface with smart contracts in order to provide them with external data.
      To ensure the integrity of data coming from external sources, oracles can make use of cryptographic proofs, 
      aggregated data and reputation systems to attest accuracy, validity and the origin of data
    `

    const steps = {
      step0: {
        title: 'Is there a substantial risk for erroneous or malicious data coming from external systems?',
        info: 'Oracle attestation methods can protect against data faults originating from external systems that can’t be recognized by DLT networks.',
        inclusionCriteria: ['Unreliable input data', 'Untrusted data sources', 'Risk of fraud'],
        exclusionCriteria: [],
        yes: 'step1',
        no: ['Oracle attestation is not required'],
      },
      step1: {
        title: 'Can same data be obtained from multiple sources?',
        info: 'By aggregating data from multiple sources, the impact of individual faults can be reduced. Oracles can use cryptographic proofs to verify the integrity of data coming from a single source.',
        inclusionCriteria: ['Multiple data sources'],
        exclusionCriteria: [],
        continue: 'step2',
        yes: ['Data aggregation'],
        no: ['Cryptographic proofs'],
      },
      step2: {
        title: 'Can data sources be reliably identified?',
        info: 'Identities can be used to build reputation systems, while data sources that can’t be reliably verified can be attest by oracles using cryptographic proofs.',
        inclusionCriteria: ['Verifiable sources'],
        exclusionCriteria: [],
        yes: ['Reputation system'],
        no: ['Cryptographic proofs'],
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
