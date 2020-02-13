import React from "react";
import "./style.css";
import {fbLogin} from '../../config/firebase'


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passowrd: ""
    };
  }

  fbLoginBtn = async()=>{
    console.log('hello')
    try {
      const response = await fbLogin()
      console.log('response==>',response)
      const  userData = await response.user.uid
      console.log('user' , userData)
    } catch (error) {
      console.log('error' , error)
    }
  }  

  render() {
    const { email, passowrd } = this.state;
    return (
      <div className="mainContainer">
        <div className="childWrapper">
          <div className="headingWrapper">
            <p>meetUp App</p>
          </div>
          <button className="loginButton" onClick={this.fbLoginBtn}>
            Facebook Login
          </button>
        </div>
      </div>
    );
  }
}
