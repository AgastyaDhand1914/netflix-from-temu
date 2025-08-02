import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './genregrid.css';
import { motion, useAnimation } from 'framer-motion';

function RecommendationGrid({ recommendationIds }) {
  const [recTitles, setRecTitles] = useState([]);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (recommendationIds && recommendationIds.length > 0) {
      const fetchTitles = async () => {
        const titlePromises = recommendationIds.map(async (id) => {
          try {
            const movieResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            );
            const movieData = await movieResponse.json();
            
            if (movieData && movieData.id && !movieData.hasOwnProperty('status_code')) {
              return { ...movieData, media_type: 'movie' };
            }
          } catch (error) {
            console.error(`Error fetching movie ${id}:`, error);
          }

          try {
            const tvResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
            );
            const tvData = await tvResponse.json();
            
            if (tvData && tvData.id && !tvData.hasOwnProperty('status_code')) {
              return { ...tvData, media_type: 'tv' };
            }
          } catch (error) {
            console.error(`Error fetching TV show ${id}:`, error);
          }

          return null;
        });

        const results = await Promise.all(titlePromises);
        const validTitles = results.filter(title => title && title.id);
        setRecTitles(validTitles);
      };

      fetchTitles();
    }
  }, [recommendationIds, API_KEY]);

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
      <p id="genre-name">Recommended Titles</p>
      <div className="grid">
        {recTitles.length > 0 && GridItems(recTitles)}
      </div>
    </div>
  );
}

export default RecommendationGrid; 