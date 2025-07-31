import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './genregrid.css';
import { motion, useAnimation } from 'framer-motion';

function GenreGrid({ genre, both = '0', option = 'none' }) {
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvShows] = useState([]);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {
    if (both === '1' || option === 'movie') {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
      )
        .then((response) => response.json())
        .then((data) => setMovies(data.results));
    }
    if (both === '1' || option === 'tv') {
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genre.id}`
      )
        .then((response) => response.json())
        .then((data) => setTvShows(data.results));
    }
  }, [genre.id, both, option]);

  const showDetails = (title) => {
    navigate(`/title/${title.name || title.title}`, { state: { title } });
  };

  const GridItems = (titles) =>
    titles.map((title) => (
      <div className="grid-item" key={title.id}>
        <GridItem title={title} />
      </div>
    ));

  const GridItem = ({ title }) => {
    const ref = useRef(null);
    const mainControls = useAnimation();

    useEffect(() => {
      const handleVisibility = () => {
        const rect = ref.current.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        const visiblePercentage = (visibleHeight / rect.height) * 100;

        if (visiblePercentage > 0) {
          mainControls.start('visible');
        } else {
          mainControls.start('hidden');
        }
      };

      handleVisibility();

      window.addEventListener('scroll', handleVisibility);
      window.addEventListener('resize', handleVisibility);

      return () => {
        window.removeEventListener('scroll', handleVisibility);
        window.removeEventListener('resize', handleVisibility);
      };
    }, [mainControls]);

    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 15, scale: 0.85 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.4 }}
        className="grid-item"
        onClick={() => showDetails(title)}
      >
        <img
          className="image-ind"
          src={`https://image.tmdb.org/t/p/w200${title.poster_path}`}
          alt={title.title || title.name}
        />
      </motion.div>
    );
  };

  return (
    <div id="grid-cont">
      <p id="genre-name">{genre.name}</p>
      <div className="grid">
        {movies.length > 0 && GridItems(movies)}
        {tvshows.length > 0 && GridItems(tvshows)}
      </div>
    </div>
  );
}

export default GenreGrid;