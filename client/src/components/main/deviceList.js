import React, { Component } from "react";

export default class componentName extends Component {
  render() {
    return (
      <div style={{ height: "80vh", overflow: "auto" }}>
        <h3 style={{ textAlign: "center" }}>Devices</h3>
        {this.props.list.map(device => {
          return (
            <div
              className="form-check"
              key={device._id}
              style={{ marginBottom: "8px" }}
            >
              <input
                className="form-check-input"
                type="radio"
                name="radioList"
                onChange={this.props.onClick.bind(this, device.id)}
                id={device.id}
                value={device.id}
              />
              <label className="form-check-label" htmlFor={device.id}>
                {device.id}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
