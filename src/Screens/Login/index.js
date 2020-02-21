import React from "react";
import "./style.css";
import { fbLogin, getUser } from "../../config/firebase";

export default class Login extends React.Component {

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


  randomLogin = async() => {
    console.log('hello')
    const {history } = this.props
    const number = Math.floor(Math.random()*10000000)
    const userData = number
    localStorage.setItem('userId' , number)
    history.replace('/profile')

    // const user = await getUser(number)
    // if(user.data()){
    //   this.checkStage(user.data())
    // }
    // if(number){
    //   history.replace('/profile')
    // }
    // else{
    //   alert('user id not found!')
    // }
  };

  // checkStage = data =>{
  //   const {history} = this.props
  //   if(data.registure){
  //     history.replace('/')
  //   }
  //   else{
  //     if(!data.userName || !data.userNumber){
  //       localStorage.setItem('stage' , 'basic')
  //       history.replace('/profile')
  //     }
  //     else if(!data.images){
  //       localStorage.setItem('stage' , 'image')
  //       history.replace('/profile')
  //     }
  //     else if(!data.beverage){
  //       localStorage.setItem('stage' , 'beverage')
  //       history.replace('/profile')
  //     }
  //     else if(!data.meetingTime){
  //       localStorage.setItem('stage' , 'meetingTime')
  //       history.replace('/profile')
  //     }
  //   }
  // }

  render() {
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
