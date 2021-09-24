![4241df80-ec7a-11ea-8a6a-16405d93eb0b](https://user-images.githubusercontent.com/55017307/134694697-cdc830ba-8fb6-4b3d-9144-d3cb40563a5b.jpg)

## Why should you use Ethers?

most people when they're talking about working with a client-side decentralized application they usually talk about using Web3 which is a very popular library for communicating with an ethereum node and then displaying information on a client such as the browser or a mobile application

ethersJS does the same exact thing but in my opinion seems to do this much more simply and with less code. so some of the features of ethersJS: it's very tiny in size it's only 284 kilobytes uncompressed and if you actually get the minified files it's 88 kilobytes. it's able to import and export mnemonic phrases (those twelve word backup phrases you see all the time), import and export JSON wallets and then import and export private keys.

It's also typescript ready so if you're experimenting with typescript or you're writing all of your applications in typescript it has all the typing definitions ready so you can get all that cool autocomplete goodness whenever you're programming.

my favorite feature is the ability to use `human readable ABIs`: with Web3 you have to basically compile your smart contract get the ABI which is just this huge unreadable JSON mess that you either copy and paste into your client-side application or put into a separate file and then read that in and then go ahead and use that to instantiate a contract, but with ethersJS we have what is called a human
readable API and basically all that is is taking a function signature just a one-liner that you can easily read and understand and then using that to instantiate your contract

<br>

```bash
npm init -y
npm install ethers
```

<br>

```javascript
let ethers = require("ethers")

const main = async () => {
  const TOKEN_ADDRESS = "0xEe3cb16e758dF2bE1a95629581cAb9c1CD77BB0D"

  let wallet1 = new ethers.Wallet.fromMnemonic(process.env.PHRASE_1)
  let wallet2 = new ethers.Wallet.fromMnemonic(process.env.PHRASE_2)

  let provider = ethers.getDefaultProvider("rinkeby")

  wallet1 = wallet1.connect(provider)
  wallet2 = wallet2.connect(provider)

  // human readable ABI - only specify functions that you are going to use

  let abi = [
    "function faucet() public",
    "function balanceOf(address who) external view returns (uint256)",
    "function transfer(address to, uint256 value) external returns (bool)",
  ]

  let token = new ethers.Contract(FUNC_TOKEN_ADDRESS, abi, wallet1)

  let tx = await token.faucet()
  await tx.wait()

  let amount1 = await token.balanceOf(wallet1.address)
  let amount2 = await token.balanceOf(wallet2.address)
  console.log("Balance #1: ", ethers.utils.formatEther(amount1))
  console.log("Balance #2: ", ethers.utils.formatEther(amount2))

  tx = await token.transfer(wallet2.address, ethers.utils.parseEther("100"))
  console.log("\nwaiting for transaction to be mined...\n")
  await tx.wait()

  amount1 = await token.balanceOf(wallet1.address)
  amount2 = await token.balanceOf(wallet2.address)
  console.log("Balance #1: ", ethers.utils.formatEther(amount1))
  console.log("Balance #2: ", ethers.utils.formatEther(amount2))
}

main()
```
