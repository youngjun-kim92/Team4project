import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { MapContext } from './MapContext';
import '../css/TMap.scss';

const TMap = () => {
  const { staticOld, staticChild, selectedBar, setSelectedBar } =
    useContext(MapContext);
  const [map, setMap] = useState(null);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  const markersRef = useRef([]);
  console.log(selectedBar);

  useEffect(() => {
    const loadMap = () => {
      let initialCenter = new window.Tmapv2.LatLng(
        37.435591791056986,
        127.35893608313405
      );

      const newMap = new window.Tmapv2.Map('tmap', {
        center: initialCenter,
        width: '700px',
        height: '400px',
        zoom: 10,
      });
      setMap(newMap);
    };
    loadMap();
  }, []);

  useEffect(() => {
    if (map && selectedBar && selectedBar.allData.length > 0) {
      const firstLocation = selectedBar.allData[0];
      const newCenter = new window.Tmapv2.LatLng(
        firstLocation.lat,
        firstLocation.lng
      );
      map.setCenter(newCenter);
    }
  }, [map, selectedBar]);

  const addMarker = useCallback((map, position, title, info) => {
    const markerIcon =
      info.type === 'child'
        ? process.env.PUBLIC_URL + '/images/KakaoTalk_20240603_142031780.png'
        : process.env.PUBLIC_URL +
          '/images/KakaoTalk_20240603_142031780_01.png';

    const marker = new window.Tmapv2.Marker({
      position,
      map,
      title,
      icon: markerIcon,
    });
    marker.addListener('click', () => setSelectedMarkerInfo(info));
    markersRef.current.push(marker);
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const showAllMarkers = useCallback(() => {
    clearMarkers();
    setSelectedBar(null);

    const allLocations = [...staticOld, ...staticChild];
    allLocations.forEach((location) => {
      const position = new window.Tmapv2.LatLng(location.lat, location.lng);
      addMarker(map, position, location.title, location);
    });
  }, [map, staticOld, staticChild, addMarker]);

  useEffect(() => {
    if (map) {
      if (selectedBar) {
        clearMarkers();
        selectedBar.allData.forEach((location) => {
          const position = new window.Tmapv2.LatLng(location.lat, location.lng);
          // console.log(position);
          addMarker(map, position, location.title, location);
        });
      } else {
        showAllMarkers();
      }
    }
  }, [map, staticOld, staticChild, selectedBar, addMarker, showAllMarkers]);

  return (
    <div className="TBox">
      <div className="left_map">
        <h1>교통약자 유형별 정보</h1>
        <p className="left_p">
          교통약자별로 교통사고 다발지를 지도에서 확인할 수 있습니다
        </p>
      </div>
      <div className="TMapAge">
        <span>노인</span>
        <img
          src={
            process.env.PUBLIC_URL +
            '/images/KakaoTalk_20240603_142031780_01.png'
          }
          alt="노인 마커"
        />{' '}
        <span>/ 어린이</span>
        <img
          src={
            process.env.PUBLIC_URL + '/images/KakaoTalk_20240603_142031780.png'
          }
          alt="어린이 마커"
        />{' '}
      </div>
      <div className="tmap-container">
        <div className="tmap-box">
          <div id="tmap"></div>
        </div>
        <div className="additional-info">
          {selectedMarkerInfo ? (
            <div className="tmap-text">
              <h3>{selectedMarkerInfo.type === 'child' ? '어린이' : '노인'}</h3>
              <p>사고지점: {selectedMarkerInfo.title}</p>
              <p>사고건수: {selectedMarkerInfo.accidentCount}</p>
              {/* <button className="t-button" onClick={showAllMarkers}>▶ 모든 사고 다발 지역 보기</button> */}
            </div>
          ) : (
            <h2>마커를 눌러서 사고 유형 정보를 확인하세요.</h2>
          )}
          <button className="t-button" onClick={showAllMarkers}>
            ▶ 모든 사고 다발 지역 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TMap;
