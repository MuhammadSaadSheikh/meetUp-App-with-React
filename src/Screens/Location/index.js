import React from "react";
import "./style.css";
import {withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

//fireabse
import { setUser } from "../../config/firebase";

//userId
const userId = localStorage.getItem("userId");

export default class Location extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        coords : {}
      }
    }
    
    componentDidMount(){
      this.currentLocationOfUser()
    }
    
    currentLocationOfUser = ()=>{
      navigator.geolocation.getCurrentPosition(positon =>{
        // console.log('position==>' , positon)
        const {latitude , longitude} = positon.coords 
        this.setState({coords : {latitude, longitude}})
      })
    }
    
    updateUserLocation = coords=>{
      const {lat , lng} = coords.latLng 
      console.log('updateUSer==>' , coords.latLng)
      let location = {
        latitude : lat(),
        longitude : lng()
      }
      this.setState({coords : location})
      console.log('location==>' , location)
    }

    submitLocation = async() =>{
      const {coords} = this.state
      const {history} = this.props
      try {
        if(!coords && !coords.latitude || !coords.longitude){
          alert("please select the meeting location!")
        }
        else{
          setUser(userId , {coords , register : true})
          history.replace('/')
        }
      } catch (error) {
        console.log('location error==>' , error)
      }
    }

    render(){
      const {coords} = this.state
      return(
        <div>
           <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "350px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          coords={coords}
          updateUserLocation={this.updateUserLocation}
        />
        <div className='nestedWrapper'>
        <button onClick={this.submitLocation} className = 'submitButton'>Submit</button>
        </div>
        </div>
      )
    }
}

//Map Component
const MyMapComponent = withScriptjs(
  withGoogleMap(props => {
    const { coords, updateUserLocation, isMarkerShown } = props;
    return (
      <GoogleMap
        center={{
          lat: coords.latitude,
          lng: coords.longitude
        }}
        defaultZoom={20}
      >
        {isMarkerShown && (
          <Marker
            draggable={true}
            position={{
              lat: coords.latitude,
              lng: coords.longitude
            }}
            onDragEnd={position => {
              updateUserLocation(position);
            }}
          />
        )}
      </GoogleMap>
    );
  })
);
