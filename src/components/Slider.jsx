import React from 'react'
import './slider.css'
import TitleSlider from './TitleSlider';

function Slider({content, value}) {
  let lowercase_string = content.toLowerCase();

  if (content == "Trending")    content += " Now: ";

  if (value == "tv")    content += value.toUpperCase() + " Shows";
  else    content += value.charAt(0).toUpperCase() + value.slice(1) + 's'; 

  return (
    <>
    <div id='slider'>
    <p>{content}</p>
    <TitleSlider lowercase_string={lowercase_string} value={value} />
    </div>
    </>
  )
}

export default Slider