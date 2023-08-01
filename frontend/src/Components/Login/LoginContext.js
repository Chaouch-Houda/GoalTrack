import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  const openLogin = () =>{
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  return (
    <LoginContext.Provider 
    value={{ 
      showLogin,
      openLogin,
      closeLogin,
     }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
