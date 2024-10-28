import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTBlNTUzYzAzNDQ2NzgwOThjYzA2MmUyZGZhMDBmNyIsIm5iZiI6MTcyOTU3MzU4Ni45NDMwMDEsInN1YiI6IjY3MTY5NzFmNmRjYTcxZTEwOWQ1MTBlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7LaZgPX6W-cDEDRbcNKa47lDdvPLsOGyig8U90XVulg";
const page = 1;
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  params: {
    include_adult: false,
    language: "en-US",
    page: page,
  },
});

export const getTrendMovies = async (day) => {
  try {
    const { data } = await instance.get("/trending/movie/day");
    const dataTrend = data.results.map((item) => ({
      id: item.id,
      title: item.title,
    }));

    return dataTrend;
  } catch (error) {
    throw error;
  }
};
export const getSearchedMovies = async (query) => {
  try {
    const { data } = await instance.get(`/search/movie?query=${query}`);
    const moviesList = data.results.map((item) => ({
      id: item.id,
      title: item.title,
    }));

    return moviesList;
  } catch (error) {
    throw error;
  }
};
export const getMovieDetails = async (movieId) => {
  try {
    const { data } = await instance.get(`/movie/${movieId}`);
    const movieDetailItems = data;
    return movieDetailItems;
  } catch (error) {
    throw error;
  }
};
export const getMovieCast = async (id) => {
  try {
    const { data } = await instance.get(`/movie/${id}/credits`);

    const moveisCast = data.cast.map(({ name, profile_path, character }) => ({
      name: name,
      path: profile_path,
      character: character,
    }));

    return moveisCast;
  } catch (error) {
    throw error;
  }
};
export const getMovieRewies = async (id) => {
  try {
    const { data } = await instance.get(`/movie/${id}/reviews`);
    const movieRewies = data.results.map(
      ({ author, content, author_details }) => ({
        id: id,
        author: author || author_details.username,
        content: content,
      })
    );
    return movieRewies;
  } catch (error) {
    throw error;
  }
};
