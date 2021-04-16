<template>
  <decision-category 
    :title="title"
    :description="description"
    :steps="steps"
    current-page="iot"
    next-page="scalability"
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

    onMounted(() => dispatch('setProgress', 3))

    const title = 'Internet of Things'
    const description = `
      Internet of Things (IOT) refers to a network of physical devices that are capable of connecting to the internet. 
      IOT devices can perform various functions such as gathering and communicating sensor readings and controlling processes through actuators. 
      Smart contracts connected with IOT devices enable to execute business logic in near real-time based on input data without relying on centralized gateways. 
    `

    const steps = {
      step0: {
        title: 'Can the use case be improved by gathering data from the environment of operations?',
        info: 'IOT can be used to monitor and relay data about different conditions and processes.',
        inclusionCriteria: ['Use case involves tangible assets', 'Conditions of assets affect business processes', 'Automated process tracking'],
        exclusionCriteria: ['Use case doesn\'t involve tangible assets'],
        yes: 'step1',
        no: [],
      },
      step1: {
        title: 'Does the use case require direct integration between IOT and a DLT network?',
        info: 'Direct integration allows to autonomously execute smart contracts in near real-time.',
        inclusionCriteria: ['DLT used to process IOT data', 'Highly automated'],
        exclusionCriteria: ['DLT used only to store IOT data'],
        yes: [
          { name: NAME.IOT, type: TYPE.TECH },
          { name: NAME.TRANSACTION_SPEED, value: VALUE.HIGH, type: TYPE.QUALITY },
        ],
        no: [{ name: NAME.IOT, type: TYPE.TECH }],
      },
    }
  
    return {
      title,
      description,
      steps,
    }
  }
}
</script>
