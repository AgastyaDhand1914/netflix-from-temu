import React, { useState , useEffect } from 'react'
import GridList from './GridList';

function BLSlider({type, resetPage, lang_code}) {

  let media_type = (type === 'tv') ? 'TV Shows' : 'Movies';

  const [titles, Settitles] = useState([]);
  const pages = 20;
  const [i, Seti] = useState(1);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=${lang_code}&page=${i}`)
    .then((response) => response.json())
    .then((data) => Settitles(data.results))

  }, [type, i, lang_code]);

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
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '80px', padding: '0 70px 0 0'}}>
          <div style={{color: 'white', fontSize: '60px'}}>{media_type}</div>
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

export default BLSlider