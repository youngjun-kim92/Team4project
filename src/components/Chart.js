import React, { useContext, useState, useMemo } from 'react';
import { MapContext } from './MapContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import '../css/Chart.scss';

const Chart = () => {
  const { staticOld, staticChild, setSelectedBarState } =
    useContext(MapContext);
  const [localSelectedBar, setLocalSelectedBar] = useState(null);

  // 데이터 처리 로직을 useMemo로 최적화
  const chartData = useMemo(() => {
    const allLocations = [...staticOld, ...staticChild];
    const locationCounts = allLocations.reduce((acc, item) => {
      // "시"를 제외하고 도시 이름 추출
      let city = item.title.split(' ')[1] || '기타';
      if (city.endsWith('시')) {
        city = city.slice(0, -1);
      }

      if (!acc[city]) {
        acc[city] = { name: city, count: 0, allData: [] };
      }
      acc[city].count++;
      acc[city].allData.push(item);
      return acc;
    }, {});

    return Object.values(locationCounts).sort((a, b) => b.count - a.count);
  }, [staticOld, staticChild]);

  const handleClick = (data) => {
    console.log('Clicked data:', data); // 클릭된 데이터 확인
    if (data && data.payload) {
      setSelectedBarState(data.payload);
      setLocalSelectedBar(data.payload);
    }
  };

  return (
    <div className="ChartBox">
      <div className="left_chart">
        <h1>교통약자 도시별 정보</h1>
        <p>도시별로 사고다발지역의 통계를 확인할 수 있습니다</p>
      </div>
      <div className="chart-container">
        {/* style추가,yhl */}
        <div className="chart-box">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="count"
                fill="#8884d8"
                barSize={40}
                onClick={handleClick}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="info-box">
          {localSelectedBar ? (
            <>
              <h3>
                도시: {localSelectedBar.name} (사고다발지역 개수:{' '}
                {localSelectedBar.count})
              </h3>
              {/* <p>사고다발지역 개수: {localSelectedBar.count}</p> */}
              {localSelectedBar.allData.map((item, index) => (
                <div key={index} className="chart-text">
                  <p>ㆍ 지역: {item.title}</p>
                  <p>
                    발생횟수: {item.accidentCount}&nbsp;&nbsp;&nbsp;사상자수:{' '}
                    {item.casualties}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p className="text">차트를 클릭하여 도시별 통계를 확인하세요.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
