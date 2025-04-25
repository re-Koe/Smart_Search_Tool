import axios from "axios";

// Define the base URL for the API
const baseURL = "http://127.0.0.1:8000";

// Create an axios instance with the base URL configured
const api = axios.create({
  baseURL: baseURL,
});

// Export the instance for use in components
export default api;
