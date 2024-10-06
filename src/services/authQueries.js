import axios from "axios";
import apiUrl from "../../api.js";
const token = localStorage.getItem("token");
const sanitizedToken = token ? token.replace(/"/g, "") : null;
const headers = {
  Authorization: `Bearer ${sanitizedToken}`,
};

const authQueries = {
  async signin(body) {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, body);

      return response.data;
    } catch (err) {
      console.log("err.response", err.response.data);
      return err.response.data;
    }
  },

  async loginWithToken() {
    try {
      const response = await axios.post(
        `${apiUrl}auth/loginWithToken`,
        {},
        { headers }
      );
      //console.log("response en login", response);
      console.log("login...");
      return response.data;
    } catch (err) {
      return err.response;
    }
  },

  async signup(body) {
    try {
      const response = await axios.post(`${apiUrl}auth/register`, body);
      return response.data;
    } catch (err) {
      return err.response;
    }
  },

  async getUserByEmail(email) {
    try {
      const response = await axios.get(`${apiUrl}auth/${email}`, { headers });
      return response.data;
    } catch (err) {
      console.log("err.response.data", err.response.data);
      return err.response.data;
    }
  },
};

export default authQueries;
