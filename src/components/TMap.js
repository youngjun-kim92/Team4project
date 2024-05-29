import React, { useContext, useEffect, useRef, useState } from 'react';
import { MapContext } from './MapContext';

const TMap = () => {
  const { staticOld, staticChild } = useContext(MapContext);
  const [map, setMap] = useState(null);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const loadMap = () => {
      const newMap = new window.Tmapv2.Map('tmap', {
        center: new window.Tmapv2.LatLng(37.5665, 126.9780),
        width: "100%",
        height: "400px",
        zoom: 10,
      });
      setMap(newMap);
    };

    if (!window.Tmapv2) {
      const script = document.createElement('script');
      script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=GVw3YvVtfxP4pHYdV0yB7McEvM1Pwfe3MbOU0Ofj`;
      script.async = true;
      script.onload = () => loadMap();
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  useEffect(() => {
    if (map) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      const addMarker = (map, position, title, info) => {
        const markerIcon = info.type === 'child' 
          ? "https://tmapapi.tmapmobility.com/resources/images/common/pin_car.png" // 어린이 마커 아이콘 URL
          : "https://tmapapi.tmapmobility.com/upload/tmap/marker/pin_b_m_a.png"; // 기본 마커 아이콘 URL

        const marker = new window.Tmapv2.Marker({
          position: position,
          map: map,
          title: title,
          icon: markerIcon,
        });
        marker.addListener('click', () => setSelectedMarkerInfo(info));
        markersRef.current.push(marker);
      };
      
      const allLocations = [...staticOld, ...staticChild];
      allLocations.forEach(location => {
        const position = new window.Tmapv2.LatLng(location.lat, location.lng);
        addMarker(map, position, location.title, location);
      });
    }
  }, [map, staticOld, staticChild]);

  return (
    <div>
      <div id="tmap" style={{ width: '400px', height: '400px' }}></div>
      {selectedMarkerInfo && (
        <div>
          <h3>{selectedMarkerInfo.type==='child'?"어린이":"노인"}</h3>
          <p>지점명: {selectedMarkerInfo.title}</p>
          <p>사고건수: {selectedMarkerInfo.accidentCount}</p>
        </div>
      )}
    </div>
  );
};

export default TMap;
