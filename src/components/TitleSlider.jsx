import React, { useEffect, useState } from 'react';
import './titleslider.css';
import { useNavigate } from 'react-router-dom';

function TitleSlider({ lowercase_string, value }) {
  const [titles, setTitles] = useState([]);
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const url =
    lowercase_string !== 'trending'
      ? `https://api.themoviedb.org/3/${value}/${lowercase_string}?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/${lowercase_string}/${value}/week?api_key=${API_KEY}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTitles(data.results);
      });
  }, [url]);

  const showDetails = (title) => {
    navigate(`/title/${title.name || title.title}`, { state: { title } });
  };

  const handleNextClick = () => {
    setI((i + 5) % titles.length);
  };

  const handlePrevClick = () => {
    setI((i - 5 + titles.length) % titles.length);
  };

  return (
    <>
      <div id="main-cont">
        <div id="prev" onClick={handlePrevClick}>
          &#9665;
        </div>
        <div id="title-images">
          {titles.slice(i, i + 5).map((title) => (
            <div key={title.id}>
              <img
                className="image-ind"
                src={`https://image.tmdb.org/t/p/w200${title.poster_path}`}
                alt={title.title}
                onClick={() => showDetails(title)}
              />
            </div>
          ))}
        </div>
        <div id="next" onClick={handleNextClick}>
          &#9655;
        </div>
      </div>
    </>
  );
}

export default TitleSlider;

