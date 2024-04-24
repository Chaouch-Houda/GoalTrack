import React, { createContext, useState } from 'react';
import {matchData} from '../../componentsData/matchData'

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
    const [favorites,setFavorites] = useState([matchData[1],matchData[3]])
    const handleFavorites = (match) =>{
      const selectedVideo = favorites.find(fav => fav.id === match.id)
      console.log(selectedVideo)
        if (selectedVideo)
        setFavorites(favorites.filter((fav) => fav.id !== match.id ));
        else setFavorites([...favorites,match])
    } 

  return (
    <FavoritesContext.Provider 
    value={{ 
        favorites,
        setFavorites,
        handleFavorites,
     }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
