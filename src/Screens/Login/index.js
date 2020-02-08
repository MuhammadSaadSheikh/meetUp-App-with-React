import React from "react";
import "./style.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passowrd: ""
    };
  }
  render() {
    const { email, passowrd } = this.state;
    return (
      <div className="mainContainer">
        <div className="childWrapper">
          <div className="headingWrapper">
            <p>meetUp App</p>
          </div>
          <button className="loginButton">Facebook Login</button>
        </div>
      </div>
    );
  }
}
