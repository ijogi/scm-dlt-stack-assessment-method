import { NAME, TYPE } from '~/constants'

export default {
  getDataAggregation: () => ({
    id: 'data-aggr',
    name: NAME.DATA_AGGREGATION,
    type: TYPE.TECH,
    description: `
      By aggregating data from multiple sources, the impact of individual 
      faults can be reduced.
    `,
  }),
  getRepSystem: () => ({
    id: 'rep-sys',
    name: NAME.REP_SYS,
    type: TYPE.TECH,
    description: `
      Reputation systems can be used to grade data sources based on their reliability and trustworthiness.
    `,
  }),
  getCryptProof: () => ({
    id: 'crypt-proof',
    name: NAME.CRYPT_PROOF,
    type: TYPE.TECH,
    description: `
      Oracles can make use of software, network and hardware-based proofs 
      to establish the authenticity of data coming from external sources. 
      Examples of such technologies are TLS notaries, TLS-N and Trusted Execution Environments (TEE).
    `,
  }),
  getIoT: () => ({
    id: 'iot',
    name: NAME.IOT,
    type: TYPE.TECH,
    description: `
      Internet of Things (IOT) refers to a network of physical devices that are capable of 
      connecting to the internet. IOT devices can perform various functions such as gathering 
      and communicating sensor readings and controlling processes through actuators. 
    `,
  }),
  getOffChainStorage: () => ({
    id: 'strg',
    name: NAME.OFF_CHAIN,
    type: TYPE.TECH,
    description: `
      Decentralized storage solutions aim to overcome the limitations on the 
      size of data that can be processed by distributed ledgers. Solutions such as 
      IPFS and FileCoin, Sia, Storj and Swar,m distribute files among peers in a P2P network and 
      can provide cryptoeconomic incentives to nodes hosting files. Data can also
      be stored off-chain by using traditional databases.
    `,
  }),
}
