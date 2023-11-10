import React, { createContext, useState } from 'react';
import {matchData} from '../../componentsData/matchData'

const DownloadsContext = createContext();

const DownloadsProvider = ({ children }) => {
    const [downloads,setDownloads] = useState([`downloaded-${matchData[1].id}`,`downloaded-${matchData[3].id}`])
    const handleDownloads = (id) =>{
        if (downloads.includes(id))
        setDownloads(downloads.filter((fav)=> fav !== id ));
        else setDownloads([...downloads,id])
    } 

  return (
    <DownloadsContext.Provider 
    value={{ 
        downloads,
        setDownloads,
        handleDownloads,
     }}>
      {children}
    </DownloadsContext.Provider>
  );
};

export { DownloadsContext, DownloadsProvider };
