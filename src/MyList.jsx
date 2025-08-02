import React, { useContext, useEffect, useState } from 'react'
import MyContext from './context/MylistContext';
import GridList from './components/GridList';
import RecommendationGrid from './components/RecommendationGrid';

function MyList() {

  const { ListTitles, SetListTitles } = useContext(MyContext);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const MyListTitles = localStorage.getItem("List-Titles");
    if (MyListTitles) {
      SetListTitles(JSON.parse(MyListTitles))
    }
  }, [])

  useEffect(() => {
    if (recommendations) {
      console.log('Recommendations updated:', recommendations);
    }
  }, [recommendations]);

  const getRecommendation = async (e) => {
    e.preventDefault();

    const titles = localStorage.getItem("List-Titles");

    if (!titles) {
      console.log("No titles in localStorage");
      return;
    }

    setIsLoading(true);
    setRecommendations(null);

    try {
      const response = await fetch("http://localhost:5000/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(JSON.parse(titles))
      })

      if (response.ok) {
        const data = await response.json();
        console.log(data[0]['data'])

        const results = [];
        const seenIds = new Set();

        if (data && data[0]['data'] && Array.isArray(data[0]['data'])) {
          data[0]['data'].forEach(titleData => {
            if (titleData && titleData['recommendations'] && Array.isArray(titleData['recommendations'])) {
              titleData['recommendations'].forEach(id => {
                if (!seenIds.has(id)) {
                  seenIds.add(id);
                  results.push(id);
                }
              });
            }
          });
        }

        setRecommendations(results);
        
      } 
      else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
      }
    } 
    catch (error) {
      console.log("Error", error);
    }
    finally {
      setIsLoading(false);
    }
  }

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
    <>
    <div style={{position: 'relative', top: '-320px', zIndex: '100'}}>
      {
        <GridList titles={ListTitles} />
      }
    </div>
    <div style={{textAlign: 'center', marginTop: '-200px'}}>
        {
          !recommendations && !isLoading && (
            <button 
              onClick={getRecommendation}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'red';
                e.target.style.backgroundColor = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'red';
                e.target.style.color = 'white';
              }}
            >
              Get Recommendations
            </button>
          )
        }

        {
          isLoading && (
            <div style={{
              color: 'white', 
              fontSize: '30px', 
              textAlign: 'center',
              padding: '20px',
              backgroundColor: 'black',
              borderRadius: '12px',
              margin: '20px auto',
              maxWidth: '400px',
              border: '5px solid red'
            }}>
              Loading recommendations... Please wait.
            </div>
          )
        }

        {
          recommendations && !isLoading && (
            <div style={{marginTop: '30px'}}>
              <RecommendationGrid recommendationIds={recommendations} />
            </div>
          )
        }
    </div>
    </>
  )
}

export default MyList