export const state = () => ({
  requirements: {
    network: [],
    permission: [],
    oracle: [],
    iot: [],
    scalability: [],
    interoperability: [],
  },
})

export const mutations = {
  setRequirements(state, { category, requirements }) {
    state.requirements[category] = requirements
    console.log(state.requirements)
  },
  clearRequirements(state) {
    state = state()
  },
}

export const actions = {
  setRequirements({ commit }, payload) {
    commit('setRequirements', payload)
  },
}
