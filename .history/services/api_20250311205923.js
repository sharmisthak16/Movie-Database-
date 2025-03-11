import axios from "axios";

export const categoryMovies = async (API_URL) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // Check if the error has a response object
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response data:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
      throw new Error('Error setting up the request');
    }
  }
};
