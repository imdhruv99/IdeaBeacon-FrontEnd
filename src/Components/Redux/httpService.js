import axios from "axios";

const httpService = axios.create({
  baseURL: "http://localhost:5000/api/ideabeacon/",
});

export default httpService;
