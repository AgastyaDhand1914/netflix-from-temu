import React, { useState } from 'react'
import './genredropbox.css'
import TitleList from './TitleList';

function GenreDropBox({genrelist, type}) {

  const [option, Setoption] = useState(genrelist[0]);
  const [i, Seti] = useState(1);

  const HandleOptionChange = (e) => {
    const selected = genrelist.find( genreitem => genreitem.id === parseInt(e.target.value));
        Setoption(selected);
        Seti(1);
  }

  const HandleLoadPages = () =>{
    Seti(i + 1);
  }

  return (
    <>
      <div id='drop-box-cont'>
        <label htmlFor="select-dropbox">Select Genre: </label>
        <select name="select-dropbox" id="select-dropbox" onChange={HandleOptionChange} >
            {
                genrelist.map((genreitem) => (
                    <option value={genreitem.id} key={genreitem.id}>{genreitem.name}</option>
                ))
            }
        </select>
      </div>
      <div>
        { 
          option && <TitleList genre={option} option={type} pages={i} />
        }
      </div>
      <div id='load-more' onClick={HandleLoadPages}>Show More</div>
    </>
  )
}

export default GenreDropBox