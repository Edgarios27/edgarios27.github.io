import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
 

const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => { 
   if (localStorage.getItem('isLoggedIn'))
   {
    if(localStorage.getItem('isLoggedIn')==='true'){
    setIsLoggedIn(true)
    }
   }
  
  }, []);


  const login = () => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    setIsLoggedIn(true);
  };


  const logout = () => {
    localStorage.setItem('isLoggedIn','');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, }}> {children}</AuthContext.Provider>);}