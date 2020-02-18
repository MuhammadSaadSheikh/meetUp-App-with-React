import React from "react";
import "./style.css";
import { fbLogin } from "../../config/firebase";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   userUid : '',
    //   name : ''
    // };
  }

  fbLoginBtn = async () => {
    console.log("hello");
    try {
      const response = await fbLogin();
      console.log("response==>", response);
      const userData = await response.user.uid;
      console.log("user", userData);
    } catch (error) {
      console.log("error", error);
    }
  };
  randomLogin = () => {
    console.log('hello')
    const {history } = this.props
    const number = Math.floor(Math.random()*10000)
    // const userName = ['ali' , 'ahemd' , 'rashid' , 'kashif' , 'rashid' , 'zahid' , 'amir' , 'aqib' , 'sajid' , 'haris']
    // const randomName = userName[Math.floor(Math.random() * userName.length)]
    const userData = number
    localStorage.setItem('userId' , number)
    if(number){
      history.replace('/profile')
    }
    else{
      alert('user id not found!')
    }
  };

  render() {
    // const { } = this.state;
    return (
      <div className="mainContainer">
        <div className="childWrapper">
          <div className="headingWrapper">
            <p>meetUp App</p>
          </div>
          <button className="loginButton" onClick={this.randomLogin}>
            Facebook Login
          </button>
        </div>
      </div>
    );
  }
}
