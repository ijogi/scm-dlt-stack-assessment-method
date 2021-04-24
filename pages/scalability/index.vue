<template>
  <decision-category
    :title="title"
    :description="description"
    :steps="decisionSteps"
    current-page="scalability"
    next-page="interoperability"
  />
</template>

<script>
import { computed, onMounted, useStore } from '@nuxtjs/composition-api'
import DecisionCategory from '~/components/DecisionCategory.vue'

import Features from '~/models/features'
import Qualities from '~/models/qualities'
import Technologies from '~/models/technologies'

import { NAME, VALUE } from '~/constants'

export default {
  components: { DecisionCategory },
  setup() {
    const { dispatch, state } = useStore()
    onMounted(() => dispatch('setProgress', 4))

    const { iot, network, permission } = state.requirements

    const title = 'Scalability'
    const description = `
      Scalability refers to a DLT plaforms ability to support a high number of transactions per second (TPS),
      and is largely determined by the structure of a DLT network and the consensus mechanism used by the protocol. 
      Scalability is also tied to the level of decentralization, a relationship that is often 
      referred to as the Scalability Trilemma, according to which 
      increasing scalability of a DLT network tends to lower decentralisation and 
      network security. Scalability can also be increased with the inclusion of various technologies.
    `

    const offchainStorage = {
      title: 'Does the use case involve storing or processing large files such as images, videos or big documents?',
      info: 'Current DLT network designs aren’t well suited for processing large files, requiring off-chain data storage.',
      inclusionCriteria: ['Processing or storing large files'],
      exclusionCriteria: ['Use case doesn\'t involve processing or storing large files'],
      yes: [Technologies.getOffChainStorage()],
      no: [],
    }

    const isPrivateNetwork = network
      .filter(Boolean)
      .find((n) => n.name === NAME.PRIVATE_NETWORK && n.value === VALUE.MUST_HAVE)

    const isPermissioned = permission
      .filter(Boolean)
      .find((p) => p.name === NAME.PERMISSIONED && p.value === VALUE.MUST_HAVE)

    const isPrivatePermissioned = isPrivateNetwork && isPermissioned

    const isIotIntegrated = iot
      .filter(Boolean)
      .find((i) => i.name === NAME.TRANSACTION_SPEED && i.value === VALUE.HIGH)

    const privatePermissioned = [
      Features.getScalingTech(VALUE.COULD_HAVE),
      Qualities.getTransactionSpeed(VALUE.HIGH),
    ]

    const highPerformance = [
      Features.getScalingTech(VALUE.MUST_HAVE),
      Qualities.getTransactionSpeed(VALUE.HIGH),
    ]

    const highPerformanceCriteria = ['Near real-time data processing or large data volumes']

    let steps

    if (isIotIntegrated) {
      if (isPrivatePermissioned) {
        steps = {
          step0: {
            ...offchainStorage,
            additionalCriteria: highPerformanceCriteria,
            yes: [...privatePermissioned, ...offchainStorage.yes],
            no: privatePermissioned,
          },
        }
      } else {
        steps = {
          step0: {
            ...offchainStorage,
            additionalCriteria: highPerformanceCriteria,
            yes: [...highPerformance, ...offchainStorage.yes],
            no: highPerformance,
          },
        }
      }
    } else {
      steps = {
        step0: {
          title: 'Does the use case require smart contracts to process data in near real-time or in large volumes?',
          info: 'Near real-time processing of data allows to use DLT to autonomously execute business rules based on incoming data. Large volumes of data are common for DApps that process frequent data from multiple external sources.',
          inclusionCriteria: highPerformanceCriteria,
          exclusionCriteria: ['Moderate data loads', 'Few integrations with external systems'],
          continue: 'step1',
          yes: isPrivatePermissioned
            ? privatePermissioned
            : highPerformance,
          no: [Qualities.getTransactionSpeed(VALUE.AVERAGE)],
        },
        step1: {
          ...offchainStorage,
        },
      }
    }

    const decisionSteps = computed(() => steps)

    return {
      title,
      description,
      decisionSteps,
    }
  },
}
</script>
