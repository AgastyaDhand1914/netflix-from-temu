import React from 'react'
import './gridlist.css'
import ListItem from './ListItem'

function GridList({titles}) {
  return (
    <>
      <div id='category-grid-cont'>
          <div className='category-grid'>
          {
              titles && titles.map((title, index) => (
                      <ListItem title={title} key={index} />
                  ))
          }
        </div>
      </div>
    </>
  )
}

export default GridList