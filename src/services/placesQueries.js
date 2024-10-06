import axios from "axios";
import apiUrl from "../../api.js";

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
};

export default placesQueries;
