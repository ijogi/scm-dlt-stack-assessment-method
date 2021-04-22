import { NAME, TYPE } from '~/constants'

export default {
  getPublicNetwork: (value) => ({
    id: 'pub-net',
    name: NAME.PUBLIC_NETWORK,
    value,
    type: TYPE.REQ,
    description: `
      Public networks allow anyone to view and instantiate transactions 
      as well as host nodes that form the network. Public networks achieve network 
      security and resilience through decentralisation since compromising large networks 
      can become infeasible due to the resources it would take to do so.
    `
  }),
  getPrivateNetwork: (value) => ({
    id: 'priv-net',
    name: NAME.PRIVATE_NETWORK,
    value,
    type: TYPE.REQ,
    description: `
      Private networks restrict access to a distributed ledger on the network level and are governed by a consortium of stakeholders or a single organisation. 
      This makes them less decentralised than public networks, but they can achieve higher transaction throughputs.
    `
  }),
  getProtocolLayer: (value) => ({ id: 'prot-l', name: NAME.PROTOCOL_LAYER, value, type: TYPE.REQ }),
  getPermissionless: (value) => ({
    id: 'perm-less',
    name: NAME.PERMISSIONLESS,
    value,
    type: TYPE.REQ,
    description: `
      The permissionless model employed by public DLTs, 
      allows anyone to view the state of a ledger, 
      operate a node and access smart contracts.
    `
  }),
  getPermissioned: (value) => ({
    id: 'permd',
    name: NAME.PERMISSIONED,
    value,
    type: TYPE.REQ,
    description: `
      Permissioned DLTs determine access rights based on established identities. 
      The need for permissioned DLTs originates from enterprise use cases where 
      different confidentiality and compliance requirements place restrictions 
      on data access and processing.
    `
  }),
  getPrivacyTech: (value) => ({
    id: 'priv-tech',
    name: NAME.PRIVACY_TECH,
    value,
    type: TYPE.REQ,
    description: `
      Data privacy and security can be enhanced by different privacy-oriented 
      technologies that leverage cryptographic techniques to obfuscate, 
      encrypt or prove the existence of information without revealing it. 
      Examples of privacy technologies are zero knowledge proofs, state channels, 
      indistinguishable obfuscation and homomorphic encryption.
    `
  }),
  getScalingTech: (value) => ({
    id: 'scal-tech',
    name: NAME.SCALING_TECH,
    value,
    type: TYPE.REQ,
    description: `
    On-chain scaling also known as layer 1 scaling, 
    aims to increase transaction throughput by making changes to the underlying DLT protocol. 
    These changes can include changing the size and content of transactions, network sharding, 
    parallel processing of transactions or by using Directed Acyclic Graphs. 
    Off-chain scaling also known as layer 2 scaling aims to increase transaction throughput by moving 
    some of the transactions away from the main ledger, while maintaining to use it sfor verifying and storing 
    the outcome of off-chain transactions. Examples of off-chain scaling solutions are state channels, side chains, plasma, ZK-rollups and cross-chains.
    `
  }),
  getInteroperability: (value) => ({
    id: 'interop',
    name: NAME.INTEROP,
    value,
    type: TYPE.REQ,
    description: `
      DLT interoperability allows DLT networks with different protocols to 
      interact and exchange data with each other, enabling to connect 
      different ecosystems and industry specific networks into greater value chains. 
      Without interoperability DLT networks, especially more purpose-built networks, 
      can run into the risk of turning into siloed ecosystems.
    `
  }),
  getSmartContracts: (value) => ({
    id: 'sc',
    name: NAME.SMART_CONTRACTS,
    value,
    type: TYPE.REQ,
    description: `
      Smart contracts are decentralised computer programs that are distributed amongst a 
      group of nodes in a DLT network. Smart contracts allow to encode conditions 
      for the exchange and management of arbitrary data or digital assets such as 
      cryptocurrencies and tokens. Because smart contracts can enforce agreements automatically, 
      they can replace the need for trusted intermediaries in many industries. For instance, a 
      smart contract can be the custodian of an asset until all the necessary conditions for 
      its transfer are met. When a smart contract is invoked, the computation is performed 
      simultaneously on different nodes in a network. The result of the computation is 
      decided by a consensus mechanism and appended to the distributed ledger.
    `
  }),
  getTuringComplete: (value) => ( {
    id: 'tc',
    name: NAME.TURING_COMPLETE,
    value,
    type: TYPE.REQ,
    description: `
      Turing complete smart contract programming languages enable to
      implement a variety of algorithms as opposed to limited scripted languages
      that have a reduced set of operations. 
    `
  }),
  getEnterpriseIntegr: (value) => ({
    id: 'entrp',
    name: NAME.ENTERPRISE,
    value,
    type: TYPE.REQ,
    description: `
      To provide integrations with centralised systems, 
      DLT platforms usually implement SDKs and software libraries written in 
      general purpose programming languages that enable to interact with 
      the distributed ledger using prevalent programming tools.
    `
  }),
  getNetworkLayer: (value) => ({
    id: 'net-l',
    name: NAME.NETWORK_LAYER,
    value,
    type: TYPE.REQ,
    description: `
      Network layer provides the P2P DLT network.
    `
  }),
  getAppLayer: (value) => ({
    id: 'app-l',
    name: NAME.APPLICATION_LAYER,
    value,
    type: TYPE.REQ,
    description: `
      Application layer enables to build applications on top of a DLT network.
    `
  }),
}
