import React, { useEffect, useState } from 'react'
import GenreGrid from './GenreGrid';

function HomeGenres() {
    const [Moviegenres, SetMoviegenres] = useState();
    const [TVgenres, SetTVgenres] = useState();
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY

    const genre_id_movie = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    const genre_id_tv = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;
 
    useEffect(() => {

        fetch(genre_id_movie).then((response) => response.json()).then((data) => SetMoviegenres(data.genres));
        fetch(genre_id_tv).then((response) => response.json()).then((data) => SetTVgenres(data.genres));

    }, [genre_id_movie, genre_id_tv])
 
    const common = (Moviegenres && TVgenres) ? Moviegenres.filter((item) => TVgenres.some((genre) => genre.id === item.id)) : [1, 2, 3];

    return (
    <>
      <div id='grid'>
        {
            common.slice(4, 10).map((genre) => (

              <GenreGrid key={genre.id} genre={genre} both='1' />

            ))
        }
      </div>
    </>
  )
}

export default HomeGenres