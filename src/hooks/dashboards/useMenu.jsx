import { useState } from 'react';

export const useMenu = () => {
    const [dash, setDash] = useState([]);
  
    const actualizarMenu = (nuevoMenu) => {
      // Verificar si el nuevoMenu es diferente al estado actual
      if (nuevoMenu !== dash) {
        setDash(nuevoMenu);
      }
    };
  
    return [dash, actualizarMenu];
  };
  
