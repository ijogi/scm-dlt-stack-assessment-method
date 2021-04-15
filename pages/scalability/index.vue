<template>
  <decision-category 
    :title="title"
    :description="description"
    :steps="steps"
    current-page="scalability"
    next-page="interoperability"
  />
</template>

<script>
import { onMounted, useStore } from '@nuxtjs/composition-api'
import DecisionCategory from '~/components/DecisionCategory.vue'

import { NAME, VALUE, TYPE } from '~/constants'

export default {
  components: { DecisionCategory },
  setup () {
    const { dispatch, state } = useStore()
    onMounted(() => dispatch('setProgress', 4))

    const { iot, network, permission } = state.requirements

    const title = 'Scalability'
    const description = `
      Scalability of a DLT network is largely determined by it's structure and the consensus mechanism used by the core protocol. 
      The scalability of a DLT network can be increased with the inclusion of scaling technologies.
    `

    const offchainStorage = {
        title: 'Does the use case involve storing or processing large files such as images, videos or big documents?',
        info: 'Current DLT network designs aren’t well suited for processing large files, requiring off-chain data storage.',
        inclusionCriteria: ['Processing or storing large files on-chain'],
        exclusionCriteria: ['Use case doesn\'t involve processing or storing large files on-chain'],
        yes: [{ name: NAME.OFF_CHAIN, type: TYPE.TECH }],
        no: [],
    }

    const isPrivatePermissioned = network
      .filter(Boolean)
      .find((n) => n.name === NAME.PRIVATE_NETWORK && n.value === VALUE.MUST_HAVE) 
    && permission
      .filter(Boolean)
      .find((p) => p.name === NAME.PERMISSIONED && p.value === VALUE.MUST_HAVE)

    const isIotIntegrated = iot
      .filter(Boolean)
      .find((i) => i.name === NAME.TRANSACTION_SPEED && i.value === VALUE.HIGH)

    const privatePermissioned = {
      yes: [
        ...offchainStorage.yes,
        { name: NAME.TRANSACTION_SPEED, value: VALUE.HIGH, type: TYPE.QUALITY },
        { name: NAME.SCALING_TECH, value: VALUE.COULD_HAVE, type: TYPE.REQ },
      ],
      no: [
        { name: NAME.TRANSACTION_SPEED, value: VALUE.HIGH, type: TYPE.QUALITY },
        { name: NAME.SCALING_TECH, value: VALUE.COULD_HAVE, type: TYPE.REQ },
      ]
    }

    const publicNetwork = {
      yes: [
        ...offchainStorage.yes,
        { name: NAME.TRANSACTION_SPEED, value: VALUE.HIGH, type: TYPE.QUALITY },
        { name: NAME.SCALING_TECH, value: VALUE.MUST_HAVE, type: TYPE.REQ },
      ],
      no: [
        { name: NAME.TRANSACTION_SPEED, value: VALUE.HIGH, type: TYPE.QUALITY },
        { name: NAME.SCALING_TECH, value: VALUE.MUST_HAVE, type: TYPE.REQ },
      ]
    }

    let steps

    if (isIotIntegrated) {
      if (isPrivatePermissioned) {
        steps = {
          step0: {
            ...offchainStorage, 
            ...privatePermissioned,
          }
        }
      } else {
        steps = {
          step0: {
            ...offchainStorage, 
            ...publicNetwork,
          }
        }
      }
    } else {
      const step1 = privatePermissioned
        ? { ...offchainStorage, ...privatePermissioned }
        : { ...offchainStorage, ...publicNetwork }

      steps = {
        step0: {
          title: 'Does the use case require smart contracts to process data in near real-time or in large volumes?',
          info: 'Near real-time processing of data allows to use DLT to autonomously execute business rules based on incoming data.',
          inclusionCriteria: ['Large data volumes', 'Near real-time data processing', 'Enterprise system integrations'],
          exclusionCriteria: ['Moderate data loads', 'Few integrations'],
          continue: 'step1',
          yes: [{ name: NAME.TRANSACTION_SPEED, value: VALUE.HIGH, type: TYPE.QUALITY }],
          no: [{ name: NAME.TRANSACTION_SPEED, value: VALUE.AVERAGE, type: TYPE.QUALITY }],
        },
        step1,
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
