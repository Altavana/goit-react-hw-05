import css from "./MovieList.module.css";
import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const keyId = nanoid();
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map((item, keyId) => (
        <li key={keyId} className={css.item}>
          <Link
            to={`/movies/${item.id}`}
            id={item.id}
            state={{ from: location }}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
