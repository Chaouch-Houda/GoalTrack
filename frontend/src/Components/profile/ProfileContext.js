import React, { createContext,useState } from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [ProfileData, setProfileData] = useState({
    photo: '',
    userName: '',
    firstName: '',
    lastName : '',
    email : '',
    password: '',
    about: '',
    country: '',
    phone: '',
    birthdate: '',
    gender: '',
    
  });

  const updateFormData = (data) => {
    setProfileData(data);
  };

  return (
    <ProfileContext.Provider value={{ ProfileData, updateFormData}}>
      {children}
    </ProfileContext.Provider>
  );
};
export {ProfileContext,ProfileProvider};
