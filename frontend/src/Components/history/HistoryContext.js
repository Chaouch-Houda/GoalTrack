import React, { createContext, useState } from 'react';
import {matchData} from '../../componentsData/matchData'

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
    // const ids = matchData.map(objet => `history-${objet.id}`);
    // const [history,setHistory] = useState([...ids]) ;
    const [history,setHistory] = useState(matchData) ;
    const handleHistory = (id) =>{
    const selectedMatch = history.find(match => match.id === id);
        if (selectedMatch)
        setHistory(history.filter(match => match.id !== id ));
        // else setHistory([...history,matchData.find(m => m.id === id)])
    } 

  return (
    <HistoryContext.Provider 
    value={{ 
        history,
        setHistory,
        handleHistory,
     }}>
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, HistoryProvider };
