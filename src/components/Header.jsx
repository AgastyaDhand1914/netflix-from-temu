import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import netflix_full from '../assets/netflix_full.jpg';
import SearchBar from './SearchBar';
import MainSlider from './MainSlider';
import MyContext from '../context/MylistContext';

function Header() {
  const [selected, Setselected] = useState('home');
  const [ShowSearch, SetShowSearch] = useState(false);
  const { CurrentURL } = useContext(MyContext);

  const handleClick = (option) => {
    Setselected(option);
    localStorage.setItem('navbar-page', JSON.stringify(option));
  };

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem('navbar-page'));
    Setselected(current);
  }, []);

  return (
    <>
      <header>
        <div className='navbar'>
          <img src={netflix_full} alt="NETFLIX" id='logo' />
          <div className='options'>
            <Link to="/" className={`navbar-option ${selected === 'home' ? 'selected' : ''}`} onClick={() => handleClick('home')}>Home</Link>
            <Link to="/tv" className={`navbar-option ${selected === 'tv' ? 'selected' : ''}`} onClick={() => handleClick('tv')}>TV Shows</Link>
            <Link to="/movies" className={`navbar-option ${selected === 'movies' ? 'selected' : ''}`} onClick={() => handleClick('movies')}>Movies</Link>
            <Link to="/popular" className={`navbar-option ${selected === 'popular' ? 'selected' : ''}`} onClick={() => handleClick('popular')}>New & Popular</Link>
            <Link to="/mylist" className={`navbar-option ${selected === 'mylist' ? 'selected' : ''}`} onClick={() => handleClick('mylist')}>My List</Link>
            <Link to="/browselanguages" className={`navbar-option ${selected === 'browselang' ? 'selected' : ''}`} onClick={() => handleClick('browselang')}>Browse by Languages</Link>
          </div>
        </div>
        <div id='icon-options'>
          <div id="search-cont">
            {ShowSearch && <SearchBar />}
            <div id='search' onClick={() => SetShowSearch(!ShowSearch)}></div>
          </div>
          <div id='notification'></div>
          <div id='user-profile'></div>
        </div>
      </header>
      <div id='gradient'>
        {
          selected && ['home', 'tv', 'movies'].includes(selected) &&
          !(CurrentURL.includes('/title') || CurrentURL.includes('/search')) &&
          <MainSlider selected={selected} />
        }
      </div>
    </>
  );
}

export default Header;