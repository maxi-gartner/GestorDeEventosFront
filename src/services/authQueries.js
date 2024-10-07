import axios from "axios";
import apiUrl from "../../api.js";

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
      let token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.post(
        `${apiUrl}auth/loginWithToken`,
        {},
        { headers }
      );
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
      let token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.get(`${apiUrl}auth/${email}`, { headers });
      return response.data;
    } catch (err) {
      console.log("err.response.data en getUserByEmail", err.response.data);
      return err.response.data;
    }
  },

  async updateUser(body) {
    try {
      let token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.put(`${apiUrl}auth/update`, body, {
        headers,
      });
      return response;
    } catch (err) {
      return err.response;
    }
  },

  async getAllUsers() {
    try {
      let token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.get(`${apiUrl}auth`, { headers });
      return response.data;
    } catch (err) {
      return err.response;
    }
  },

  async deleteUser(email) {
    try {
      let token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.delete(`${apiUrl}auth/${email}`, {
        headers,
      });
      return response.data;
    } catch (err) {
      return err.response;
    }
  },

  async adminUpdateUser(body, email) {
    try {
      let token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.put(
        `${apiUrl}auth/adminUpdateUser/${email}`,
        body,
        {
          headers,
        }
      );
      return response.data;
    } catch (err) {
      return err.response;
    }
  },
};

export default authQueries;
