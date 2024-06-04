import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { MapContext } from './MapContext';

const URL = "/V2/api/DSSP-IF-10040?serviceKey=NA13UJKT6131B7S9";

const StaticOld = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setOldLocations } = useContext(MapContext);

  const fetchData = useCallback(async () => {
    const numOfRows = 30; // 한 페이지당 데이터 개수
    const totalPages = 30; // 총 페이지 수
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    setLoading(true);
    setError(null);

    try {
      const allData = await Promise.all(
        pages.map(page =>
          axios.get(`${URL}&pageNo=${page}&numOfRows=${numOfRows}`).then(response => response.data.body)
        )
      ).then(responses => responses.flat()); // 모든 페이지의 데이터를 하나의 배열로 합칩니다.

      const filteredData = allData.filter(item => item && item.BRNCH_NM && item.BRNCH_NM.startsWith('경기'));
      setData(filteredData);

      const locations = filteredData.map(item => ({
        lat: item?.LAT,
        lng: item?.LOT,
        title: item?.BRNCH_NM,
        accidentCount: item?.ACDNT_NOCS,
        casualties: item?.CSTS_CNT,
        type: 'old',
      }));
      setOldLocations(locations);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }, [setOldLocations]);

  useEffect(() => {
    fetchData();
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때만 fetchData가 실행되도록 설정

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data) return null;

  return (
    <div className="Static">
      <div>
        {data.map(item => (
          <div key={item?.MLPL_RGN_FID}>
            {/* 데이터 표시 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticOld;
