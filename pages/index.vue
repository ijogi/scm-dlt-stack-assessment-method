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

export default {
  components: { DecisionCategory },
  setup () {
    const title = 'Network structure'
    const description = `
      DLT networks are composed of peer-to-peer (P2P) nodes running specialised software that allows them to store and replicate the state of a distributed ledger. 
      Public networks allow anyone to view and instantiate transactions as well as host nodes that form the network. 
      Private networks restrict access to a network based on established entities and are governed by a single organisation or a consortium.
    `

    const steps = {
      step0: {
        title: 'Does the use case require control over the governance of a DLT network?',
        info: 'Governance determines who can host nodes, access or make changes to the network and manage network operations.',
        inclusionCriteria: ['Data privacy', 'Restricted access', 'Control over governance', 'High throughput'],
        exclusionCriteria: ['Transparency', 'Open governance', 'Decentralization'],
        yes: ['Private network (must-have)'],
        no: 'step1',
      },
      step1: {
        title: 'Does the use case require data transparency or open governance of the network?',
        info: 'Transparency provides SCM process visibility that can be used to verify data and to provide data provenance. Open governance can protect against concentration of influence over the operations or management of a DLT network.',
        inclusionCriteria: ['Transparency', 'Open governance', 'Decentralization'],
        exclusionCriteria: ['Data privacy', 'Restricted access', 'Control over governance', 'High throughput'],
        yes: ['Public network (must-have)'],
        no: 'step2',
      },
      step2: {
        title: 'Does the use case require a highly customizable or a high performance DLT network?',
        info: 'Customization can be required to alter the behaviour of the core protocol in order to change ledger architecture or the consensus mechanism.',
        inclusionCriteria: ['Control over governance', 'High throughput'],
        exclusionCriteria: ['Open governance'],
        yes: ['Private network (should-have)', 'High transaction speed', 'Protocol layer (must-have)'],
        no: ['Private network (could-have)', 'Public network (could-have)'],
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
