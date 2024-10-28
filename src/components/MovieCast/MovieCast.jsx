import { React, useEffect, useState } from "react";
import { getMovieCast } from "../../utils/moviesAPI";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import noPortret from "../../images/noPortret.jpg";
import { nanoid } from "nanoid";
// to check noPortret find film Gost 2nd in list

const MovieCast = () => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const addCastDetails = async () => {
      try {
        setError("");
        setLoader(true);
        const castData = await getMovieCast(movieId);

        if (castData.length === 0) {
          setError(" There are no information of actors for this movie.");
          return;
        }
        setCast(castData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
        setTimeout(() => {
          window.scrollBy({
            top: 525,
            behavior: "smooth",
          });
        }, 200);
      }
    };
    addCastDetails();
  }, [movieId]);
  if (!cast) {
    return null;
  }
  const keyId = nanoid();
  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {loader && <Loader />}
      <ul className={css.actorList}>
        {cast?.map((i, keyId) => (
          <li key={keyId} className={css.actorCard}>
            <img
              className={css.actor}
              src={
                i.path != null
                  ? `https://image.tmdb.org/t/p/w500${i.path}`
                  : noPortret
              }
              alt={i.name}
              style={{ width: 170 }}
            />
            <h3 className={css.name}>{i.name}</h3>
            <p>{i.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
