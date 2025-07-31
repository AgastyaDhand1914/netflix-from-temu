import React, { useState, useEffect } from 'react'
import GenreDropBox from './components/GenreDropBox';

function Movies() {
  const [moviegenres, Setmoviegenres] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  
  useEffect(() => {

      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => Setmoviegenres(data.genres))
  
  }, [])

  return (
    <>
      {
        moviegenres.length > 0 && <GenreDropBox genrelist={moviegenres} type='movie' />
      }
      
    </>
  )
}

export default Movies