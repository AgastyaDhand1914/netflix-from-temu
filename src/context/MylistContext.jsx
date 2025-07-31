import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [ListTitles, SetListTitles] = useState([]);
  const location = useLocation();
  const [CurrentURL, setCurrentURL] = useState(location.pathname);

  useEffect(() => {
    setCurrentURL(location.pathname);
  }, [location]);

  useEffect(() => {
    const storedTitles = localStorage.getItem('List-Titles');
    if (storedTitles) {
      SetListTitles(JSON.parse(storedTitles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('List-Titles', JSON.stringify(ListTitles));
  }, [ListTitles]);

  return (
    <MyContext.Provider value={{ ListTitles, SetListTitles, CurrentURL }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
