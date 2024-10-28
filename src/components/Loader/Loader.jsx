import { BallTriangle } from "react-loader-spinner";
import css from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <BallTriangle
        height={70}
        width={70}
        radius={5}
        color="#f3ce01"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Loader;
