import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = props => {
  const [signUp, setSignUp] = useState(false);
  const [authClicked, setAuthClicked] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const contextValue = {
    signUp,
    setSignUp,
    authClicked,
    setAuthClicked,
    menuOpened,
    setMenuOpened
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {props.children}
    </ModalContext.Provider>
  );
};
