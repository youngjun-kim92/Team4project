import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MapContext } from './MapContext';

const URL="/V2/api/DSSP-IF-10040?serviceKey=NA13UJKT6131B7S9";
const StaticOld = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setOldLocations } = useContext(MapContext);

  const fetchData = async () => {
    let page = 1;
    const numOfRows = 30; // 한 페이지당 데이터 개수
    let allData = [];
    let totalPages = 30;

    try {
      setError(null);
      setData(null);
      setLoading(true);

      for(let i = page; i <= totalPages; i++) {
        const response = await axios.get(`${URL}&pageNo=${i}&numOfRows=${numOfRows}`);
        allData = allData.concat(response.data.body);
      }
      const filteredData = allData.filter(item => item && item.BRNCH_NM && item.BRNCH_NM.startsWith('경기'));
      setData(filteredData);
      
      
      const locations = filteredData.map(item => ({
        lat: item?.LAT,
        lng: item?.LOT,
        title: item?.BRNCH_NM,
        accidentCount: item?.ACDNT_NOCS,
        type: 'old',
      }));
      setOldLocations(locations);

    } catch(e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []); // 빈 배열을 의존성 배열로 설정하여 한 번만 실행되도록 함

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data) return null;

  console.log(data);

  return (
    <div className="Static">
      {/* <h2>교통약자사고다발지역(노인)</h2> */}
      <div>
        {data.filter(item => item?.BRNCH_NM.startsWith('경기')).map(item => (
          <div key={item?.MLPL_RGN_FID}>
            {/* <p>지점명: {item?.BRNCH_NM}</p>
            <p>중상자수: {item?.SWPR_CNT}</p>
            <p>사망자수: {item?.DCSD_CNT}</p>
            <p>시도시군구명: {item?.CTPV_SGG_NM}</p>
            <p>사상자수: {item?.CSTS_CNT}</p>
            <p>사고건수: {item?.ACDNT_NOCS}</p>
            <p>경상자수: {item?.SIPR_CNT}</p>
            <p>경도: {item?.LOT}</p>
            <p>위도: {item?.LAT}</p>
            <hr/> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticOld;
