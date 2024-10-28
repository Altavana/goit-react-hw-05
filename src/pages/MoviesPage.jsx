import { useEffect, useState } from "react";
import { getSearchedMovies } from "../utils/moviesAPI";
import Loader from "../components/Loader/Loader";
import FormSearch from "../components/FormSearch/FormSearch";
import MovieList from "../components/MovieList/MovieList";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (searchPar) => {
    setSearchParams({ query: searchPar });
  };
  const query = searchParams.get("query");
  useEffect(() => {
    if (query === null) return;
    const fetchMovies = async () => {
      try {
        setError("");
        setLoader(true);
        const result = await getSearchedMovies(query);

        if (result.length === 0) {
          setError("Movies not found for this request. Please try again");
          return;
        }
        setMovies(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <section>
      <FormSearch onSubmit={onSubmit} />
      {error && <ErrorMessage message={error} />}
      {loader && <Loader />}
      <MovieList movies={movies} />
    </section>
  );
};
export default MoviesPage;
