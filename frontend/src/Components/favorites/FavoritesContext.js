import React, { createContext, useState } from 'react';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
    const [favorites,setFavorites] = useState([])
    const handleFavorites = (index) =>{
        if (favorites.includes(index))
        setFavorites(favorites.filter((fav)=> fav !== index ));
        else setFavorites([...favorites,index])
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
