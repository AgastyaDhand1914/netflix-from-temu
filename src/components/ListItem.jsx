import React from 'react'
import { useNavigate } from 'react-router-dom';
import './listitem.css'
import { motion } from 'motion/react';

function ListItem({title}) {
  const navigate = useNavigate();

  const showDetails = (title) => {
    navigate(`/title/${title.name || title.title}`, { state: { title } });
  };

  return (
    <>
      {
        title &&
        <motion.div id='list-item-cont' onClick={() => showDetails(title)}
        initial = {{
          opacity: 0.1,
          scale: 0.9,
        }}
        transition = {{
            duration: 0.1,
        }}
        whileInView = {{
            opacity: 1,
            scale: 1,
        }}>
        <img
          className="image-indv"
          src={`https://image.tmdb.org/t/p/w200${title.poster_path}`}
          alt={title.title}
        />
          <div id='title-content'> 
              <span className='title-info' id='title'>{title.name || title.title}</span>
              <span className='title-info'>Rating: {title.vote_average > 0 ? title.vote_average : "N/A"} ⭐</span>
              <span className='title-info'>Release Date: {(title.release_date || title.first_air_date) ? title.release_date || title.first_air_date : "N/A"}</span>
          </div>
        </motion.div>
      }
    </>
  )
}

export default ListItem