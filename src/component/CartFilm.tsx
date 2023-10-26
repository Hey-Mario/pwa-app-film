import React from 'react'
import '../App.css';
import '../styles/movie-search.css';
import 'aos/dist/aos.css'

export interface Film{
  "adult": boolean,
  "backdrop_path": string,
  "genre_ids": number[],
  "id": number,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "release_date": string,
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number
}

function CartFilm({movie}: {movie: Film}) {
  return (
    <div key={movie.id} className="film-card" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="film-card-image" />
      <div className="film-card-details">
        <h3 className="film-title">{movie.title}</h3>
      </div>
    </div>
  )
}

export default CartFilm