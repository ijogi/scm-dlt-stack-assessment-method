<template>
  <div class="container">
    <div class="row px-sm-0 heading-row">
      <div class="col">
        <h1 class="mb-4">
          Result
        </h1>

        <p class="px-md-5 py-3">
          Based on your decisions the following feature requirements, qualities and peripheral technologies were identified. Feature requirements and qualities can be combined with
        <a href="https://dss-mcdm.com/Default" target="_blank">Blockchain Platform Selection DSS</a>
        to determine suitable blockchain platforms.
        </p>
      </div>
    </div>

    <div class="row my-4">
      <h2 class="px-5 mt-4">Feature requirements</h2>
    </div>
    <div class="row my-4 fade-in">
      <div class="col text-left px-5">
        <h4 class="mb-4">Must have</h4>
        <p v-for="feature of mustHave" :key="feature.name">
          {{ feature.name }}
        </p>
      </div>
      <div v-if="shouldHave.length" class="col text-left px-5">
        <h4 class="mb-4">Should have</h4>
        <p v-for="feature of shouldHave" :key="feature.name">
          {{ feature.name }}
        </p>
      </div>
      <div v-if="coulddHave" class="col text-left px-5">
        <h4 class="mb-4">Could have</h4>
        <p v-for="feature of coulddHave" :key="feature.name">
          {{ feature.name }}
        </p>
      </div>
    </div>

    <div class="row my-4 fade-in">
      <div class="col text-left px-5">
        <h2 class="my-4">Qualities</h2>
        <p v-for="quality of qualities" :key="quality.name">
          {{ quality.name }} - {{ quality.value }}
        </p>
      </div>
      <div v-if="technologies.length" class="col text-left px-5">
        <h2 class="my-4">Peripheral technologies</h2>
        <p v-for="technology of technologies" :key="technology.name">
          {{ technology.name }}
        </p>
      </div>
    </div>

    <div class="row mb-5">
      <h4 class="px-5 mt-4">
        Criteria
        <span v-b-toggle.collapse @click="isOpen = !isOpen">
          <b-icon :icon="isOpen ? 'chevron-up' : 'chevron-down'" shift-v="5" font-scale="0.5" />
        </span>
      </h4>
    </div>
    <b-collapse id="collapse">
      <div class="row row-cols-2 fade-in">
        <div 
          v-for="(values, key) in criteria" 
          :key="key"
          class="col text-left my-4 px-5"
        >
          <template v-if="values.length">
            <p>{{ key }} criteria</p>
            <p v-for="(value, index) in values" :key="index">
              <small>{{ value }}</small>
            </p>
          </template>
        </div>
      </div>
    </b-collapse>

  </div>
</template>

<script>
import { ref, onMounted, useStore } from '@nuxtjs/composition-api'

import { VALUE, TYPE } from '~/constants'

export default {
  setup () {
    const { dispatch, state } = useStore()
    const isOpen = ref(false)

    onMounted(() => dispatch('setProgress', 6))
    
    let { criteria } = state
    const { requirements } = state

    const getReqsByType = (type) => Object.values(requirements)
      .reduce((acc, val) => acc.concat(val), [])
      .filter((r) => r.type === type)

    const featureRequirements = getReqsByType(TYPE.REQ)

    const mustHave = featureRequirements.filter((f) => f.value === VALUE.MUST_HAVE)
    const shouldHave = featureRequirements.filter((f) => f.value === VALUE.SHOULD_HAVE)
    const coulddHave = featureRequirements.filter((f) => f.value === VALUE.COULD_HAVE)

    let qualities = []
    getReqsByType(TYPE.QUALITY).map((q) => {
        if (qualities.findIndex((f) => f.name === q.name && f.value === q.value) < 0) {
          qualities.push(q)
        }
    })

    const technologies = getReqsByType(TYPE.TECH)
  
    return {
      isOpen,
      mustHave,
      shouldHave,
      coulddHave,
      qualities,
      technologies,
      criteria,
    }
  }
}
</script>