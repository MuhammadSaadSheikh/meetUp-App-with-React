import React from "react";
import "./style.css";
import {withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

//fireabse
import { setUser } from "../../config/firebase";

//userId
const userId = localStorage.getItem("userId");

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {}
    };
  }

  componentDidMount() {
    this.userCurrentLocation();
  }

  userCurrentLocation = () => {
    // const {coords} = this.state
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({ coords: { latitude, longitude } });
    });
  };

  updateUserLocation = () => {
    const { coords } = this.state;
    const { lat, lng } = coords.latlng;
    let userLocation = {
      latitude: lat(),
      longitude: lng()
    };
    this.setState({ coords: userLocation });
  };

  submitLocation = async () => {
    const { coords } = this.state;
    const { history } = this.props;

    try {
      if ((coords && !coords.latitude) || !coords.longitude) {
        alert("Select proper location!");
        return;
      } else {
        await setUser(userId, { coords, register: true });
        alert("set user location");
        history.replace("/");
      }
    } catch (error) {
      console.log("submit user location error ==>", error);
    }
  };

  render() {
    const { coords } = this.state;
    return (
      <div className="mainContainer">
        <div className="nestedWrapper">
          {/* {/* <h1>abc</h1> */}
          <div className="mapWrapper">
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <button className="submitButton">Submit</button>
        </div>
      </div>
    );
  }
}


//map component

const MyMapComponent = withScriptjs(
  withGoogleMap(props => {
    const { coords, updateLocation, isMarkerShown } = props;
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
              updateLocation(position);
            }}
          />
        )}
      </GoogleMap>
    );
  })
);
