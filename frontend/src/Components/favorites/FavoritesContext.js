import React, { createContext, useState } from 'react';
import {matchData} from '../../componentsData/matchData'

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
    const [favorites,setFavorites] = useState([matchData[1].id,matchData[3].id])
    const handleFavorites = (id) =>{
        if (favorites.includes(id))
        setFavorites(favorites.filter((fav)=> fav !== id ));
        else setFavorites([...favorites,id])
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
