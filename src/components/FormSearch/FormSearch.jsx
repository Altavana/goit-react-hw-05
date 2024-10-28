import { useState } from "react";
import css from "./FormSearch.module.css";
import toast, { Toaster } from "react-hot-toast";

const FormSearch = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter the title of the movie");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <div>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search moovies"
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </div>
  );
};
export default FormSearch;
