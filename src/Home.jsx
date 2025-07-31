import React from 'react'
import './Home.css'
import Slider from './components/Slider'
import HomeGenres from './components/HomeGenres'

function Home() {
  return (
    <>
      <Slider content="Trending" value="movie" />
      <Slider content="Trending" value="tv" />
      <HomeGenres />
    </>
  )
}

export default Home