import MovieDetails from "../components/MovieDetails/MovieDetails";
import css from "./MovieDetailsPage.module.css";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { getMovieDetails } from "../utils/moviesAPI";
import { useState, useEffect } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setError("");
        setLoader(true);
        const result = await getMovieDetails(movieId);

        if (result.length === 0) {
          setError("Movie not found. Somthing happened to the connection ");
          return;
        }
        setMovie(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchMovie();
  }, [movieId]);
  if (!movie) {
    return null;
  }

  const backUrl = location.state?.from || "/movies";
  const goBack = () => navigate(backUrl);

  return (
    <div>
      <button onClick={goBack} className={css.btnBack}>
        <MdOutlineKeyboardBackspace className={css.btnIcon} />
        Go back
      </button>

      {error && <ErrorMessage message={error} />}
      {loader && <Loader />}
      <MovieDetails movie={movie} />

      <nav className={css.details2}>
        <NavLink state={{ from: backUrl }} to="cast" className={css.detLink}>
          Cast
        </NavLink>
        <NavLink state={{ from: backUrl }} to="reviews" className={css.detLink}>
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};
export default MovieDetailsPage;
