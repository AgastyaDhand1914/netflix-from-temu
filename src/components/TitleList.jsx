import React, { useEffect, useState } from 'react';
import './titlelist.css';
import ListItem from './ListItem';

function TitleList({ genre, both = '0', option = 'none', pages = 1 }) {
    const [movies, Setmovies] = useState([]);
    const [tvshows, Settvshows] = useState([]);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        Setmovies([]);
        Settvshows([]);
    }, [genre.id, option])

    useEffect(() => {
        if (both === '1' || option === 'movie') {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&page=${pages}`)
                .then((response) => response.json())
                .then((data) => Setmovies((prev_data) => [...prev_data, ...data.results]));
        }
        if (both === '1' || option === 'tv') {
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genre.id}&page=${pages}`)
                .then((response) => response.json())
                .then((data) => Settvshows((prev_data) => [...prev_data, ...data.results]));
        }
    }, [genre.id, pages]);

    return (
        <>
            <p id='genre-name'>{genre.name}</p>
            <div id='grid-cont-list'>
              <div className='list-grid'>
                {
                    movies.length > 0 && movies.map((movie, index) => (
                            <ListItem title={movie} key={`movie-${genre.id}-${movie.id}-${pages}-${index}`} />
                        ))
                }
                {
                    tvshows.length > 0 && tvshows.map((show, index) => (
                            <ListItem title={show} key={`tvshow-${genre.id}-${show.id}-${pages}-${index}`} />
                        ))
                }
              </div>
            </div>
        </>
    );
}

export default TitleList;
