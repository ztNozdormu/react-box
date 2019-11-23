import SimpleStorageContract from "../contracts/SimpleStorage.json";
import LotteryContract from "../contracts/Lottery.json"
import FundingFactoryContract from "../contracts/FundingFactory"
import FundingContract from "../contracts/Funding"
import Web3 from 'web3'
// 1.获取web3实例对象
let InitWeb3Instance = () => {
    let web3 = null;
    if (window.web3){
        web3 = new Web3(window.web3.currentProvider)
    }else{
        const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
        );
        web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
    }
    return web3;
}
// 2.获取当前节点上已经部署的智能合约
let InitContractInstarces= () => {
    const web3 = InitWeb3Instance();
    // Get the contract instance.
    const networkId =  web3.eth.net.getId();
    console.log(networkId)
    // 获取已经部署了的合约
    const deployedSimpleStorage = SimpleStorageContract.networks[networkId];
    const deployedLottery = LotteryContract.networks[networkId];
    const fundingFactory = FundingFactoryContract.networks[networkId];
    const funding = FundingContract.networks[networkId];
    // 案例合约实例 参数1:合约abi接口 参数2:合约部署的网络和合约地址(内部账户)
    const simpleStorageInstance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedSimpleStorage && deployedSimpleStorage.address,
    );
    // 彩票合约实例
    const lotteryInstance = new web3.eth.Contract(
        LotteryContract.abi,
        deployedLottery && deployedLottery.address,
    );
    // 指定合约地址
    lotteryInstance.options.address="0x9417D7fe61fb6Ed90b844E949f7bf420995962F7";
    // 众筹合约工厂实例  0x843D9a83E4D43DB6E84f2Ac9049C9F09bbF9ECb3
    const fundingFactoryInstance = new web3.eth.Contract(
        FundingFactoryContract.abi,
        fundingFactory && fundingFactory.address,
    );
    // 指定众筹合约工厂地址
    fundingFactoryInstance.options.address="0x843D9a83E4D43DB6E84f2Ac9049C9F09bbF9ECb3";
    // 众筹合约实例
    const fundingInstance = new web3.eth.Contract(
        FundingContract.abi,
        funding && funding.address,
    );
    let contract = {};
        contract.simpleStorage = simpleStorageInstance;
        contract.lottery = lotteryInstance;
        contract.fundingFactory = fundingFactoryInstance;
        contract.funding = fundingInstance;
    return contract;
}

let contractService = {
    InitWeb3Instance,
    InitContractInstarces,
}

export default contractService
