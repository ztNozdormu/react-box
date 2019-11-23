import React, { Component } from 'react'
import {Card, Icon, Image, Statistic,Button} from 'semantic-ui-react'
import contractService from '../../utils/contractService'
import "semantic-ui-css/semantic.min.css"
class Lottery extends Component {

    constructor(props) {
        super(props);

        // state变量，
        //1. 如果实现了构造函数，在构造函数内使用方式：this.state = {xxxx}
        //2. 如果在构造函数外使用，直接state= {xxxx}
        this.state = {
            lotteryInstance:null,
            manager: '',
            round: '',
            winner: '',
            playerCounts: 0,
            balance: 0,
            players: [],
            currentAccount: '',
        };
    }
    //内置钩子函数，在页面渲染之前调用 初始化相关数据
    async componentDidMount() {
       const web3 = await contractService.InitWeb3Instance();
       const contractConst = await contractService.InitContractInstarces();

       let lotteryInstance = await contractConst.contract.lottery;
        //获取当前的所有地址
        let accounts = await contractConst.web3.eth.getAccounts()
        console.log("00000:",accounts)
        let manager = await lotteryInstance.methods.manager().call()
        console.log(manager)
        let round = await lotteryInstance.methods.round().call()
        let winner = await lotteryInstance.methods.winner().call()
        let playerCounts = await lotteryInstance.methods.getPlayersCount().call()
        console.log("人数:",playerCounts);
        //单位是wei，我们需要转换为ether单位
        let balanceWei = await lotteryInstance.methods.getBalance().call()
        //从wei单位转换为'ether'单位
        let balance = await web3.utils.fromWei(balanceWei, 'ether')

        let players = await lotteryInstance.methods.getPlayers().call()

        this.setState({
            // manager: manager,
            lotteryInstance,
            manager,
            round,
            winner,
            playerCounts,
            balance,
            players,
            currentAccount: accounts[0],
        })
    }
    // 投注彩票，调用合约投注功能
     playLottery = async() => {
        try{
          const  web3 =  await contractService.InitWeb3Instance();
            await this.state.lotteryInstance.methods.play().send({
                from:this.state.currentAccount,
                value:web3.utils.toWei('1','ether'),// 1 *10 **18 等价写法 把1个ETh转换为wei单位
                gas:'300000',
            })
          alert("投注彩票成功!")
            // 自动更新投注相关结果  参与人数 投注金额 等
        }catch(e){
            console.log(e)
            alert("投注彩票失败!")
        }
    }
    // 开奖
    kaijiangLottery = async() => {
        try{
            await this.state.lotteryInstance.methods.play().send({
                from:this.state.currentAccount,
                // value:web3.utils.toWei('1','ether'),// 1 *10 **18 等价写法 把1个ETh转换为wei单位
                gas:'300000',
            })
            alert("开奖成功!")
            // 自动更新投注相关结果  参与人数 投注金额 等
        }catch(e){
            console.log(e)
            alert("开奖失败!")
        }
    }
    // 退奖
    tuijiangLottery = async() => {
        try{
            await this.state.lotteryInstance.methods.play().send({
                from:this.state.currentAccount,
                // value:web3.utils.toWei('1','ether'),// 1 *10 **18 等价写法 把1个ETh转换为wei单位
                gas:'300000',
            })
            alert("退奖成功!")
            // 自动更新投注相关结果  参与人数 投注金额 等
        }catch(e){
            console.log(e)
            alert("退奖失败!")
        }
    }
    render() {
        return (
            <Card>
                <Image src='/images/logo.jpg'/>
                <Card.Content>
                    <Card.Header>先赚他一个亿福利彩票（成都站）</Card.Header>
                    <Card.Meta>
                        <p>管理员地址: {this.state.manager}</p>
                        <p>当前地址: {this.state.currentAccount}</p>
                    </Card.Meta>
                    <Card.Description>每晚九点准时开奖, 不见不散!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p>
                        <Icon name='user'/>
                        {this.state.playersCounts} 人参与
                    </p>
                </Card.Content>
                <Card.Content extra>
                    <Statistic color='red'>
                        <Statistic.Value>{this.state.balance}ETH</Statistic.Value>
                        <Statistic.Label>奖金池</Statistic.Label>
                    </Statistic>
                </Card.Content>

                <Card.Content extra>
                    <Statistic color='blue'>
                        <Statistic.Value>第{this.state.round}期</Statistic.Value>
                        <p>点击查看我的交易历史</p>
                    </Statistic>
                </Card.Content>
                <Button animated='fade' color='orange'>
                    <Button visible="true" onClick={this.playLottery}>投注产生希望{" "}</Button>{" "}
                    <Button  hidden>购买放飞梦想{" "}</Button>{" "}
                </Button>
                <Button inverted color='red' onClick={this.kaijiangLottery}>
                    开奖
                </Button>
                <Button inverted  color='orange' onClick={this.tuijiangLottery}>
                    退奖
                </Button>
            </Card>
        );
    }
}
export default Lottery
