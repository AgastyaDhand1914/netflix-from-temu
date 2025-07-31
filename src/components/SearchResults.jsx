import React from 'react'
import { useLocation } from 'react-router-dom';
import GridList from './GridList';

function SearchResults() {
  const location = useLocation();
  const { Results } = location.state;

  return (
    <>
      <div id="search-results" style={{position: 'relative', top: '-200px', zIndex: '100', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0'}}>
        {
          Results.length > 0 && <GridList titles={Results} />
        }
        {
          !Results.length && 
          <div>
          <div style={{width: '600px', height: '250px', border: '5px solid red', borderRadius: '20px', 
            background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', 
            color: 'white', fontSize: '44px'}}>No Results Found.</div>
          </div>
        }
      </div>
    </>
  )
}

export default SearchResults