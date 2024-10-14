import axios from "axios";
import apiUrl from "../../apiUrl.js";

const placesQueries = {
  async getAllPlaces() {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.get(`${apiUrl}place`, { headers });
      return response.data.response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  async getPlace(id) {
    try {
      const response = await axios.get(`${apiUrl}place/${id}`);
      return response.data.response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  async createPlace(body) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.post(`${apiUrl}place/create`, body, {
        headers,
      });
      const allPlaces = await this.getAllPlaces();
      console.log("All places after create:", allPlaces);
      return {
        data: response.data,
        allPlaces: allPlaces,
      };
    } catch (err) {
      console.log("error in catch query", err.response.data);
      return err;
    }
  },

  async deletePlace(id) {
    try {
      const token = localStorage.getItem("token");
      const sanitizedToken = token ? token.replace(/"/g, "") : null;
      const headers = {
        Authorization: `Bearer ${sanitizedToken}`,
      };
      const response = await axios.delete(`${apiUrl}place/${id}`, { headers });
      console.log("response", response);
      const allPlaces = await this.getAllPlaces();
      console.log("All places after delete:", allPlaces);
      return {
        data: response.data,
        allPlaces: allPlaces,
      };
    } catch (err) {
      console.log("error in catch query", err.response.data);
      return err;
    }
  },
};

export default placesQueries;
