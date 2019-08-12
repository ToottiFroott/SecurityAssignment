import React, { Component } from "react";
import axios from "axios";
import JSONTree from "react-json-tree";

import { AuthService } from "../services/AuthService";

import "./../resources/css/Home.css";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      api: {},
      user: {}
    };
    this.authService = new AuthService();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.api = this.api.bind(this);
    this.callAPI = this.callAPI.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  api() {
    this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this.callAPI(user.access_token);
      } else {
        alert("You are not logged in");
      }
    });
  }

  callAPI(token) {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token
    };

    axios
      .get("https://demo.identityserver.io/api/test", { headers })
      .then(data => {
        this.setState({
          api: data.data
        });
        return data.data;
      });
  }

  getUser() {
    this.authService
      .getUser()
      .then(user => {
        if (!user) {
          alert("You are not logged in");
        }
        this.setState({
          user: user
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div className="home">
        <div className="buttons">
          <button onClick={this.login} className={"btn-login"}>
            Login
          </button>
          <button onClick={this.api} className={"btn-api"}>
            Call API
          </button>
          <button onClick={this.logout} className={"btn-logout"}>
            Logout
          </button>
        </div>
        <div className={"json-headers"}>
          <h1>User Data</h1>
          <h1>API Data</h1>
        </div>
        <div className={"trees"}>
          <JSONTree data={this.state.user} theme={"bright"} />
          <JSONTree data={this.state.api} theme={"bright"} />
        </div>
      </div>
    );
  }
}
