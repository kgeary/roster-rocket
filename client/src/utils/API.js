import axios from "axios";

export default {
  // Login user
  loginUser: function (user) {
    return axios.post("/api/auth/login", user);
  },

  // Create a new user
  addUser: function (user) {
    return axios.post("/api/auth/signup/", user);
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

  editUser: function (id, body) {
    return axios.patch(`/api/user/${id}`, body);
  },

  editCourse: function (id, body) {
    return axios.patch(`/api/course/${id}`, body);
  },

  editStudent: function (id, body) {
    return axios.patch(`/api/student/${id}`, body);
  },

  enrollCourse: function (StudentId, CourseId) {
    return axios.post(`/api/studentcourse/add`, { StudentId, CourseId });
  },

  dropCourse: function (StudentId, CourseId) {
    return axios.delete(`/api/studentcourse/drop/${StudentId}/${CourseId}`);
  },

  markPaid: function (newState, StudentId, CourseId) {
    return axios.post(`/api/studentcourse/paid/${StudentId}/${CourseId}`, { Paid: newState });
  },

  // Logout current user
  logoutUser: function () {
    return axios.post("/api/user/logout");
  },

  getUser: function (includeChildren = false) {
    if (includeChildren) {
      return axios.get("/api/user/children");
    } else {
      return axios.get("/api/auth/user");
    }
  },

  getUserById: function (id) {
    return axios.get(`/api/user/children/${id}`);
  },

  getAllUsers: function () {
    return axios.get("/api/user/all");
  },

  getUserStudents: function () {
    return axios.get("/api/student/user");
  },

  getCourseById: function (id) {
    return axios.get(`/api/course/${id}`);
  },

  getStudentById: function (id) {
    return axios.get(`/api/student/${id}`);
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
    return axios.post("/api/auth/reset", { email });
  },

  setUserImage: function (userId, imgUrl) {
    return axios.patch(`/api/user/img/${userId}`, { img: imgUrl });
  },

  setStudentImage: function (studentId, imgUrl) {
    return axios.patch(`/api/student/img/${studentId}`, { img: imgUrl });
  },

  emailParent: function (email, code) {
    return axios.post("/api/auth/invite", { email, code });
  },

  getCodes: function () {
    return axios.get("/api/code/");
  },

  addCode: function (code) {
    return axios.post("/api/code/", { code });
  },

  removeCode: function (code) {
    return axios.delete(`/api/code/${code}`);
  },
};
