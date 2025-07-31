import React, { useState } from 'react'
import GridSlider from './components/GridSlider';

function Popular() {

  const [type, Settype] = useState('movie');
  const [pageReset, SetpageReset] = useState(true);
  const categories = ['popular', 'top_rated', 'upcoming'] 

  const HandleOptionChange =  (e) => {
    const selected_media = e.target.value;
    Settype(selected_media);
    SetpageReset(!pageReset);
  }

  return (
    <>
    <div style={{position: 'relative', top: '-300px', zIndex: '100', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0'}}>
      <div>
      <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', alignItems: 'center', padding: '0 70px 70px 70px'}}>
        <div style={{fontSize: '100px', textAlign: 'center', paddingBottom: '30px', color: 'white', textShadow: '-10px 8px 8px rgba(0, 0, 0, 1)'}}>{type === 'movie' ? 'Movies' : 'TV Shows'}</div>
        <div>
        <label htmlFor="select-dropbox">Select Media Type: </label>
        <select name="select-dropbox" id="select-dropbox" onChange={HandleOptionChange} >
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
        </select>
        </div>
      </div>
      {
        categories.map((category, index) => (
            <GridSlider key={index} type={type} category={category} resetPage={pageReset} />
        ))
      }
    </div>
    </div>
    </>
  )
}

export default Popular