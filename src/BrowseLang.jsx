import React, { useState, useEffect} from 'react'
import BLSlider from './components/BLSlider';

function BrowseLang() {

  const [pageReset, SetpageReset] = useState(true);
  const types = ['movie', 'tv']
  const [lang_options, Setlang_options] = useState([]);
  const [lang, Setlang] = useState('en');
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => Setlang_options(data))

  }, []);

  const HandleOptionChange =  (e) => {
    const selected_lang = e.target.value;
    Setlang(selected_lang);
    SetpageReset(!pageReset);
  }



  return (
    <>
    <div style={{position: 'relative', top: '-250px', zIndex: '100', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0'}}>
      <div>
      <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', alignItems: 'center', padding: '0 70px 70px 70px'}}>
        <div>
        <label htmlFor="select-dropbox">Select Media Type: </label>
        <select name="select-dropbox" id="select-dropbox" value={lang} onChange={HandleOptionChange} >
            {
              lang_options && lang_options.map((language, index) => (
                  <option key={index} value={language.iso_639_1}>{language.english_name}</option>
              ))
            }
        </select>
        </div>
      </div>
      {
        types.map((type, index) => (
            <BLSlider key={index} type={type} lang_code={lang} resetPage={pageReset} />
        ))
      }
      </div>
    </div>
    </>
  )
}

export default BrowseLang