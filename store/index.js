import Features from '~/models/features'
import Qualities from '~/models/qualities'

import { VALUE } from '~/constants'

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

export const mutations = {
  setRequirements(state, { category, requirements }) {
    state.requirements[category] = requirements
  },
  setCriteria(state, { category, criteria }) {
    state.criteria[category] =  criteria
  },
  setProgress(state, categoryStep) {
    state.progress = categoryStep
  },
  clearStore(state) {
    state = state()
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
