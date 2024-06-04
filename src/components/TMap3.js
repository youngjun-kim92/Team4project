import React, { useEffect, useRef, useContext, useState } from 'react';
import $ from 'jquery';
import { MapContext } from './MapContext';

const TMap3 = ({ setAddresses, mapRef }) => {
  const { setFindRoad } = useContext(MapContext);
  const [map, setMap] = useState(null);
  const [markerCount, setMarkerCount] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [startAddress, setStartAddress] = useState(''); // 출발지 주소 상태
  const [endAddress, setEndAddress] = useState(''); // 도착지 주소 상태
  const { Tmapv2 } = window;

  useEffect(() => {
    const initializedMap = new Tmapv2.Map(mapRef.current, {
      center: new Tmapv2.LatLng(37.5652045, 126.98702028),
      width: '1728px',
      height: '600px',
      zoom: 17,
      zoomControl: true,
      scrollwheel: true,
    });
    setMap(initializedMap);
  }, [mapRef, Tmapv2]);

  useEffect(() => {
    if (!map) return;

    const clickListener = (evt) => {
      setMarkerCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount >= 2) {
          mapRef.current.style.display = 'none';
        }
        return newCount;
      });

      const mapLatLng = evt.latLng;
      const markerPosition = new Tmapv2.LatLng(mapLatLng._lat, mapLatLng._lng);

      const newMarker = new Tmapv2.Marker({
        position: markerPosition,
        icon: process.env.PUBLIC_URL + '/images/pin_r_m_s.png',
        iconSize: new Tmapv2.Size(24, 38),
        map: map,
      });

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      setFindRoad({ lat: mapLatLng._lat, lng: mapLatLng._lng });

      reverseGeo(mapLatLng._lng, mapLatLng._lat, markerCount);
    };

    map.addListener('click', clickListener);

    return () => {
      map.removeListener('click', clickListener);
    };
  }, [map, setFindRoad, markerCount]);

  const reverseGeo = (lon, lat, markerIndex) => {
    const headers = {
      appKey: '키 입력',
    };

    $.ajax({
      method: 'GET',
      headers: headers,
      url: 'https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result',
      async: false,
      data: {
        coordType: 'WGS84GEO',
        addressType: 'A10',
        lon: lon,
        lat: lat,
      },
      success: (response) => {
        const arrResult = response.addressInfo;
        let newRoadAddr = `${arrResult.city_do} ${arrResult.gu_gun} ${arrResult.roadName} ${arrResult.buildingIndex}`;
        console.log(newRoadAddr);
        if (markerIndex === 0) {
          // 첫 번째 마커인 경우 출발지 주소 업데이트
          setStartAddress(newRoadAddr);
        } else if (markerIndex === 1) {
          // 두 번째 마커인 경우 도착지 주소 업데이트
          setEndAddress(newRoadAddr);
        }
      },
      error: (request, status, error) => {
        console.error(
          `code: ${request.status}\nmessage: ${request.responseText}\nerror: ${error}`
        );
      },
    });
  };

  useEffect(() => {
    // 출발지 또는 도착지 상태가 변경될 때마다 부모 컴포넌트에 업데이트를 알림
    setAddresses({ startAddress, endAddress });
  }, [startAddress, endAddress, setAddresses]);

  return null;
};

export default TMap3;
