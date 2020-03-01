import axios from "axios";

export default {
  // Create a new user
  addUser: function (user) {
    return axios.post("/api/user/signup/", user);
  },

  addCourse: function (course) {
    return axios.post("/api/course/add", course);
  },


  addStudent: function (student) {
    return axios.post("/api/student/add", student);
  },

  removeUser: function (id) {
    return axios.delete(`/api/user/${id}`);
  },

  removeCourse: function (id) {
    return axios.delete(`/api/course/${id}`);
  },

  removeStudent: function (id) {
    return axios.delete(`/api/student/${id}`);
  },

  enrollCourse: function (StudentId, CourseId) {
    return axios.post(`/api/studentcourse/add`, { StudentId, CourseId });
  },

  dropCourse: function (StudentId, CourseId) {
    return axios.delete(`/api/studentcourse/drop/${StudentId}/${CourseId}`);
  },

  markPaid: function (StudentId, CourseId) {
    return axios.post(`/api/studentcourse/paid/${StudentId}/${CourseId}`, { Paid: true });
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

  getUserById: function (id) {
    return axios.get(`/api/user/children/${id}`);
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
