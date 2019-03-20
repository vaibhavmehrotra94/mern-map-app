import React, { Component } from "react";
import { Map, Polyline, GoogleApiWrapper } from "google-maps-react";

const style = {
  width: "100%",
  height: "80vh"
};

class map extends Component {
  render() {
    console.log("From Maps:", this.props.coords)

    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 21.1458004,
          lng: 79.0881546
        }}
        zoom={4}
      >

        {this.props.coords.length > 0 ? <Polyline
          path={this.props.coords}
          strokeColor="#0000FF"
          geodesic={true}
          strokeOpacity={0.8}
          strokeWeight={5}
        /> : null}

      </Map>
    );
  }
}

// export default map;
export default GoogleApiWrapper({
  apiKey: "AIzaSyDf4nIBlAk7u7z2kpZE-GkqM3W_8BM3Dk8",
  v: "3.30"
})(map);
