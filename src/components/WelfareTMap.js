import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

const URL =
  'https://openapi.gg.go.kr/Ggdspsntaxistus?KEY=키 발급 받아주세요&Type=json';

const WelfareTMap = () => {
  const [map, setMap] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const markersRef = useRef([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const mapRef = useRef(null);

  // 마커 추가 함수
  const addMarker = useCallback((map, position, title, info, url) => {
    const marker = new window.Tmapv2.Marker({
      position: position,
      map: map,
      title: title,
    });

    // 마커 클릭 이벤트 추가
    marker.addListener('click', () => {
      setSelectedInfo({ info, url });
    });

    markersRef.current.push(marker);
  }, []);

  // Tmap 로딩
  useEffect(() => {
    if (data && mapRef.current) {
      const newMap = new window.Tmapv2.Map(mapRef.current, {
        center: new window.Tmapv2.LatLng(37.5665, 126.978),
        width: '800px',
        height: '300px',
        zoom: 10,
      });
      setMap(newMap);

      // 마커 추가 함수 실행
      data.forEach((item) => {
        const position = new window.Tmapv2.LatLng(
          item.REFINE_WGS84_LAT,
          item.REFINE_WGS84_LOGT
        );
        const info = `시설명: ${item.INST_NM}, 장소: ${item.REFINE_LOTNO_ADDR}`;
        const url = item.HMPG_URL;
        addMarker(newMap, position, item.INST_NM, info, url);
      });
    }
  }, [data, addMarker]);

  // 데이터 가져오기
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(URL);
      setData(response.data.Ggdspsntaxistus[1].row);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div id="tmap" ref={mapRef} />
      {selectedInfo && (
        <div className="tmapText">
          <p>{selectedInfo.info}</p>
          <a href={selectedInfo.url} target="_blank" rel="noopener noreferrer">
            {selectedInfo.url}
          </a>
        </div>
      )}
    </div>
  );
};

export default WelfareTMap;
