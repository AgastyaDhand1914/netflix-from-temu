import React, { useState, useEffect } from 'react'
import GenreDropBox from './components/GenreDropBox';

function TVShows() {
  const [tvgenres, Settvgenres] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  
  useEffect(() => {

      fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => Settvgenres(data.genres))
  
  }, [])

  return (
    <>
      {
        tvgenres.length > 0 && <GenreDropBox genrelist={tvgenres} type='tv' />
      }
      
    </>
  )
}

export default TVShows