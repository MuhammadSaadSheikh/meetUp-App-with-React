import React from "react";
import { logOut, getAllMeetings, setUser } from "../../config/firebase";

export default class Home1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true,
      meetings: []
    };
  }

  componentWillMount() {
    this.checkLoginState();
  }

  componentDidMount() {
    this.checkMeeting();
  }

  checkLoginState = () => {
    const { history } = this.props;
    const userId = localStorage.getItem("userId");
    if (!userId) {
      history.replace("/login");
    }
  };

  handlelogOut = async () => {
    const { history } = this.props;
    try {
      await logOut();
      history.replace("/login");
      localStorage.removeItem("userId");
    } catch (error) {
      console.log("logout erroe=>", error);
    }
  };

  checkMeeting = async () => {
    const userId = localStorage.getItem("userId");
    let temp = [];
    try {
      const response = await getAllMeetings(userId);
      if (response.size) {
        response.forEach(doc => {
          temp.push({ ...doc.data(), docID: doc.id });
        });
        this.setState({
          meetings: temp,
          loader: false
        });
      }
    } catch (error) {}
  };

  render() {
    const { meetings, loader } = this.props;
    const { history } = this.props;
    return (
      <div>
        <button onClick={this.handlelogOut}>Logout</button>
        <React.Fragment>
          {loader ? (
            <p>Loading...</p>
          ) : (
            <React.Fragment>
              {!meetings.legth ? (
                <p>You don't have any meetings yet!</p>
              ) : (
                <React.Fragment>
                  {meetings.map((val, ind) => {
                    return <p>{ind}</p>;
                  })}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
        <button onClick={()=>{history.replace('/meeting')}}>Set a meeting</button>
      </div>
    );
  }
}
