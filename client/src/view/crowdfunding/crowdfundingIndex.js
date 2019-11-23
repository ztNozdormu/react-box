import React,{Component}from 'react'
import TabCenter from './tabCenter'
import contractService from '../../utils/contractService'
class CrowdfundingIndex　extends Component {
    constructor() {
        super()
        this.state = {
            currentAccount: '',
        }
    }

    async componentWillMount() {
        // 获取合约实例集合
        const contract = await contractService.InitContractInstarces();
        const web3 = await contractService.InitWeb3Instance();
        let accounts = web3.eth.getAccounts();
        console.log(accounts)
        let platformManager = await contract.fundingFactory.methods.platformManager().call()
        console.log('manager :', platformManager)
        this.setState({
            currentAccount:accounts[0],
        })
    }

    render() {
        return (
            <div>
                <h1>黑马众筹</h1>
                <img src="https://api.gushi.ci/all.svg" alt="poem"/>
                <p>当前账户: {this.state.currentAccount}</p>
                <TabCenter/>
            </div>
        );
    }
}
export default CrowdfundingIndex
