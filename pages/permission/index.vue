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

import Features from '~/models/features'

import { VALUE } from '~/constants'

export default {
  components: { DecisionCategory },
  setup() {
    const { dispatch } = useStore()

    onMounted(() => dispatch('setProgress', 1))

    const title = 'Permission model'
    const description = `
      A permission model determines access rights on a DLT network. 
      The two main permission models used in DLT are permissioned and permissionless. 
      Permissionless model employed by public DLTs, allows anyone to view the state of a ledger, 
      operate a node and access smart contracts. Permissioned DLTs determine access rights based on established identities.
      Data privacy and security can be further enhanced 
      with the inclusion of different privacy-oriented 
      technologies that leverage cryptographic techniques to obfuscate, encrypt or 
      prove the existence of information without revealing it.
    `

    const steps = {
      step0: {
        title: 'Does the use case require storing unhashed data on a distributed ledger?',
        info: 'Storing hashes instead of raw data enables to verify the integrity off-chain data, while also limiting utility for other use cases.',
        inclusionCriteria: ['Ledger used as a database', 'On-chain business logic'],
        exclusionCriteria: ['Used for off-chain data verification'],
        yes: 'step1',
        no: [
          Features.getPermissioned(VALUE.COULD_HAVE),
          Features.getPermissionless(VALUE.COULD_HAVE),
        ],
      },
      step1: {
        title: 'Does the use case require access control based on established identities?',
        info: 'Identities can be used to grant different levels of access and to comply with regulations such as Know Your Client (KYC) requirements.',
        inclusionCriteria: ['Identity based access', 'Data privacy'],
        exclusionCriteria: ['Identity based access is not required', 'Open access'],
        yes: [
          Features.getPermissioned(VALUE.MUST_HAVE),
          Features.getPrivacyTech(VALUE.COULD_HAVE),
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
          Features.getPermissioned(VALUE.COULD_HAVE),
          Features.getPermissionless(VALUE.COULD_HAVE),
        ],
      },
      step3: {
        title: 'Does the use case require data to be verifiable by anyone on the network?',
        info: 'Use cases that require keeping data contents confidential while making verification available to all network participants, can utilize various privacy technologies to do so.',
        inclusionCriteria: ['Data is verifiable across the network'],
        exclusionCriteria: ['Data is available only to certain parties'],
        yes: [
          Features.getPermissionless(VALUE.MUST_HAVE),
          Features.getPrivacyTech(VALUE.MUST_HAVE),
        ],
        no: [
          Features.getPermissioned(VALUE.MUST_HAVE),
          Features.getPrivacyTech(VALUE.COULD_HAVE),
        ],
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
