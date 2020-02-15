import React from "react";
import "./style.css";

//methods
import { setUser } from "../../config/firebase";

//localStorage
const userId = localStorage.getItem("userId");

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      usreNumber: "",
      beveragesArr: [],
      pictureArr: [],
      timeDuration: [],
      state: "basic"
    };
  }

  stateHandling = (state, value) => {
    this.setState({
      [state]: value
    });
  };

  forBasic = async () => {
    const { state, userName, usreNumber } = this.state;
    if (!userName || !usreNumber) {
      alert("All fields required!");
      return;
    }
    try {
      await setUser(userId, { userName, usreNumber });
      this.setState({ state: "beverage" });
    } catch (error) {
      console.log("basicError==>", error);
    }
  };

  forBeverages = () => {
    const { beveragesArr, state } = this.state;
    if (!beveragesArr.length) {
      alert("Beverages not found!");
      return;
    } else {
      this.setState({
        state: "meeting"
      });
    }
  };

  beverageCheckBox = (value, isSelected) => {
    let { beveragesArr } = this.state;
    if (isSelected) {
        beveragesArr.push(value);
      this.setState({ beveragesArr });
    }
  };

  timeDurationCheckBox = (value, isSelected) => {
    let { timeDuration } = this.state;
    if (isSelected) {
      timeDuration.push(value);
      this.setState({
        timeDuration
      });
    } else {
      alert("Plase select the options!");
      return;
    }
  };

  beverageAndTimeSubmit = async () => {
    const { history } = this.props;
    const { beveragesArr, timeDuration, state } = this.state;
    try {
      if (beveragesArr.length && timeDuration.length) {
        setUser(userId, { beveragesArr, timeDuration });
        history.replace("/location");
      }
      else{
          this.setState({state : 'beverage'})
      }
    } catch (error) {
      console.log("timeDurationError", error);
    }
  };

  render() {
    const {
      state,
      pictureArr,
      userName,
      usreNumber,
      beveragesArr,
      timeduration
    } = this.state;
    return (
      <div className="mainContainer">
        {state == "basic" && (
          <div className="neatedWrapper">
            <h1>Welcome</h1>
            <div className="inputWrapper">
              <input
                type="text"
                value={userName}
                placeholder="Enter your nick Name"
                onChange={e =>
                  this.stateHandling({ userName: e.currentTarget.value })
                }
              />
              <input
                type="number"
                value={usreNumber}
                placeholder="Enter your phone number"
                onChange={e =>
                  this.stateHandling({ usreNumber: e.currentTarget.value })
                }
              />
            </div>
            <button className="nextButton" onClick={this.forBasic}>
              Next
            </button>
          </div>
        )}
        {state == "beverage" && (
          <div className="optionsWrapper">
            <div className="beverageWrapper">
              <h1>What do you want on meeting?</h1>
              <div className="nestedchild">
                <div className="checkBoxWrapper">
                  <input
                    type="checkbox"
                    value="cocktail"
                    onClick={e => {
                      this.beverageCheckBox(
                        e.currentTarget.value,
                        e.currentTarget.checked
                      );
                    }}
                    checked
                  />
                  <label>Cocktail</label>
                </div>
                <div className="checkBoxWrapper">
                  <input
                    type="checkbox"
                    value="juice"
                    onClick={e => {
                      this.beverageCheckBox(
                        e.currentTarget.value,
                        e.currentTarget.checked
                      );
                    }}
                  />
                  <label>Juice</label>
                </div>
                <div className="checkBoxWrapper">
                  <input
                    type="checkbox"
                    value="coffee"
                    onClick={e => {
                      this.beverageCheckBox(
                        e.currentTarget.value,
                        e.currentTarget.checked
                      );
                    }}
                  />
                  <label>Coffee</label>
                </div>
              </div>
              <div className="buttonWrapper">
                <button className="nextBtn" onClick={this.forBeverages}>
                  NEXT
                </button>
              </div>
            </div>
          </div>
        )}
        {state === "meetingTime" && (
          <div className="optionsWrapper">
            <div className="beverageWrapper">
              <h1>Duration of meeting!</h1>
              <div className="nestedchild">
                <div className="checkBoxWrapper">
                  <input
                    type="checkbox"
                    value="30"
                    onClick={e => {
                      this.timeDurationCheckBox(
                        e.currentTarget.value,
                        e.currentTarget.checked
                      );
                    }}
                    checked
                  />
                  <label>30 mintues</label>
                </div>
                <div className="checkBoxWrapper">
                  <input
                    type="checkbox"
                    value="60"
                    onClick={e => {
                      this.timeDurationCheckBox(
                        e.currentTarget.value,
                        e.currentTarget.checked
                      );
                    }}
                  />
                  <label>90 mintues</label>
                </div>
                <div className="checkBoxWrapper">
                  <input
                    type="checkbox"
                    value="120"
                    onClick={e => {
                      this.timeDurationCheckBox(
                        e.currentTarget.value,
                        e.currentTarget.checked
                      );
                    }}
                  />
                  <label>120 mintues</label>
                </div>
              </div>
              <div className="buttonWrapper">
                <button
                  className="nextBtn"
                  onClick={this.beverageAndTimeSubmit}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
