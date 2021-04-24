<template>
  <div class="container">
    <div class="row px-md-5 heading-row">
      <div class="col">
        <h1 class="mb-4">
          Decision outcome
        </h1>

        <p class="px-md-5 py-3">
          Based on your decisions the following feature requirements,
          qualities and peripheral technologies were identified.
          Feature requirements and qualities can be combined with
          <a href="https://dss-mcdm.com/Default" target="_blank">Blockchain Platform Selection DSS</a>
          to determine suitable DLT platforms.
        </p>
      </div>
    </div>

    <div class="row my-4">
      <div class="col px-sm-0 px-md-5 text-left">
        <h2 class="mt-4">
          Feature requirements
        </h2>
        <em>Features and components of a suitable DLT stack</em>
        <hr>
      </div>
    </div>

    <div
      class="row row-cols-1 my-4 fade-in"
      :class="{
        'row-cols-md-3': shouldHave.length && couldHave.length,
        'row-cols-md-2': (!shouldHave.length && couldHave.length)
          || (shouldHave.length && !couldHave.length),
      }"
    >
      <client-only>
        <result-column v-if="mustHave.length" :fields="mustHave">
          <h4 class="mb-4">
            Must have
          </h4>
        </result-column>

        <result-column v-if="shouldHave.length" :fields="shouldHave">
          <h4 class="mb-4">
            Should have
          </h4>
        </result-column>

        <result-column v-if="couldHave.length" :fields="couldHave">
          <h4 class="mb-4">
            Could have
          </h4>
        </result-column>
      </client-only>
    </div>

    <div class="row row-cols-1 row-cols-md-2 my-4 fade-in">
      <client-only>
        <result-column v-if="qualities.length" :fields="qualities">
          <h2 class="my-4">
            Qualities
          </h2>
          <em>Qualities of DLT platforms that need to be supported</em>
          <hr>
        </result-column>

        <result-column v-if="technologies.length" :fields="technologies">
          <h2 class="my-4">
            Peripheral technologies
          </h2>
          <em>Technologies that interface with DApps to provide them with improved capabilities</em>
          <hr>
        </result-column>
      </client-only>
    </div>

    <div class="row mb-5">
      <div class="col text-left px-sm-0 px-md-5">
        <h4 class="mt-4">
          Criteria selected in the decision process
        </h4>
        <em>
          These criteria helped to determine which technologies meet the use case requirements
        </em>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-2 fade-in">
      <client-only>
        <div
          v-for="(values, key) in criteria"
          :key="key"
          class="col text-left mb-4 px-sm-0 px-md-5"
        >
          <template v-if="values.length">
            <p>{{ key }} criteria</p>
            <hr>
            <p v-for="(value, index) in values" :key="index">
              <small>{{ value }}</small>
            </p>
          </template>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import {
  onMounted, useStore, computed,
} from '@nuxtjs/composition-api'

import ResultColumn from '~/components/ResultColumn.vue'

export default {
  components: { ResultColumn },
  setup() {
    const { dispatch, state, getters } = useStore()

    onMounted(() => dispatch('setProgress', 6))

    const mustHave = computed(() => getters.mustHave)
    const shouldHave = computed(() => getters.shouldHave)
    const couldHave = computed(() => getters.couldHave)
    const qualities = computed(() => getters.qualities)
    const technologies = computed(() => getters.technologies)
    const criteria = computed(() => state.criteria)

    return {
      mustHave,
      shouldHave,
      couldHave,
      qualities,
      technologies,
      criteria,
    }
  },
}
</script>
