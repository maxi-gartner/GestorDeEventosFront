import axios from "axios";

const authQueries = {
  async signin(body) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        body
      );

      return response.data;
    } catch (err) {
      return err.response;
    }
  },

  async signup(body) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        body
      );
      return response.data;
    } catch (err) {
      return err.response;
    }
  },
};

export default authQueries;
