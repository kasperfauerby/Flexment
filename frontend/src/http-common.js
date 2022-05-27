import axios from "axios"; // AXIOS: 

export default axios.create({
  baseURL: "http://localhost:5000/api/v1/tasks",
  headers: {
    "Content-type": "application/json"
  }
});