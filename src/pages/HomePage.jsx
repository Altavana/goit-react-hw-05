// import { Container, CountryList, Heading, Loader, Section } from "components";
import { useEffect, useState } from "react";
import { getTrendMovies } from "../utils/moviesAPI";
import Loader from "../components/Loader/Loader";
import MovieList from "../components/MovieList/MovieList";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError("");
        setLoader(true);
        const result = await getTrendMovies();
        setMovies(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section>
      <h1> Trending today</h1>
      {error && <ErrorMessage message={error} />}
      {loader && <Loader />}
      <MovieList movies={movies} />
    </section>
  );
};
export default HomePage;
