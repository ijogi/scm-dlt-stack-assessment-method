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
        info: `
          Hashing is a cryptographic process by which arbitrary data can be turned into a fixed length incomprehensible string.
          Storing hashes of data instead of the data itself enables to verify the integrity of data stored outside a distributed ledger, while also limiting its utility for other use cases. 
          Storing raw data enables to use a distributed ledger as an immutable database that only allows to append new entries while disabling modifications to existing data.
        `,
        inclusionCriteria: ['Ledger used as a database'],
        exclusionCriteria: ['Used only for off-chain data verification'],
        yes: 'step1',
        no: [
          Features.getPermissioned(VALUE.COULD_HAVE),
          Features.getPermissionless(VALUE.COULD_HAVE),
        ],
      },
      step1: {
        title: 'Does the use case require access control based on established identities?',
        info: `
          Identities can be used to grant different levels of access for viewing records or to Dapp functionalities. 
          Identity based access can also help to make SCM Dapps compliant with regulations such as Know Your Client (KYC) requirements.
        `,
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
        info: 'Use cases that require keeping data contents confidential while making its existence or integrity verifiable, can utilize various privacy technologies to do so.',
        inclusionCriteria: ['Existence of data or its integrity needs to be verifiable across the network'],
        exclusionCriteria: ['Data contents are available only to certain parties'],
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
