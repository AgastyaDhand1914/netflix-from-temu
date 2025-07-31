import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './titledetails.css';
import MyContext from '../context/MylistContext';

const TitleDetails = () => {
  const [genres, Setgenres] = useState([]);
  const [Added, SetAdded] = useState(false);
  const { ListTitles, SetListTitles } = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  let backdrop_img, year;


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => Setgenres(data.genres));

    const { title } = location.state || {};
    if (title && ListTitles.some((item) => item.id === title.id)) {
      SetAdded(true);
    }
  }, [ListTitles, location.state]);

  const { title } = location.state || {};

  if (!title) {
    navigate(-1);
    return null;
  }

  const onClose = () => {
    navigate(-1);
  };

  if (title) {
    backdrop_img = `https://image.tmdb.org/t/p/w500${title.backdrop_path}`;
    year = new Date(title.release_date || title.first_air_date).getFullYear();
  }

  const AddToList = () => {
    SetAdded(true);
    SetListTitles((prev) => {
      const PresentInList = prev.some((item) => item.id === title.id);
      if (!PresentInList) {
        const updated = [...prev, title];
        localStorage.setItem('List-Titles', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const RemoveFromList = () => {
    SetAdded(false);
    SetListTitles((prev) => {
      const updated = prev.filter((item) => item.id !== title.id);
      localStorage.setItem('List-Titles', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div id="overlay-cont">
      <div id="overlay-content">
        <div id="close-btn">
          <button onClick={onClose}></button>
        </div>
        {
          (title.backdrop_path && <img src={backdrop_img} alt={title.name || title.title} id="overlay-img" />) ||
          <div id="overlay-img-placeholder"></div>
        }
        <div id="title-cont">
          <p id="detail-title">
            {title.original_language === 'en' ? title.original_name || title.title : title.name || title.title}
          </p>
          <div id="buttons">
            <div className="title-detail-btn">Watch</div>
            {!Added ? (
              <div className="title-detail-btn" onClick={AddToList}>
                <b style={{ backgroundColor: 'transparent' }}>+&nbsp;</b>
                My List
              </div>
            ) : (
              <div className="title-detail-btn" onClick={RemoveFromList}>
                <b id="remove-list" style={{ backgroundColor: 'transparent' }}>-&nbsp;</b>
                My List
              </div>
            )}
          </div>
        </div>
        <div id="general-details">
          <div id="title-lang">{title.original_language.toUpperCase()}</div>
          <div id="title-rating">
            Rating: {title.vote_average !== 0 ? title.vote_average : 'N/A'}⭐
          </div>
          <div id="title-date">Released in: {year}</div>
          <div id="title-genres">
            Genre Tags:
            {genres &&
              title.genre_ids.map((genre_id, index) => (
                <div key={index}>
                  {genres
                    .filter((genre) => genre.id === genre_id)
                    .map((filtered_genre, index2) => (
                      <div
                        key={index2}
                        style={{ backgroundColor: 'rgb(34, 30, 30)' }}
                      >
                        {filtered_genre.name}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
        <div id="title-overview">{title.overview || 'N/A'}</div>
      </div>
    </div>
  );
};

export default TitleDetails;