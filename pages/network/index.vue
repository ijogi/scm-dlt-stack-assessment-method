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
import DecisionCategory from '~/components/DecisionCategory.vue'

import { NAME, VALUE, TYPE } from '~/constants'

export default {
  components: { DecisionCategory },
  setup () {
    const title = 'Network structure'
    const description = `
      DLT networks are composed of peer-to-peer (P2P) nodes running specialised software that allows to store and replicate the state of a distributed ledger. 
      Public networks allow anyone to view and instantiate transactions as well as host nodes that form the network. Public networks achieve network security and resilience through decentralisation since compromising large networks can become infeasible due to the resources it would take to do so. 
      Private networks restrict access to a network based on established entities and are governed by a consortium of stakeholders or a single organisation. Private networks are more centralised, but can achieve higher transaction throughputs. 
    `

    const steps = {
      step0: {
        title: 'Does the use case require control over the governance of a DLT network?',
        info: 'Governance determines who can host nodes, access or make changes to the network and manage network operations.',
        inclusionCriteria: ['Control over network governance', 'Restricted access', 'High throughput', 'Data privacy'],
        exclusionCriteria: ['Control over network governance is not required'],
        yes: [
          { name: NAME.PRIVATE_NETWORK, value: VALUE.MUST_HAVE, type: TYPE.REQ },
        ],
        no: 'step1',
      },
      step1: {
        title: 'Does the use case require data transparency or open governance of the network?',
        info: 'Transparency provides SCM process visibility that can be used to verify data and to provide data provenance. Open governance can protect against concentration of influence over the operations or management of a DLT network.',
        inclusionCriteria: ['Data transparency', 'Open governance', 'Decentralization'],
        exclusionCriteria: ['Data transparecny is not required', 'Open governance is not required'],
        yes: [
          { name: NAME.PUBLIC_NETWORK, value: VALUE.MUST_HAVE, type: TYPE.REQ },
        ],
        no: 'step2',
      },
      step2: {
        title: 'Does the use case require a highly customizable or a high performance DLT network?',
        info: 'Customization can be required to alter the behaviour of the core protocol in order to change ledger architecture or the consensus mechanism.',
        inclusionCriteria: ['Modifiable core protocol', 'High throughput'],
        exclusionCriteria: ['Highly customizable network is not required', 'High performance is not required'],
        yes: [
          { name: NAME.PRIVATE_NETWORK, value: VALUE.SHOULD_HAVE, type: TYPE.REQ },
          { name: NAME.TRANSACTION_SPEED, value: VALUE.HIGH, type: TYPE.QUALITY },
          { name: NAME.PROTOCOL_LAYER, value: VALUE.MUST_HAVE, type: TYPE.REQ },
        ],
        no: [
          { name: NAME.PRIVATE_NETWORK, value: VALUE.COULD_HAVE, type: TYPE.REQ },
          { name: NAME.PUBLIC_NETWORK, value: VALUE.COULD_HAVE, type: TYPE.REQ },
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
