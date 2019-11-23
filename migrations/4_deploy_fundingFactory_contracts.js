var FundingFactory = artifacts.require("./FundingFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(FundingFactory);
};
