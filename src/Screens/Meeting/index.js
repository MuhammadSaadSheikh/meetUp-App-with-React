import React from "react";
import "./style.css";

//methods
import { setUser, uploadPictures} from "../../config/firebase";

//localStorage
const userId = localStorage.getItem("userId");

export default class Meeting extends React.Component {
  render(){
    return(
      <div>
        Meeting
      </div>
    )
  }
}
