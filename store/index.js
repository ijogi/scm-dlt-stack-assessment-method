/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Features from '~/models/features'
import Qualities from '~/models/qualities'

import { TYPE, VALUE } from '~/constants'

export const state = () => ({
  requirements: {
    network: [],
    permission: [],
    oracle: [],
    iot: [],
    scalability: [],
    interoperability: [],
    static: [
      Features.getSmartContracts(VALUE.MUST_HAVE),
      Features.getTuringComplete(VALUE.MUST_HAVE),
      Features.getEnterpriseIntegr(VALUE.MUST_HAVE),
      Features.getNetworkLayer(VALUE.MUST_HAVE),
      Features.getAppLayer(VALUE.MUST_HAVE),
      Qualities.getTechMaturity(VALUE.HIGH),
    ],
  },
  criteria: {
    network: [],
    permission: [],
    oracle: [],
    iot: [],
    scalability: [],
    interoperability: [],
  },
  progress: 0,
})

const getReqsByType = (requirements, type, value) => Object.values(requirements)
  .filter(Boolean)
  .reduce((acc, val) => acc.concat(val), [])
  .filter((r) => r.type === type)
  .filter((r) => (value ? r.value === value : true))

export const getters = {
  mustHave: (state) => getReqsByType(state.requirements, TYPE.REQ, VALUE.MUST_HAVE),
  shouldHave: (state) => getReqsByType(state.requirements, TYPE.REQ, VALUE.SHOULD_HAVE),
  couldHave: (state) => getReqsByType(state.requirements, TYPE.REQ, VALUE.COULD_HAVE),
  qualities(state) {
    const qualities = []
    getReqsByType(state.requirements, TYPE.QUALITY).forEach((q) => {
      if (qualities.findIndex((f) => f.name === q.name && f.value === q.value) < 0) {
        qualities.push(q)
      }
    })
    return qualities
  },
  technologies: (state) => getReqsByType(state.requirements, TYPE.TECH),
}

export const mutations = {
  setRequirements(state, { category, requirements }) {
    state.requirements[category] = requirements
  },
  setCriteria(state, { category, criteria }) {
    state.criteria[category] = criteria
  },
  setProgress(state, categoryStep) {
    state.progress = categoryStep
  },
}

export const actions = {
  setRequirements({ commit }, payload) {
    commit('setRequirements', payload)
  },
  setCriteria({ commit }, payload) {
    commit('setCriteria', payload)
  },
  setProgress({ commit }, categoryStep) {
    commit('setProgress', categoryStep)
  },
}
