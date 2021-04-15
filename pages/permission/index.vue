<template>
  <decision-category 
    :title="title"
    :description="description"
    :steps="steps"
    current-page="permission"
    next-page="oracle-integrity"
  />
</template>

<script>
import DecisionCategory from '~/components/DecisionCategory.vue'

export default {
  components: { DecisionCategory },
  setup () {
    const title = 'Permission model'
    const description = `
      A permission model determines the access rights on a DLT network. 
      The two main permission models used in DLT are permissioned and permissionless. 
      The permissionless model employed by public DLTs, allows anyone to view the state of a ledger, 
      operate a node and access smart contracts. Permissioned DLTs determine access rights based on established identities.
    `

    const steps = {
      step0: {
        title: 'Does the use case require storing unhashed data on a distributed ledger?',
        info: 'Storing hashes instead of raw data enables to verify the integrity off-chain data, while also limiting utility for other use cases.',
        inclusionCriteria: [],
        exclusionCriteria: [],
        yes: 'step1',
        no: ['Permissionless (could-have)', 'Permissioned (could-have)'],
      },
      step1: {
        title: 'Does the use case require access control based on established identities?',
        info: 'Storing hashes instead of raw data enables to verify the integrity off-chain data, while also limiting utility for other use cases.',
        inclusionCriteria: ['Identity based access', 'Data privacy'],
        exclusionCriteria: [],
        yes: ['Privacy technologies (could-have)', 'Permissioned (must-have)'],
        no: 'step2',
      },
      step2: {
        title: 'Does the use case involve confidential data or compliance requirements for data storage?',
        info: 'Regulations can pose requirements for the way certain data is handled. Data confidentiality can also be required to protect sensitive data from competitors or adversaries.',
        inclusionCriteria: ['Data privacy'],
        exclusionCriteria: [],
        yes: 'step3',
        no: ['Permissioned (could-have)', 'Permissionless (could-have)'],
      },
      step3: {
        title: 'Does the use case require data to be publicly verifiable?',
        info: 'Use cases that require keeping data confidential while still being publicly available can utilize various privacy technologies that enable to verify data while keeping its content undisclosed.',
        inclusionCriteria: ['Transparency'],
        exclusionCriteria: [],
        yes: ['Permissionless (must-have)', 'Privacy technologies (must-have)'],
        no: ['Privacy technologies (could-have)', 'Permissioned (must-have)'],
      }
    }
  
    return {
      title,
      description,
      steps,
    }
  }
}
</script>
