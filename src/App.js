import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
const api = "http://www.omdbapi.com/?apikey=cf2f99b7&";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const SearchMovies = async (title) => {
    try {
      let fullapi = api + `s=${title}`;
      const response = await fetch(fullapi);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    SearchMovies("Avengers");
  }, []);

  return (
    <div className="app">
      <h1>Hollow Night</h1>
      <div className="search">
        <input
          placeholder="Serach for Movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => SearchMovies(search)}
        ></img>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Movie not found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
