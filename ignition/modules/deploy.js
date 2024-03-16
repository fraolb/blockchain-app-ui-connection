const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const BuildSimpleStorage = buildModule("SimpleStorageModule", (m) => {
  const simpleStorage = m.contract("SimpleStorage");

  return { simpleStorage };
});

module.exports = BuildSimpleStorage;
