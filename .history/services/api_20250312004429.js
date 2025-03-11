import axios from "axios";

export const categoryMovies = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching category movies:", error);
    throw error;
  }
};

export const verifyEndpoint = async () => {
  const apiKey = 'your_api_key_here'; // Replace with your actual API key
  const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;
  try {
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data);
    return response.data; // Return data if needed
  } catch (error) {
    console.error("Error verifying endpoint:", error);
    throw error; // Rethrow the error if needed
  }
};
