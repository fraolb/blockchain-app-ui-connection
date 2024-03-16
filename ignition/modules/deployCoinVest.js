const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const BuildCoinVest = buildModule("CoinVestModule", (m) => {
  const coinVest = m.contract(
    "WEB3ETH",
    [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    ]
  );

  return { coinVest };
});

module.exports = BuildCoinVest;
