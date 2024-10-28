import { useEffect } from "react";
// import toast from "react-hot-toast";
import css from "./ErrorMessage.module.css";
import imgErr from "../../images/errorMessage.jpg";

const ErrorMessage = ({ message }) => {
  // useEffect(() => {
  //   toast.error(message);
  // }, [message]);

  return (
    <div className={css.errorMessage}>
      <h3>Oops... Sorry, something was wrong... </h3>
      <p> {message}</p>
      <img
        className={css.errorImage}
        src={imgErr}
        alt="Error image"
        width="400"
        height="400"
      />
    </div>
  );
};

export default ErrorMessage;
