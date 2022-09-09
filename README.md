# Send Signed Transcation BSC Testnet

### Configuaration for Testnet
- networkId: 97
- chainId: 97
- name: 'Binance Smart Chain Testnet'


### Common
`const customChainParams = { name: 'Binance Smart Chain Testnet', chainId: 97, networkId: 97 }`

`const common = Common.default.forCustomChain('ropsten', customChainParams, 'petersburg');`
