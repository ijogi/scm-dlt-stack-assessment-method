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
import { onMounted, useStore } from '@nuxtjs/composition-api'
import DecisionCategory from '~/components/DecisionCategory.vue'

import { NAME, VALUE, TYPE } from '~/constants'

export default {
  components: { DecisionCategory },
  setup () {
    const { dispatch } = useStore()

    onMounted(() => dispatch('setProgress', 1))
    
    const title = 'Permission model'
    const description = `
      A permission model determines access rights on a DLT network. 
      The two main permission models used in DLT are permissioned and permissionless. 
      Permissionless model employed by public DLTs, allows anyone to view the state of a ledger, 
      operate a node and access smart contracts. Permissioned DLTs determine access rights based on established identities.
    `

    const steps = {
      step0: {
        title: 'Does the use case require storing unhashed data on a distributed ledger?',
        info: 'Storing hashes instead of raw data enables to verify the integrity off-chain data, while also limiting utility for other use cases.',
        inclusionCriteria: ['Ledger used as a database', 'On-chain business logic'],
        exclusionCriteria: ['Off-chain data verification'],
        yes: 'step1',
        no: [
          { name: NAME.PERMISSIONLESS, value: VALUE.COULD_HAVE, type: TYPE.REQ },
          { name: NAME.PERMISSIONED, value: VALUE.COULD_HAVE, type: TYPE.REQ },
        ],
      },
      step1: {
        title: 'Does the use case require access control based on established identities?',
        info: 'Identities can be used to grant different levels of access and to comply with regulations such as Know Your Client (KYC) requirements.',
        inclusionCriteria: ['Identity based access', 'Data privacy'],
        exclusionCriteria: ['Transparency', 'Open access'],
        yes: [
          { name: NAME.PRIVACY_TECH, value: VALUE.COULD_HAVE, type: TYPE.REQ },
          { name: NAME.PERMISSIONED, value: VALUE.MUST_HAVE, type: TYPE.REQ },
        ],
        no: 'step2',
      },
      step2: {
        title: 'Does the use case involve confidential data or compliance requirements for data storage?',
        info: 'Regulations can pose requirements for the way certain data is handled. Data confidentiality can also be required to protect sensitive data from competitors or adversaries.',
        inclusionCriteria: ['Compliance requirements', 'Confidential data', 'Data privacy'],
        exclusionCriteria: ['Confidential data is not stored on the ledger'],
        yes: 'step3',
        no: [
          { name: NAME.PERMISSIONLESS, value: VALUE.COULD_HAVE, type: TYPE.REQ },
          { name: NAME.PERMISSIONED, value: VALUE.COULD_HAVE, type: TYPE.REQ },
        ],
      },
      step3: {
        title: 'Does the use case require data to be verifiable by anyone on the network?',
        info: 'Use cases that require keeping data contents confidential while making verification available to all network participants, can utilize various privacy technologies to do so.',
        inclusionCriteria: ['Transparency', 'Open access'],
        exclusionCriteria: ['Identity based access'],
        yes: [
          { name: NAME.PERMISSIONLESS, value: VALUE.MUST_HAVE, type: TYPE.REQ },
          { name: NAME.PRIVACY_TECH, value: VALUE.MUST_HAVE, type: TYPE.REQ },
        ],
        no: [
          { name: NAME.PRIVACY_TECH, value: VALUE.COULD_HAVE, type: TYPE.REQ },
          { name: NAME.PERMISSIONED, value: VALUE.MUST_HAVE, type: TYPE.REQ },
        ],
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
