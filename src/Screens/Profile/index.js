import React from "react";
import "./style.css";

//methods
import { setUser, uploadPictures} from "../../config/firebase";

//localStorage
const userId = localStorage.getItem("userId");

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      usreNumber: "",
      beveragesArr: [],
      userImg1: "",
      userImg2: "",
      userImg3: "",
      timeDuration: [],
      stage: "basic"
    };
    console.log('state' , this.state)
  }

  
  stateHandling = (key, value) => {
    this.setState({
      [key]: value
    });
    console.log('key==>' , key)
    console.log('value=>' , value)
  };


  forBasic = async () => {
      const { userName, usreNumber } = this.state;
      if (!userName || !usreNumber) {
        alert("All fields required!");
        return;
      }
      try {
        await setUser(userId, { userName, usreNumber });
        this.setState({ stage: "image" });
      } catch (error) {
        console.log("basicError==>", error);
      }
  };
 
  handleUploadPicture = async () => {
    const { userImg1, userImg2, userImg3 } = this.state;

    if (!userImg1 || !userImg2 || !userImg3) {
      alert("All fields required!");
      return;
    }

    try {
      let images = [userImg1, userImg2, userImg3];
      const profileImages = await uploadPictures(images);
      await setUser(userId, { profileImages });
      this.setState({ stage: "beverages" });
      console.log('userImg' , images)
    } catch (error) {
      console.log( "handleUploadPicture-> error", error)
    }
  };

  forBeverages = () => {
    const { beveragesArr } = this.state;
    if (!beveragesArr.length) {
      alert("Select the Beverages!");
      return;
    } else {
      this.setState({
        stage: "meetingTime"
      });
    }
  };

  beverageCheckBox = (value, isSelected) => {
    let { beveragesArr } = this.state;
    if (!isSelected) {
      for (let i = 0; i < beveragesArr.length; i++) {
        if (beveragesArr[i] === value) {
          beveragesArr.splice(i, 1);
        }
      }
    } else {
      beveragesArr.push(value);
      this.setState({ beveragesArr });
    }
    console.log("beverage", beveragesArr);
  };

  timeDurationCheckBox = (value, isSelected) => {
    let { timeDuration } = this.state;
    if (!isSelected) {
      for (let i = 0; i < timeDuration.length; i++) {
        if (timeDuration[i] == value) {
          timeDuration.splice(i, 1);
        }
      }
    } else {
      timeDuration.push(value);
      this.setState({ timeDuration });
    }
    console.log('time' , timeDuration)
  };

  
  forMeeting = async () => {
    const { beveragesArr, timeDuration } = this.state;
    const { history } = this.props;
    try {
      setUser(userId, { beveragesArr, timeDuration });
      alert("Meeting set");
      history.replace("/location");
    } catch (error) {
      console.log("setMeeting==>", error);
    }
  };

  beverageAndTimeSubmit = async () => {
    const { history } = this.props;
    const { beveragesArr, timeDuration, state } = this.state;
    try {
      if (beveragesArr.length && timeDuration.length) {
        setUser(userId, { beveragesArr, timeDuration });
        history.replace("/location");
      } else {
        this.setState({ state: "beverage" });
      }
    } catch (error) {
      console.log("timeDurationError", error);
    }
  };

  render() {
    const {
      stage,
      userName,
      usreNumber,
    } = this.state;
    return (
      <div className="mainContainer">
        {stage === "basic" && (
          <div className="neatedWrapper">
            <h1>Welcome</h1>
            <div className="inputWrapper">
              <input
                type="text"
                value={userName}
                placeholder="Enter your nick Name"
                onChange={e =>
                  this.stateHandling("userName", e.currentTarget.value)
                }
              />
              <input
                type="number"
                value={usreNumber}
                placeholder="Enter your phone number"
                onChange={e =>
                  this.stateHandling("usreNumber", e.currentTarget.value)
                }
              />
            </div>
            <button className="nextButton" onClick={this.forBasic}>
              Next
            </button>
          </div>
        )}
        {stage === "image" && (
          <div className="optionsWrapper">
            <div className="beverageWrapper">
              <h1>Uplaod Your Picture</h1>
              <div className="nestedchild">
                <ol>
                  <li>
                    <input
                      type="file"
                      className="fileField"
                      onChange={e =>
                        this.stateHandling("userImg1", e.currentTarget.files[0])
                      }
                      accept="image/x-png, image/jpg , image/jpeg"
                    />
                  </li>
                  <li>
                    <input
                      type="file"
                      className="fileField"
                      onChange={e => {
                        this.stateHandling("userImg2", e.currentTarget.files[0]);
                      }}
                    />
                  </li>
                  <li>
                    <input
                      type="file"
                      className="fileField"
                      onChange={e =>
                        this.stateHandling("userImg3", e.currentTarget.files[0])
                      }
                    />
                  </li>
                </ol>
              </div>
              <div className="buttonWrapper">
                <button className="nextBtn" onClick={this.handleUploadPicture}>
                  NEXT
                </button>
              </div>
            </div>
          </div>
        )}
        {stage === "beverages" && (
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
        {stage === "meetingTime" && (
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
