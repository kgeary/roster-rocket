import axios from "axios";

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

  getUser: function (includeChildren = false) {
    if (includeChildren) {
      return axios.get("/api/user/children");
    } else {
      return axios.get("/api/user");
    }
  },

  getAllUsers: function () {
    return axios.get("/api/user/all");
  },


  getAllCourses: function () {
    return axios.get("/api/course/all");
  },

  getAllStudents: function () {
    return axios.get("/api/student/all");
  },

  getAllStudentCourses: function () {
    return axios.get("/api/student/courses"); // nOT YET WORKING
  },

  getUsersByCourse: function (courseId) {
    return axios.get("/api/user/course/" + courseId)
  },

  changePassword: function ({ pwOld, pwNew }) {
    return axios.post("/api/user/change", {
      oldPassword: pwOld,
      newPassword: pwNew,
    });
  },

  resetPassword: function (email) {
    return axios.post("/api/reset", { email });
  },

};
