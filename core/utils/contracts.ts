import { getContract, readContract } from "thirdweb";
import { arbitrumSepolia, sepolia } from "thirdweb/chains";
import { client } from "components/venomConnect";
//import ETHRegistrarControllerAbi from 'abi/ETHRegistrarController.json';

export const ETHRegistrarController = getContract({
  client: client,
  address: "0x89C108a78Ef261a9F9e977E566b310cB3518E714",
  chain: arbitrumSepolia,
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "secret",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address",
        },
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
        {
          internalType: "bool",
          name: "reverseRecord",
          type: "bool",
        },
        {
          internalType: "uint32",
          name: "fuses",
          type: "uint32",
        },
        {
          internalType: "uint64",
          name: "wrapperExpiry",
          type: "uint64",
        },
      ],
      name: "makeCommitment",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "secret",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address",
        },
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
        {
          internalType: "bool",
          name: "reverseRecord",
          type: "bool",
        },
        {
          internalType: "uint32",
          name: "fuses",
          type: "uint32",
        },
        {
          internalType: "uint64",
          name: "wrapperExpiry",
          type: "uint64",
        },
      ],
      name: "register",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "commitment",
          type: "bytes32",
        },
      ],
      name: "commit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});

export const PriceOracle = getContract({
  client: client,
  address: "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165",
  chain: arbitrumSepolia,
});

export const Resolver = getContract({
  client: client,
  address: "0x7016f6BAfD4Ae35a30DD264Ce8EEcA16AB417fAD",
  chain: arbitrumSepolia,
});

export const ReverseRegistrar = getContract({
  client: client,
  address: "0xd05661277665E9FB85d5AcB5CBb30de2D6076988",
  chain: arbitrumSepolia,
  abi : [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "setName",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
  ]
});

export const addresses = {
  priceOracle: "0x03c87b00FE9eb6079674DfD3299c86246b69C352",
  ENSDeployer: "0x2Ded92ED6b36393Ca566b3e305F13e0E29932053",
  ENSRegistry: "0x559Ab8a76956436B16918CfDfB291d768264CdEc",
  BaseRegistrarMetadataService: "0x23EcFAD91453dAbDF384930beb7A99838C64465D",
  BaseRegistrarImplementation: "0xAa86685E6f1470338F73a707eDb0Da5F61f7CA9F",
  FIFSRegistrar: "0x77A09c0d4bDB5B9B55434e82317B0bd5e710AbB3",
  ReverseRegistrar: "0xd05661277665E9FB85d5AcB5CBb30de2D6076988",
  MetadataService: "0x46183026f37ADFB456b7a759269fB24c55dc5D65",
  MetadataService721: "0x23EcFAD91453dAbDF384930beb7A99838C64465D",
  NameWrapper: "0x955357E06046C91186cf4571f4dD729157bFBCfB",
  ETHRegistrarController: "0x89C108a78Ef261a9F9e977E566b310cB3518E714",
  PublicResolver: "0x7016f6BAfD4Ae35a30DD264Ce8EEcA16AB417fAD",
  UniversalResolver: "0x8732a41F2C863c83452B863103D7a32bAD5E970e",
  Multicall: "0xd4a0B47A2ebfCD9E3b921D0d4236CED63f631186",
};


//https://api.studio.thegraph.com/query/85626/monid/v0.0.1


//0x694AA1769357215DE4FAC081bf1f309aDC325306
