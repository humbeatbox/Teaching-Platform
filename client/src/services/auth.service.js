import axios from "axios";
// const API_URL = "http://localhost:8080/api/user";

class AuthService {
  login(email, password, apiUrl) {
    // return axios.post(API_URL + "/login", { email, password });
    return axios.post(`${apiUrl}/user/login`, { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role, apiUrl) {
    // return axios.post(API_URL + "/register", {
    return axios.post(`${apiUrl}/user/register`, {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
