<div align="center">

![4241df80-ec7a-11ea-8a6a-16405d93eb0b](https://user-images.githubusercontent.com/55017307/134694697-cdc830ba-8fb6-4b3d-9144-d3cb40563a5b.jpg)

# Example

</div>

for a long time web3 has been the most popular library to interact with the ethereum blockchain, but another library ethersJS is catching up quickly.

Compared to web3 it has a couple of advantages such as a much smaller size which makes your front-end load way faster, no compile dependencies which were causing some issue to some windows users for web3, written in typescript

if you're a beginner and you don't know web3 yet you should learn web3 first.

to set a transaction in ethers we need to use a kind of object called a signer, we can get a signer from a provider or we can also instantiate a signer on its own for example with the wallet api but i'm not going to cover this here.

this separation between provider and signer this is unique to ethers in web3 where this is actually merged into the same concept.

```javascript
const { ethers } = require("ethers")
const MyContractArtifact = require("./build/contracts/MyContract.json")

/*
 * for frontend
 * import { ethers } from 'ethers';
 * import MyContractArtifact from './build/contracts/MyContract';
 */

const CONTRACT_ADDRESS = MyContractArtifact.networks["5777"].address

// connecting to Ganache, direct eth node
const provider = new ethers.providers.JsonRpcProvider("http://localhost:9545")

/*
 * for metamask
 * const provider = new ethers.providers.Web3Provider(window.ethereum);
 *
 * for connection to mainnet (development)
 * const provider = new ethers.providers.getDefaultProvider();
 *
 * with your own API KEYS (production)
 * const provider = new ethers.providers.getDefaultProvider({infura: INFURA_KEY, alchemy: ALCHEMY_KEY, etc...});
 *
 * for connection to a public testnet
 * const provider = new ethers.getDefaultProvider('kovan');
 *
 * With specific API
 * const provider = new ethers.providers.InfuraProvider('kovan', API_KEY);
 * const provider = new ethers.providers.AlchemyProvider('kovan', API_KEY);
 */

/*
 * If you want to add custom accounts
 * const wallet = new ethers.Wallet.fromMnemonic('mnemonic here', provider);
 * const signer = wallet.getSigner();
 */

async function main() {
  // ABI defines the  solidity interface of your contract
  const ABI = [
    "function data() view returns(uint)",
    "function setData(uint _data) external",
  ]

  // read from blockchain
  const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
  const value = await readOnlyContract.data()
  console.log(value.toString())

  // create a transaction
  const signer = provider.getSigner()
  await signer.sendTransaction({
    to: "0x2cfb04529afed0ceeb3e7518130e1843276c829b",
    value: 1000,
  })

  // if you create a Contract instance with a provider you can only read data
  // if you put a signer you can also send transactions
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
  const txResponse = await contract.setData(2)
  const txReceipt = await txResponse.wait()
  console.log(txReceipt)
}

main()
```

---

## Utils

ETH balances has 18 decimal points, the smallest unit is called wei.

- smart contracts use value in units (wei when we talk about ETH)
- humans have difficulties reading very big number so we parse the input

`1 ETH = 1000000000000000000 wei`

```javascript
// from wei to ether - useful to display value to user in UI
console.log(ethers.utils.formatEther(1000))

// from ether to wei - useful to pass value to your smart contracts
console.log(ethers.utils.parseEther("1.2"))

// useful for tokens that use a different number of decimals (USDC uses 6 for instance)
console.log(ethers.utils.formatUnits("1000", 18))
console.log(ethers.utils.parseUnits("2.3", 18))
```
