const { ethers } = require("ethers")
const MyContractArtifact = require("./build/contracts/MyContract.json")
const CONTRACT_ADDRESS = MyContractArtifact.networks["5777"].address
const provider = new ethers.providers.JsonRpcProvider("http://localhost:9545")

async function main() {
  const ABI = [
    "function data() view returns(uint)",
    "function setData(uint _data) external",
  ]

  const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
  const value = await readOnlyContract.data()
  console.log(value.toString())

  const signer = provider.getSigner()
  await signer.sendTransaction({
    to: "0x2cfb04529afed0ceeb3e7518130e1843276c829b",
    value: 1000,
  })

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
  const txResponse = await contract.setData(2)
  const txReceipt = await txResponse.wait()
  console.log(txReceipt)
}

main()
