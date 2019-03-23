import React, { Component } from "react";
import axios from "axios";
import Map from "./maps";
import Devices from "./deviceList";

export default class devicePage extends Component {
  state = {
    devices: [],
    coordinates: [],
    page: 0,
    token: ""
  };

  onClickHandler = id => {
    console.log(id);
    this.setState({
      coordinates: [],
      page: 0
    });

    let loop = () => {
      axios({
        method: "get",
        url: `http://localhost:5500/api/device/${id}?page=${this.state.page}`,
        headers: {
          "authentication": localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.data.length > 0) {
            let coordsTemp = [...this.state.coordinates];
            res.data.forEach(coord => {
              if (coord.gps && coord.gps[0] && coord.gps[1] && coord.gps[0] != null && coord.gps[1] != null) {
                coordsTemp.push({ lat: coord.gps[0], lng: coord.gps[1] })
              }
            });
            this.setState({ coordinates: [...new Set(coordsTemp)], page: this.state.page + 1 });

            console.log("From Onclick in maps>", this.state.page);
            loop();
          }
        })
        .catch(err => console.log(err));
    }

    loop();
  };

  componentDidMount() {
    axios({
      method: "get",
      url: 'http://localhost:5500/api/device',
      headers: {
        "authentication": localStorage.getItem("token")
      }
    })
      .then(res => {
        this.setState({ devices: res.data });
        console.log("State: Set");
      });
  }

  render() {
    return (
      <div style={{ maxWidth: "85vw", margin: "auto" }}>
        <div className="row">
          <section className="col-3">
            <Devices onClick={this.onClickHandler} list={this.state.devices} />
          </section>
          <section className="col-9">
            <Map coords={this.state.coordinates} />
          </section>
        </div>
      </div>
    );
  }
}
