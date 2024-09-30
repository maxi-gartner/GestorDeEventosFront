import axios from "axios";

const authQueries = {
  async signin(body) {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        body
      );

      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  async signup(body) {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register",
        body
      );
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};

export default authQueries;
