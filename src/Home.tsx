import React, { useEffect, useState } from "react";
import './styles/movie-search.css';
import { searchMovies } from "./api/moovie";
import CartFilm from "./component/CartFilm";
import * as AOS from 'aos';
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);
  const API_KEY = localStorage.getItem('api_key') ?? "";
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  },[])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()!=="") {
      setIsLoading(true);
      try {
        const moviedata = await searchMovies(searchTerm, API_KEY);
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

  const logout = () => {
    localStorage.removeItem('api_key');
    navigate('/')
  }
 
  return (
    <div style={{ minHeight: '100vh' }}>
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
              <button disabled>Recherche...</button>
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
      {
        (!movies || movies.length === 0) && <div className="p-3">
          <div className="text-center">
            <img src="mariFilx2.png" alt="logo" width={300} />
          </div>
          <h1>🍿Rechercher un Film chez Mari Flix 😊🎬</h1>
        </div>
      }

      <div className="deco">
        <button onClick={logout}>Deconnexion</button>
      </div>
    </div>
  );
};

export default Home;
