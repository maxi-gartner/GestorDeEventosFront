import axios from "axios";

const apiPlaces = axios.create({
  baseURL: "http://localhost:4000/api/place/",
});

const placesQueries = {
  async getAllPlaces() {
    try {
      const response = await apiPlaces();
      return response.data.response.map((place) => place.data);
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  async getPlace(id) {
    try {
      const response = await apiPlaces(id);
      return response.data.response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};

export default placesQueries;
