import axios from "axios";
import * as ACTIONS from "./actions";

export default {
  // Create a new user
  addUser: function (user) {
    return axios.post("/api/user/signup/", user);
  },

  // Login user
  loginUser: function (user) {
    return axios.post("/api/user/login", user);
  },

  // Logout current user
  logoutUser: function () {
    return axios.post("/api/user/logout");
  },

  getUser: function () {
    return axios.get("/api/user");
  }

};
