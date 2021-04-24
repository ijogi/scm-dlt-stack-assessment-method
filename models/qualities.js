import { NAME, TYPE } from '~/constants'

export default {
  getTransactionSpeed: (value) => ({
    id: 'speed',
    name: NAME.TRANSACTION_SPEED,
    value,
    type: TYPE.QUALITY,
    description: `
      Transaction speed is determined by the consensus algorithm of a DLT network. 
      Consensus is the process by which nodes agree on state updates and is dependent 
      on the network structure and permission model. 
      Notable examples are Proof of Work (PoW), Proof of Stake (PoS), 
      Practical Byzantine Fault Tolerance (PBFT).`,
  }),
  getTechMaturity: (value) => ({
    id: 'maturity',
    name: NAME.TECH_MATURITY,
    value,
    type: TYPE.QUALITY,
    description: `
      A DLT platform’s maturity is determined by the breadth of its successful 
      application for producing value and by the community who actively 
      invests resources into improving and expanding the platform. 
      Mature platforms are in active use, support tooling for easier 
      development and have clear roadmaps for future developments and upgrades.
    `,
  }),
}
