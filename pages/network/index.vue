<template>
  <decision-category
    :title="title"
    :description="description"
    :steps="steps"
    current-page="network"
    next-page="permission"
  />
</template>

<script>
import { onMounted, useStore } from '@nuxtjs/composition-api'
import DecisionCategory from '~/components/DecisionCategory.vue'

import Features from '~/models/features'
import Qualities from '~/models/qualities'

import { VALUE } from '~/constants'

export default {
  components: { DecisionCategory },
  setup() {
    const { dispatch } = useStore()

    onMounted(() => dispatch('setProgress', 0))

    const title = 'Network structure'
    const description = `
      DLT networks are composed of peer-to-peer (P2P) nodes running specialised software that allows to store and replicate the state of a distributed ledger. 
      Public networks allow anyone to view and instantiate transactions as well as host nodes that form the network. Public networks achieve network security and resilience through decentralisation since compromising large networks can become infeasible due to the resources it would take to do so. 
      Private networks restrict access to a network and are governed by a consortium of stakeholders or a single organisation. Private networks are more centralised, but can achieve higher transaction throughputs. 
    `

    const steps = {
      step0: {
        title: 'Does the use case require control over the governance of a DLT network?',
        info: `
          Control over governance fits use cases where stakeholders are determined based on the purpose of the network. 
          Governance determines who can host nodes, access or make changes to a DLT network and manage network operations.
        `,
        inclusionCriteria: ['Control over network governance', 'Restricted access', 'High throughput', 'Data privacy'],
        exclusionCriteria: ['Control over network governance is not required'],
        yes: [
          Features.getPrivateNetwork(VALUE.MUST_HAVE),
        ],
        no: 'step1',
      },
      step1: {
        title: 'Does the use case require data transparency or open governance of the network?',
        info: `
          Public blockchain networks are openly accessible, meaning that every transaction is visible to anyone on the network. 
          This makes verifying data easy while providing confidentiality requires additional technologies that are not typically part of the core platform. 
          Public networks are also governed by open communities that collectively decide what’s best for a network. 
          This can protect against concentration of influence while also making the underlying network susceptible 
          to changes that may affect the operations of a SCM Dapp.
        `,
        inclusionCriteria: ['Data transparency', 'Open governance', 'Decentralization'],
        exclusionCriteria: ['Data transparency is not required', 'Open governance is not required'],
        yes: [
          Features.getPublicNetwork(VALUE.MUST_HAVE),
        ],
        no: 'step2',
      },
      step2: {
        title: 'Does the use case require a highly customizable or a high performance DLT network?',
        info: `
          Customization can be required to alter the behaviour of the core protocol in order to change ledger architecture or the consensus mechanism.
          This can provide benefits for improving transaction performance or to make DLT compatible with complex systems.
        `,
        inclusionCriteria: ['Modifiable core protocol', 'High performance', 'DLT implemented in a technically complex environment'],
        exclusionCriteria: ['Protocol modifications are not neccessary', 'Average throughput'],
        yes: [
          Features.getPrivateNetwork(VALUE.SHOULD_HAVE),
          Features.getPublicNetwork(VALUE.COULD_HAVE),
          Qualities.getTransactionSpeed(VALUE.HIGH),
        ],
        no: [
          Features.getPrivateNetwork(VALUE.COULD_HAVE),
          Features.getPublicNetwork(VALUE.COULD_HAVE),
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
