import React, { useContext, useEffect } from 'react'
import MyContext from './context/MylistContext';
import GridList from './components/GridList';

function MyList() {

  const { ListTitles, SetListTitles } = useContext(MyContext);

  useEffect(() => {
    const MyListTitles = localStorage.getItem("List-Titles");
    if (MyListTitles) {
      SetListTitles(JSON.parse(MyListTitles))
    }
  }, [])

  if (ListTitles.length <= 0) {
    return  (
      <div style={{position: 'relative', top: '-200px', zIndex: '100', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '600px', height: '250px', border: '5px solid red', borderRadius: '20px', 
          background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', 
          color: 'white', fontSize: '44px'}}>No Titles in Your List.</div>
      </div>
    )
  }

  return (
    <div style={{position: 'relative', top: '-320px', zIndex: '100'}}>
      {
        <GridList titles={ListTitles} />
      }
    </div>
  )
}

export default MyList