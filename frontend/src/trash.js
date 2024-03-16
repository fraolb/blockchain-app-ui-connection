{/**
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
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_favNum",
          type: "uint256",
        },
      ],
      name: "addPerson",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "nameToFavNumber",
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
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "people",
      outputs: [
        {
          internalType: "uint256",
          name: "favNum",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "person",
      outputs: [
        {
          internalType: "uint256",
          name: "favNum",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "retrieve",
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
          internalType: "uint256",
          name: "_favNumber",
          type: "uint256",
        },
      ],
      name: "store",
      outputs: [],
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
      console.log("the user balance is ", userBalanceFetch);
      setUserBalance(userBalanceFetch);

      let contractBalanceFetch = await GetBalance(ContractAddress);
      setBalance(contractBalanceFetch);

      console.log("the user Adrees is ", userAddress);
    }
  };

  const GetBalance = async (e) => {
    // e.PreventDefault();
    const balance = await provider.getBalance(e);
    const actualVal = ethers.formatEther(balance);
    return actualVal;
    //
  };

  const CallContract = async () => {
    // if (signer != null) {
    //provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    //console.log("the contract is ", contractRO);
    const contractRO = new ethers.Contract(ContractAddress, ABI, provider);
    const getFavNum = await contractRO.retrieve();
    const favNumString = getFavNum.toString(); // Convert BigInt to string
    console.log(typeof favNumString); // Check type, should be 'string'
    setFavouriteNumber(favNumString);
    console.log("the Fav num is ", getFavNum);
    // }
  };

  const handleButton = async () => {
    // if (signer != null) {
    //signer = await provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ABI, signer);
    const storeData = await contract.store(changeFavNum);
    storeData.wait();
    setChangeFavNum(0);
    //const getAgainFavNum = await contractRO.retrieve();
    // console.log("the again Fav num is ", getAgainFavNum);
    // setFavouriteNumber(getAgainFavNum);
    // } else {
    //   console.log("signer is null");
    // }
  };

  useEffect(() => {
    const funs = async () => {
      await ConnectWallet().catch(console.error);
      //await GetBalance();
      await CallContract();
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



*/}