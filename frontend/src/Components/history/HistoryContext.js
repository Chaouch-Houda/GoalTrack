import React, { createContext, useState } from 'react';
import {matchData} from '../../componentsData/matchData'

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
    const ids = matchData.map(objet => `history-${objet.id}`);
    const [history,setHistory] = useState([...ids]) ;
    const handleHistory = (id) =>{
        if (history.includes(id))
        setHistory(history.filter((historyId)=> historyId !== id ));
        else setHistory([...history,id])
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
