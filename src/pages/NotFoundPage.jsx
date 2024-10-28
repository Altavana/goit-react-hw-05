import imgNotFound from "../images/notFound.jpg";
const NotFoundPage = () => {
  return (
    <div>
      <h3>Page not found. Please try again</h3>
      <img src={imgNotFound} alt="Not found page" width="500" height="500" />
    </div>
  );
};

export default NotFoundPage;
