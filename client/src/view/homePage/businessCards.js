import React ,{ Component }from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import Lottery from '../lottery/lotteryUi'
import Crowdfunding from '../crowdfunding/crowdfundingIndex'
import ReactDOM from "react-dom";
/**模块卡片 彩票智能合约 众筹智能合约 IPFS结合使用 ETH钱包*/
class BusinessCards extends Component{
      // 操作的状态变量
        state = {
            login: false,
            loading: false,
            loginEvent: '',
            wallets: [],  // 钱包账号登录
            normalLogin:[], // 普通账号登录
        };
    // 操作进入业务模块事件
     accessBusinessClick = (args,event) => {
        //获取私钥（自动生成，用户输入）
        let privateKey = this.state.privateKey;
        console.log("111 : ", privateKey);
        console.log("智能合约业务操作:",args)
        // 进入业务操作前判断是否登录 如果没有登录跳转到登录界面  TODO
        // let {login} = this.state
        // let content = login ? <Wallet wallets={this.state.wallets}/> : <LoginForm/>
        // 进入彩票操作页面
        switch (args) {
            case 'LOTTERY':
                ReactDOM.render(<Lottery />, document.getElementById('root'));
                break;
            case 'CROWDFUNDING':
                ReactDOM.render(<Crowdfunding />, document.getElementById('root'));
                break;
            default:
                break;
        }
    };
    render() {
        return (
            <Card.Group>
                <Card  style={{ background:'#a5673f',margin:"auto" }}>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src='/images/avatar/large/steve.jpg'
                        />
                        <Card.Header>彩票业务</Card.Header>
                        <Card.Meta>彩票智能合约</Card.Meta>
                        <Card.Description>
                            以太坊合约实现的彩票业务 <strong>cost eth lottery</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'
                                    size="large"
                                    onClick={this.accessBusinessClick.bind(this,'LOTTERY')}
                            >
                                ACCESS LOTTERY...{" "}
                            </Button>{" "}
                        </div>
                    </Card.Content>
                </Card>
                <Card style={{ background:'#e03997',margin:"auto" }}>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src='/images/avatar/large/molly.png'
                        />
                        <Card.Header style={{size:'1em'}}>众筹业务</Card.Header>
                        <Card.Meta>众筹智能合约</Card.Meta>
                        <Card.Description>
                            Molly wants to add you to the group <strong>musicians</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <div className='ui two buttons'>
                                <Button basic color='green'
                                        size="large"
                                        onClick={this.accessBusinessClick.bind(this,'CROWDFUNDING')}
                                >
                                    ACCESS CROWDFUNDING...{" "}
                                </Button>{" "}
                            </div>
                        </div>
                    </Card.Content>
                </Card>
                <Card style={{ background:'#f2711c',margin:"auto" }}>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src='/images/avatar/large/jenny.jpg'
                        />
                        <Card.Header>ETH钱包</Card.Header>
                        <Card.Meta>多币种钱包业务</Card.Meta>
                        <Card.Description>
                            Jenny requested permission to view your contact details
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'>
                                Approve
                            </Button>
                            <Button basic color='red'>
                                Decline
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }
}
export default BusinessCards
