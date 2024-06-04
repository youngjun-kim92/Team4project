import React, { useState, useRef } from 'react';
import TMap2 from './TMap2';
import TMap3 from './TMap3';
import '../css/Road.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import StationInfo from '../components/StationInfo';

const Road = () => {
  const [addresses, setAddresses] = useState({
    startAddress: '',
    endAddress: '',
  });

  const [mapData, setMapData] = useState(null);
  const [resultData, setResultData] = useState([]);

  const mapRef = useRef(null);

  const refreshPage = () => window.location.reload(false);

  return (
    <div className="route">
      <TMap2 setMapData={setMapData} setResultData={setResultData} />
      <TMap3 setAddresses={setAddresses} mapRef={mapRef} />
      <div className="route-title">
        <h2>경로 안내</h2>
        <p>출발지와 도착지를 지도에 표시하세요</p>
      </div>
      <div className="route-map">
        <div id="map_wrap2" className="map_wrap2">
          <div id="map_div2"></div>
        </div>
        {/* <div className="map_act_btn_wrap clear_box"></div> */}
        <div id="map_wrap3" className="map_wrap3">
          <div id="map_div3" ref={mapRef}></div>
        </div>
        <button onClick={refreshPage} className="map-button">
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
        <div className="route-point-wrapper">
          <div className="route-point">
            <div className="route-point-start">
              <span>출발지 : </span>
              <span>{addresses.startAddress}</span>
            </div>
            <div className="route-point-end">
              <span>도착지 : </span>
              <span>{addresses.endAddress}</span>
            </div>
            {resultData.map((item, index) => (
              <div key={index} className="route-find">
                <div className="route-find-distance">
                  <span>총 거리 : </span>
                  <p>{item.distance}</p>
                </div>
                <div className="route-find-time">
                  <span>총 소요시간 : </span>
                  <p>{item.time}</p>
                </div>
                <div className="route-find-title">
                  <h3>경로 안내</h3>
                </div>
                <ul>
                  {item.description.split('\n').map((line, i) => (
                    <li key={i}>
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="route-icon"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <StationInfo />
        </div>
      </div>
    </div>
  );
};

export default Road;
