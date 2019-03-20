import React, { Component } from "react";
import { Redirect } from 'react-router';
import axios from "axios";
import "./login.css";

export default class componentName extends Component {
  state = {
    username: "",
    password: "",
    toDevice: false
  };

  // state = {
  //   toDevice: false
  // }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      axios({
        method: "get",
        url: 'http://localhost:5500/api/auth',
        headers: {
          "authentication": localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ toDevice: true });
          }
        });
    }
  }


  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();

    // axios.post("http://localhost:5500/", JSON.stringify(this.state))
    axios({
      method: "post",
      url: "http://localhost:5500/",
      auth: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then(res => {
        if (res.status === 200) {
          // console.log(res);
          localStorage.setItem("token", res.data.authorization);
          this.setState({
            toDevice: true
          });
        } else {
          alert("Credentials Not correct.");
        }
      })
      .catch(err => {
        console.error('from login component', err);
        alert("Error logging in please try again");
      });
  };

  render() {
    if (this.state.toDevice) {
      return <Redirect to='/device' />
    }
    return (
      <div className="container jumbotron">
        <h2>LogIn</h2>
        <form
          onSubmit={this.onSubmit}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
