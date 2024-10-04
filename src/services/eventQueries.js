import axios from "axios";

// Intenta obtener el token del localStorage
const token = localStorage.getItem("token");
const sanitizedToken = token ? token.replace(/"/g, "") : null; // Verifica si el token no es null
const headers = {
  Authorization: `Bearer ${sanitizedToken}`, // Usa el token saneado
};

const apiEvents = axios.create({
  baseURL: "http://localhost:4000/api/event/",
});

const eventQueries = {
  async getAllEvents() {
    try {
      const response = await apiEvents.get(); // Asegúrate de hacer un GET
      return response.data.response.map((event) => event.data);
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  async getEvent(id) {
    try {
      const response = await apiEvents.get(id); // Cambiado a GET
      return response.data.response.data;
    } catch (err) {
      return err.response;
    }
  },

  async registerToEvent(id) {
    try {
      const response = await apiEvents.post(`register/${id}`, {}, { headers });
      return response;
    } catch (err) {
      //console.log("error in catch query", err);
      return err.response;
    }
  },

  async isRegistered(id) {
    try {
      const response = await apiEvents.get(`registered/${id}`, { headers });

      //console.log("response", response);
      return response.data.isRegistered;
    } catch /* (err)  */ {
      //console.log("error in catch query", err);
      return false;
    }
  },
};

export default eventQueries;
