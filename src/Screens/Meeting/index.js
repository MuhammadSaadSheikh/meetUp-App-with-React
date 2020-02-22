import React from "react";
import "./style.css";

//methods
import { otherUsers, getUser } from "../../config/firebase";

export default class Meeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: {},
      allUSers: [],
      loader: true
    };
  }

  componentWillMount() {
    this.checkLoginState();
  }

  componentDidMount() {
    this.getMyData();
  }

  checkLoginState = () => {
    const { history } = this.props;
    const userId = localStorage.getItem("userId");
    if (!userId) {
      history.replace("/login");
    }
  };

  getAllUsers = async () => {
    const { myData } = this.state;
    const { beverage: myBeverage, timeDuration } = this.state.myData;
    try {
      let temp = [];
      const response = await otherUsers();
      if (response.size) {
        response.forEach(doc => {
          let foundBeverage = false
          if(myData.userId !== doc.data().uid){
            const {beverage , timeDuration} = this.doc.data()
            if(myBeverage.length < beverage.length){
              for(let i=0; i<beverage.length; i++){
                if(myBeverage.includes(beverage[i])){
                  foundBeverage = true
                  break
                }
              }
            }
            else{
              for(let i=0; i<myBeverage.length; i++){
                if(beverage.includes(myBeverage[i])){
                  foundBeverage = true
                  break
                }
              }
            }
            if(foundBeverage){
              temp.push({...doc.data() , docId : doc.id})
            }
          }
        });
      }
      else{
        alert('other user not found')
      }
    } catch (error) {
      console.log("alluser==>", error);
    }
  };

  getMyData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const doc = await getUser(userId);
      console.log("get my data doc==>", doc.data());
      this.setState(
        {
          myData: doc.data()
        },
        () => {
          this.getAllUsers();
        }
      );
    } catch (error) {
      console.log("myData", error);
    }
  };
  render() {
    return <div></div>;
  }
}
