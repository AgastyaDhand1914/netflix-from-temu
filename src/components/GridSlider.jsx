import React, { useEffect, useState } from 'react'
import GridList from './GridList'
import './gridslider.css'

function GridSlider({type, category, resetPage}) {
  let Category_title;
  
  if (category === 'popular')    Category_title = 'Popular';
  else if (category === 'upcoming' && type === 'tv')    Category_title = 'Currently Airing';
  else if (category === 'top_rated')    Category_title = 'Top Rated'
  else if (category === 'upcoming')    Category_title = 'Upcoming';

  const [titles, Settitles] = useState([]);
  const pages = 40;
  const [i, Seti] = useState(1);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/${type}/${(category === 'upcoming' && type == 'tv') ? 'on_the_air' : category}?api_key=${API_KEY}&page=${i}`)
    .then((response) => response.json())
    .then((data) => Settitles(data.results))

  }, [category, type, i]);

  useEffect(() => {
    Seti(1);
  }, [resetPage]);

  const HandlePrevLoad = () => {
    if (i > 1)    Seti(i - 1);
    else    Seti(pages);
  }

  const HandleNextLoad = () => {
    if (i < pages)    Seti(i + 1);
    else    Seti(1);
  }

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '80px', padding: '0'}}>
          <div style={{color: 'white', fontSize: '60px'}}>{Category_title}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
            <div id='load-prev' onClick={HandlePrevLoad}>Previous</div>
            <div id='load-next' onClick={HandleNextLoad}>Next</div>
          </div>
        </div>
      <GridList titles={titles} />
    </div>
    </>
  )
}

export default GridSlider