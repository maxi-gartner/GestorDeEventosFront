import axios from "axios";
import apiUrl from "../../api.js";

const authQueries = {
  async signin(body) {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, body);

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
      const response = await axios.get(`${apiUrl}auth/${email}`);
      return response.data;
    } catch (err) {
      return err.response;
    }
  },
};

export default authQueries;
