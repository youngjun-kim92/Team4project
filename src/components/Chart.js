import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from './MapContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Chart = () => {
  const { staticOld, staticChild } = useContext(MapContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 지역별 마커 개수 집계
    const aggregateMarkerCounts = () => {
      const allLocations = [...staticOld, ...staticChild];
      const locationCounts = {};

      allLocations.forEach(({ title }) => {
        // title에서 두 번째 단어(도시 이름) 추출
        const words = title.split(' ');
        const city = words[1] || "기타"; // 두 번째 단어가 없으면 "기타"로 설정

        if (!locationCounts[city]) {
          locationCounts[city] = 0;
        }
        locationCounts[city]++;
      });

      const formattedData = Object.keys(locationCounts).map(key => ({
        name: key,
        count: locationCounts[key],
      }));

      setChartData(formattedData);
    };

    aggregateMarkerCounts();
  }, [staticOld, staticChild]);

  return (
    <div>
      <BarChart width={1500} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Chart;
