'use client';
import React, { createContext, useState } from 'react';

// Cria o contexto
export const ModalContext = createContext();

// Provedor do contexto
export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleVisible = ()=>{
    setIsVisible(!isVisible)
  }

  return (
    <ModalContext.Provider value={{ isVisible, handleVisible }}>
      {children}
    </ModalContext.Provider>
  );
};