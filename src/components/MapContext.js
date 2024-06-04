import React, { createContext, useState } from "react";

export const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [staticOld, setStaticOld] = useState([]);
  const [staticChild, setStaticChild] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null); // 선택한 바 상태 추가
  const [findRoad, setFindRoad] = useState({ lat: null, lng: null });

  const setOldLocations = (locations) => {
    setStaticOld(locations);
  };

  const setChildLocations = (locations) => {
    setStaticChild(locations);
  };

  // 선택한 바 상태를 변경하는 함수
  const setSelectedBarState = (bar) => {
    setSelectedBar(bar);
  };

  return (
    <MapContext.Provider
      value={{
        staticOld,
        staticChild,
        setOldLocations,
        setChildLocations,
        selectedBar,
        setSelectedBarState,
        setSelectedBar,
        findRoad,
        setFindRoad,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
