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
import { useStore } from '@nuxtjs/composition-api'
import DecisionCategory from '~/components/DecisionCategory.vue'

export default {
  components: { DecisionCategory },
  setup () {
    const { state } = useStore()
    const { iot, network, permission } = state.requirements

    const offchainStorage = {
        title: 'Does the use case involve storing or processing large files such as images, videos or big documents?',
        info: 'Current DLT network designs aren’t well suited for processing large files, requiring off-chain data storage.',
        inclusionCriteria: ['Processing of large files'],
        exclusionCriteria: [],
        yes: ['Off-chain storage'],
        no: [],
    }

    const isPrivatePermissioned = network.includes('Private network (must-have)') && permission.includes('Permissioned (must-have)')

    const privatePermissioned = {
      yes: [
        ...offchainStorage.yes,
        'High transaction speed',
        'Scaling technologies (could-have)',
      ],
      no: [
        'High transaction speed',
        'Scaling technologies (could-have)',
      ]
    }

    const publicNetwork = {
      yes: [
        ...offchainStorage.yes,
        'High transaction speed',
        'Scaling technologies (must-have)',
      ],
      no: [
        'High transaction speed',
        'Scaling technologies (must-have)',
      ]
    }

    let steps

    if (iot.includes('High transaction speed')) {
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
          inclusionCriteria: [],
          exclusionCriteria: [],
          continue: 'step1',
          yes: ['High transaction speed'],
          no: ['Average transaction speed'],
        },
        step1,
      }
    }

    const title = 'Scalability'
    const description = `
      The scalability of a DLT network can be increased with the inclusion of scaling technologies.
    `
  
    return {
      title,
      description,
      steps,
    }
  }
}
</script>
