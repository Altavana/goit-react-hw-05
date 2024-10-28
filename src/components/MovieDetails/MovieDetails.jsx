import css from "./MovieDetails.module.css";
import noPoster from "../../images/noPoster.jpg";
const MovieDetails = ({ movie }) => {
  const dateM = movie.release_date;
  const dateMF = new Date(dateM); // Создаем объект Date
  const year = dateMF.getFullYear(); // Извлекаем год
  const score = Math.round(movie.vote_average * 10) + "%";

  return (
    <div className={css.movieWrapper}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : noPoster
        }
        alt={movie.title}
        className={css.poster}
      />
      <div className={css.detailWrapper}>
        <h2 className={css.detailTitle}>
          {movie.title || movie.original_title} ({year})
        </h2>
        <p className={css.score}>User score {score}</p>
        <h3 className={css.overviewTitle}>Overview</h3>
        <p className={css.overview}>{movie.overview}</p>
        <h3 className={css.genresTitle}>Genres</h3>
        <ul className={css.listGenres}>
          {movie.genres?.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MovieDetails;
