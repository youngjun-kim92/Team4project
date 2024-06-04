import React, { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import { MapContext } from './MapContext';
const { Tmapv2 } = window;
const TMap2 = ({ setMapData, setResultData }) => {
  const { findRoad } = useContext(MapContext);
  const [map, setMap] = useState(null);
  const [result, setResult] = useState([]);
  const [roadArray, setRoadArray] = useState([]);

  useEffect(() => {
    if (findRoad && findRoad.lat && findRoad.lng) {
      setRoadArray((prevRoadArray) => [...prevRoadArray, findRoad]);
    }
  }, [findRoad]);

  useEffect(() => {
    if (roadArray.length >= 2 && !map) {
      const tmap = new Tmapv2.Map('map_div2', {
        center: new Tmapv2.LatLng(37.5652045, 126.98702028),
        width: '1728px',
        height: '600px',
        zoom: 17,
        zoomControl: true,
        scrollwheel: true,
      });
      setMap(tmap);
      setMapData(tmap);
    }
  }, [roadArray, map, setMapData]);

  useEffect(() => {
    if (map && roadArray.length >= 2) {
      const startCoord = roadArray[0];
      const endCoord = roadArray[1];

      // 시작 마커
      new Tmapv2.Marker({
        position: new Tmapv2.LatLng(startCoord.lat, startCoord.lng),
        icon: process.env.PUBLIC_URL + '/images/pin_r_m_s.png',
        iconSize: new Tmapv2.Size(24, 38),
        map: map,
      });

      // 도착 마커
      new Tmapv2.Marker({
        position: new Tmapv2.LatLng(endCoord.lat, endCoord.lng),
        icon: process.env.PUBLIC_URL + '/images/pin_r_m_e.png',
        iconSize: new Tmapv2.Size(24, 38),
        map: map,
      });

      // 경로탐색 API 요청
      const headers = { appKey: '키 입력' };

      $.ajax({
        method: 'POST',
        headers: headers,
        url: 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
        async: false,
        data: {
          startX: startCoord.lng.toString(),
          startY: startCoord.lat.toString(),
          endX: endCoord.lng.toString(),
          endY: endCoord.lat.toString(),
          reqCoordType: 'WGS84GEO',
          resCoordType: 'EPSG3857',
          startName: '출발지',
          endName: '도착지',
        },
        success: function (response) {
          const resultData = response.features;

          // 경로 거리 및 시간 계산
          const tDistance = `${(
            resultData[0].properties.totalDistance / 1000
          ).toFixed(1)} km`;
          const tTime = ` ${(resultData[0].properties.totalTime / 60).toFixed(
            0
          )} 분`;
          console.log(resultData);
          // 경로 안내
          let tDescription = '';
          for (let i = 0; i < resultData.length; i++) {
            const item = resultData[i];
            const description = item.properties.description;
            // 한글이 포함된 문자열만 확인하는 정규표현식
            if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(description)) {
              if (i === resultData.length - 1) {
                // 마지막 배열 요소인 경우
                tDescription += description; // "\n" 추가하지 않음
              } else {
                tDescription += description + '\n'; // 그 외의 경우 "\n" 추가
              }
            }
          }
          // 결과 데이터를 배열로 설정
          setResult((prevResults) => [
            ...prevResults,
            { distance: tDistance, time: tTime, description: tDescription },
          ]);
          setResultData((prevResults) => [
            ...prevResults,
            { distance: tDistance, time: tTime, description: tDescription },
          ]);

          // 이전에 그려진 라인 초기화
          const drawInfoArr = [];
          const resultdrawArr = [];

          for (const item of resultData) {
            const geometry = item.geometry;
            const properties = item.properties;

            if (geometry.type === 'LineString') {
              for (const coordinate of geometry.coordinates) {
                const latlng = new Tmapv2.Point(coordinate[0], coordinate[1]);
                const convertPoint =
                  new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                const convertChange = new Tmapv2.LatLng(
                  convertPoint._lat,
                  convertPoint._lng
                );
                drawInfoArr.push(convertChange);
              }
            } else {
              let markerImg = '';
              let size;

              if (properties.pointType === 'S') {
                markerImg = '/upload/tmap/marker/pin_r_m_s.png';
                size = new Tmapv2.Size(24, 38);
              } else if (properties.pointType === 'E') {
                markerImg = '/upload/tmap/marker/pin_r_m_e.png';
                size = new Tmapv2.Size(24, 38);
              } else {
                markerImg = 'http://topopen.tmap.co.kr/imgs/point.png';
                size = new Tmapv2.Size(8, 8);
              }

              const latlon = new Tmapv2.Point(
                geometry.coordinates[0],
                geometry.coordinates[1]
              );
              const convertPoint =
                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

              new Tmapv2.Marker({
                position: new Tmapv2.LatLng(
                  convertPoint._lat,
                  convertPoint._lng
                ),
                icon: markerImg,
                iconSize: size,
                map: map,
              });
            }
          }

          // 경로 그리기
          const polyline = new Tmapv2.Polyline({
            path: drawInfoArr,
            strokeColor: '#DD0000',
            strokeWeight: 6,
            map: map,
          });
          resultdrawArr.push(polyline);
        },
        error: function (request, status, error) {
          console.log(
            'code:' +
              request.status +
              '\n' +
              'message:' +
              request.responseText +
              '\n' +
              'error:' +
              error
          );
        },
      });
    }
  }, [map, findRoad, roadArray]);

  return null;
};

export default TMap2;
