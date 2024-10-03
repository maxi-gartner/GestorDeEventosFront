import axios from "axios";
const token = localStorage.getItem("token").replace(/"/g, "");
const headers = {
  Authorization: `Bearer ${token}`,
};

const apiEvents = axios.create({
  baseURL: "http://localhost:4000/api/event/",
});

const eventQueries = {
  async getAllEvents() {
    try {
      const response = await apiEvents();
      return response.data.response.map((event) => event.data);
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  async getEvent(id) {
    try {
      const response = await apiEvents(id);
      return response.data.response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  async registerToEvent(id) {
    try {
      console.log("Headers:", headers); // Verificar los encabezados
      const response = await apiEvents.post(`register/${id}`, {}, { headers });
      return response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};

export default eventQueries;
