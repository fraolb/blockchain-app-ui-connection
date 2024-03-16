import { useState, useEffect } from "react";
import { ethers } from "ethers";
//0x5FbDB2315678afecb367f032d93F642f64180aa3
function App() {
  const [balance, setBalance] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [favoriteNumber, setFavouriteNumber] = useState(null);
  const [changeFavNum, setChangeFavNum] = useState(0);
  const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  let signer = null;
  let provider;
  let userAddress;

  const ABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "coinMintedTo",
          type: "address",
        },
        {
          internalType: "address",
          name: "liquidityWalletFees",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "liquidityFeeWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const ConnectWallet = async () => {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.enable(); // Request access to accounts
      // const userAddress = await provider.get
      signer = await provider.getSigner();
      userAddress = await signer.getAddress();

      let userBalanceFetch = await GetBalance(userAddress);
      //console.log("the user balance is ", userBalanceFetch);
      setUserBalance(userBalanceFetch);

      let contractBalanceFetch = await GetBalance(ContractAddress);
      setBalance(contractBalanceFetch);
      //console.log("the user Adrees is ", userAddress);

      ///the total supply
      console.log("the contract address is ", ContractAddress);
      const contractRO = new ethers.Contract(ContractAddress, ABI, provider);
      console.log("the contract is ", contractRO);
      const getTotalSupply = await contractRO.totalSupply();
      console.log("the total supply of the coin is ", getTotalSupply);
    }
  };

  const GetBalance = async (e) => {
    // e.PreventDefault();
    const balance = await provider.getBalance(e);
    const actualVal = ethers.formatEther(balance);
    return actualVal;
    //
  };

  // const CallContract = async () => {
  //   // if (signer != null) {
  //   //provider = new ethers.BrowserProvider(window.ethereum);
  //   signer = await provider.getSigner();
  //   //console.log("the contract is ", contractRO);
  //   const contractRO = new ethers.Contract(ContractAddress, ABI, provider);
  //   const getFavNum = await contractRO.retrieve();
  //   const favNumString = getFavNum.toString(); // Convert BigInt to string
  //   console.log(typeof favNumString); // Check type, should be 'string'
  //   setFavouriteNumber(favNumString);
  //   console.log("the Fav num is ", getFavNum);
  //   // }
  // };

  const handleButton = async () => {};

  useEffect(() => {
    const funs = async () => {
      await ConnectWallet().catch(console.error);
      //await GetBalance();
      //await CallContract();
    };
    funs();
  });

  return (
    <div className="App">
      <h2>Hello</h2>
      <h4>The Contract balance: {balance}</h4>
      <h4>the user Balance is : {userBalance}</h4>
      <h5>The Fav num is : {favoriteNumber}</h5>
      <div>
        <input
          value={changeFavNum}
          onChange={(e) => setChangeFavNum(e.target.value)}
          placeholder="change the favorite Number"
        />
        <button onClick={handleButton}>Add</button>
      </div>
    </div>
  );
}

export default App;
