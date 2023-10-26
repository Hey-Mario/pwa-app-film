import React, { useEffect, useState } from "react";
import './styles/movie-search.css';
import { searchMovies } from "./api/moovie";
import CartFilm from "./component/CartFilm";
import * as AOS from 'aos';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    AOS.init();
  },[])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()!=="") {
      setIsLoading(true);
      try {
        const moviedata = await searchMovies(searchTerm);
        console.log(moviedata);
        setMovies(moviedata);
        setSearchTerm('');
        setIsLoading(false);
      } catch (error) {
        console.error("Error in handleSearch:", error);
        setIsLoading(false);
      }
    }
  };

  function truncateOverview(overview: string, wordLimit: number): string {
    const words = overview.split(" ");

    if (words.length <= wordLimit) {
      return overview;
    }

    const truncatedText = words.slice(0, wordLimit).join(" ");
    return `${truncatedText} ...`;
  }
  return (
    <div>
      <header>
        <h1>MariFlix</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Nom du film"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isLoading ? (
              <button disabled>recherche...</button>
            ) : (
              <button type="submit">Rechercher</button>
            )}
          </form>
        </div>
      </header>
      {/* <hr /> */}
      {/* <div
        className="movie-list"
      >
        {movies?.map((movie: any) => <CartFilm movie={movie}/>)}
      </div> */}
      <div className="film-card-list">
        {movies.map((movie) => (
          <CartFilm movie={movie}/>
        ))}
      </div>

    </div>
  );
};

export default App;
