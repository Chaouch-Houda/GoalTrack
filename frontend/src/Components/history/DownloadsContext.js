import React, { createContext, useState } from 'react';
import {matchData} from '../../componentsData/matchData'

const DownloadsContext = createContext();

const DownloadsProvider = ({ children }) => {
    const [downloads,setDownloads] = useState([matchData[1],matchData[3]])
    const handleDownloads = (id) =>{
      const selectedVideo = downloads.find(match => match.id === id )
        if (selectedVideo)
        setDownloads(downloads.filter((match) => match.id !== id ));
        // else setDownloads([...downloads,matchData.find(m => m.id === id)])
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
