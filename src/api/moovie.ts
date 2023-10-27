import instance from "../constants/axiosConfig";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzMzMjYzOTgyZjJmYmVkZTA2ZGViYjM1YTkwMDlmZiIsInN1YiI6IjY1MzYwNDdhYzhhNWFjMDEzOWFiNzFkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UQMiM6v7KIzL2X8ldVggh1Mga6KOQ43LA7SHMnqpGdM",
  },
};

// const API_KEY = "7733263982f2fbede06debb35a9009ff";

export const searchMovies = async (moviename:string, API_KEY: string) => {
  try {
    const response = await instance.get(
      `/search/movie?query=${moviename}&api_key=${API_KEY}`,
      options
    );

    const data = await response.data;
    return data.results;
  } catch (error) {
    console.error("Error in searchMovies:", error);
    throw error;
  }
};
