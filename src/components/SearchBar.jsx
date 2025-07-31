import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './searchbar.css'

function SearchBar() {
  const [Text, SetText] = useState('');
  const [Results, SetResults] = useState([]);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const UpdateQuery = (event) => {
    SetText(event.target.value)
  }

  const SubmitQuery = async (event) => {

    event.preventDefault()
    SetResults([]);

    if (!Text.trim())    return;

    try {
      const [movieResponse, tvResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${Text}`),
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${Text}`),
      ]);
  
      const [movieResults, tvResults] = await Promise.all([
        movieResponse.json(),
        tvResponse.json(),
      ]);
  
      const combinedResults = [
        ...(movieResults.results || []),
        ...(tvResults.results || []),
      ];

      SetResults(combinedResults);
      navigate(`/search/${Text}`, {state: { Results: combinedResults }});

      document.getElementById('search-input').value = '';
    } catch(error) {
      console.log('Error:', error)
    }
}

  return (
    <>
    <div id="search-bar">
        <input type="text" placeholder='Search Titles' id='search-input' onChange={UpdateQuery} />
        <input type="submit" id='submit-btn' value='Search' onClick={SubmitQuery} />
    </div>
    </>
  )
}

export default SearchBar