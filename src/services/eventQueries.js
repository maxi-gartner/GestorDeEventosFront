import axios from "axios";
import apiUrl from "../../apiUrl.js";

const apiEvents = axios.create({
  baseURL: `${apiUrl}event/`,
});

const eventQueries = {
  async getAllEvents() {
    try {
      const response = await apiEvents.get();
      return response.data.response.map((event) => event.data);
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  async getEvent(id) {
    try {
      const response = await apiEvents.get(id);
      return response.data.response.data;
    } catch (err) {
      return err.response;
    }
  },

  async registerToEvent(id) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await apiEvents.post(`register/${id}`, {}, { headers });
      return response;
    } catch (err) {
      return err.response;
    }
  },

  async unsubscribe(id) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await apiEvents.post(
        `unsubscribe/${id}`,
        {},
        { headers }
      );
      return response;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  },

  async isRegistered(id) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await apiEvents.get(`registered/${id}`, { headers });
      return response.data.isRegistered;
    } catch {
      return false;
    }
  },

  async createEvent(body) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await apiEvents.post(`create`, body, { headers });
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  },

  async getEventById(id) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await apiEvents.get(`/${id}`, { headers });
      return response.data.response.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  },

  async organizerUpdateUser(body, id) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await apiEvents.put(`update/${id}`, body, { headers });
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },

  async submitRating(body, id) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await apiEvents.post(`vote/${id}`, body, { headers });
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },

  async submitComment(body, id) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await apiEvents.post(`comment/${id}`, body, { headers });
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },
};

export default eventQueries;
