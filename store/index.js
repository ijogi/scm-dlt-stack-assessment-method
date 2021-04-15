import { NAME, VALUE, TYPE } from '~/constants'

export const state = () => ({
  requirements: {
    network: [],
    permission: [],
    oracle: [],
    iot: [],
    scalability: [],
    interoperability: [],
    static: [
      { name: NAME.SMART_CONTRACTS, value: VALUE.MUST_HAVE, type: TYPE.REQ },
      { name: NAME.TURING_COMPLETE, value: VALUE.MUST_HAVE, type: TYPE.REQ },
      { name: NAME.ENTERPRISE, value: VALUE.MUST_HAVE, type: TYPE.REQ },
      { name: NAME.NETWORK_LAYER, value: VALUE.MUST_HAVE, type: TYPE.REQ },
      { name: NAME.APPLICATION_LAYER, value: VALUE.MUST_HAVE, type: TYPE.REQ },
      { name: NAME.TECH_MATURITY, value: VALUE.HIGH, type: TYPE.QUALITY },
    ],
  },
  criteria: {
    network: [],
    permission: [],
    oracle: [],
    iot: [],
    scalability: [],
    interoperability: [],
  }
})

export const mutations = {
  setRequirements(state, { category, requirements }) {
    state.requirements[category] = requirements
  },
  setCriteria(state, { category, criteria }) {
    state.criteria[category] =  criteria
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
}
