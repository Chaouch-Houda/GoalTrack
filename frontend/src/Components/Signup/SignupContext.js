import React, { createContext, useState } from 'react';

const SignupContext = createContext();

const SignupProvider = ({ children }) => {
  const [showSignup, setShowSignup] = useState(false);

  const openSignup = () =>{
    setShowSignup(true);
  };


  const closeSignup = () => {
    setShowSignup(false);
  };

  return (
    <SignupContext.Provider 
    value={{ 
      showSignup,
      openSignup,
      closeSignup
     }}>
      {children}
    </SignupContext.Provider>
  );
};

export { SignupContext, SignupProvider };
