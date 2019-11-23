import React, { Component } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import HomepageLayout from './view/homePage/homPage'
import PubSub from "pubsub-js";

class App extends Component {
  // state = {
  //   wallet: {}, //保存从login界面得到的钱包
  //   loginFlag: false
  // };

  componentDidMount() {
    // 在挂载的时候，注册login登录成功订阅事件
    PubSub.subscribe("onLoginSuccessfully", this.onLoginSuccessfully);
  }

  onLoginSuccessfully = (eventMsg, data) => {
    console.log("eventMsg :", eventMsg);
    console.log("data :", data);
    this.setState({
      wallet: data,
      loginFlag: true
    });
  };

  render() {
    // 账号状态
    // let content = loginFlag ? <Wallets wallet={wallet}/> : <LoginTab />;
   let content = <HomepageLayout/>
    return <Container>{content}</Container>;
  }
}

export default App;
