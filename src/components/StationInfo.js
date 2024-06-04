import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStreetView } from '@fortawesome/free-solid-svg-icons';
import '../css/StationInfo.scss';

const StationInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [find, setFind] = useState('');
  const [subclick, setSubclick] = useState(0);

  const onChange = useCallback((e) => {
    setSubclick(0);
    setFind(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      //setFind("");
      e.preventDefault();
      setSubclick(1);
    },
    [find]
  );
  const fetchData = async () => {
    try {
      setError(null);
      setData(null);
      setLoading(true);

      const response = await axios.get(
        `https://openapi.gg.go.kr/TBGGSTATNELVM?KEY=ec022a05fa564e738372a828bcdd4d57&Type=json&pSize=1000`
      );
      setData(response.data.TBGGSTATNELVM[1].row);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return null;
  console.log({ find });
  const filteredArr = data.filter(
    (station) =>
      subclick > 0 && find != '' && station.STATN_NM.indexOf(find) != -1
  );
  const cnt = filteredArr.length;
  console.log('건수' + cnt);
  return (
    <div className="StationInfo">
      <h1>역사내 승강기 현황</h1>
      <form className="station-form" onSubmit={onSubmit}>
        <input
          placeholder="원하는 역을 검색하세요"
          value={find}
          onChange={onChange}
          className="station-input"
        />
        <button type="submit" className="station-btn">
          검색
        </button>
      </form>
      <div className="station-result">
        <h2>검색결과 : </h2>
        <p>{cnt}건</p>
      </div>

      <ul>
        <li>
          <span className="station-result-title">위치</span>
          <FontAwesomeIcon icon={faLocationDot} />
        </li>
        <div className="station-name">
          {filteredArr.length === 0 ? (
            <p>검색 결과가 없습니다</p>
          ) : (
            filteredArr
              .map((station) => (
                <li>
                  <FontAwesomeIcon
                    icon={faStreetView}
                    className="station-name-icon"
                  />
                  {station?.LOC}
                </li>
              ))
              .reverse()
          )}
        </div>
      </ul>
    </div>
  );
};

export default StationInfo;
