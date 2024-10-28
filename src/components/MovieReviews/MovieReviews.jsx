import { useEffect, useState } from "react";
import { getMovieRewies } from "../../utils/moviesAPI";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { nanoid } from "nanoid";

const MovieReviews = () => {
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const addRevData = async () => {
      try {
        setError("");
        setLoader(true);
        const reviewsData = await getMovieRewies(movieId);

        if (reviewsData.length === 0) {
          setError(" There are no reviews for this movie.");
          return;
        }
        setReviews(reviewsData);
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
    addRevData();
  }, [movieId]);
  if (!reviews) {
    return null;
  }
  const keyId = nanoid();
  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {loader && <Loader />}
      <ul>
        {reviews?.map((i, keyId) => (
          <li key={keyId} className={css.reviews}>
            <h3 className={css.author}> {i.author}</h3>
            <p className={css.reviewsText}>{i.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
