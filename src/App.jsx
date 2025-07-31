import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home.jsx';
import TVShows from './TVShows.jsx';
import Movies from './Movies.jsx';
import Popular from './Popular.jsx';
import MyList from './MyList.jsx';
import BrowseLang from './BrowseLang.jsx';
import Header from './components/Header.jsx';
import TitleDetails from './components/TitleDetails.jsx';
import SearchResults from './components/SearchResults.jsx';
import MyContext from './context/MylistContext.jsx';

function App() {
  const [ListTitles, SetListTitles] = useState([]);
  const [CurrentURL, setCurrentURL] = useState('');
  const location = useLocation();

  useEffect(() => {
    setCurrentURL(location.pathname);
  }, [location]);

  return (
    <>
      <MyContext.Provider value={{ ListTitles, SetListTitles, CurrentURL, setCurrentURL }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tv' element={<TVShows />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/mylist' element={<MyList />} />
          <Route path='/browselanguages' element={<BrowseLang />} />
          <Route path='/title/:name' element={<TitleDetails />} />
          <Route path='/search/:name' element={<SearchResults />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
}

export default App;