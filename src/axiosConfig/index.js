import axios from "axios";

const Api = axios.create({
  baseURL: "https://layhelpbackend.onrender.com/api/v1",
  withCredentials: true,
});

export default Api;