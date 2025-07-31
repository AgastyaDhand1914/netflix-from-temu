import React, { useEffect, useState } from 'react'
import CoolSlider from './CoolSlider';

function MainSlider({selected}) {
  const [SliderTitles, SetSliderTitles] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  
  useEffect(() => {
    const fetchData = async () => {
      SetSliderTitles([])
      let results = [];
  
      if (['home', 'movies'].includes(selected)) {
        const Response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const movieData = await Response.json();
        if (selected === 'home') {
          results = [...movieData.results.slice(0, 6)];
        } else if (selected === 'movies') {
          results = [...movieData.results.slice(0, 10)];
        }
      }
  
      if (['home', 'tv'].includes(selected)) {
        const Response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
        const tvData = await Response.json();
        if (selected === 'home') {
          results = [...results, ...tvData.results.slice(0, 4)];
        } else if (selected === 'tv') {
          results = [...tvData.results.slice(0, 10)];
        }
      }
  
      SetSliderTitles(results);
    };
  
    fetchData();
  }, [selected]);

  console.log(selected)
  console.log('Slider Titles: ', SliderTitles)
  

  return (
    <>
      {
        SliderTitles && <CoolSlider titles={SliderTitles} />
      }
    </>
  )
}

export default MainSlider