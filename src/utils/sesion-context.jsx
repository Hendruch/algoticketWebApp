import React, { createContext, useState } from 'react';

export const sesionContext = createContext({
  user: null,
  setUser: () => {}
});

export const SesionContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  return (
    <sesionContext.Provider value={{ user, setUser }}>
      {children}
    </sesionContext.Provider>
  );
};
