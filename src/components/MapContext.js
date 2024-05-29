// MapContext.js
import React, { createContext, useState } from 'react';

export const MapContext = createContext();

const MapProvider = ({ children }) => {
    const [staticOld, setStaticOld] = useState([]);
    const [staticChild, setStaticChild] = useState([]);
    const setOldLocations = (locations) => {
        setStaticOld(locations);
      };
    
      const setChildLocations = (locations) => {
        setStaticChild(locations);
      };

  return (
    <MapContext.Provider value={{ staticOld, staticChild, setOldLocations, setChildLocations }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
