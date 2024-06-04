// Accident.js
import React from 'react';
import TMap from './TMap';
import StaticOld from './StaticOld';
import StaticChild from './StaticChild';
import Chart from './Chart';
import '../css/Accident.scss';

const Accident = () => {
  return (
    <div className="accBox">
      <TMap />
      <StaticOld />
      <StaticChild />
      <Chart />
    </div>
  );
};

export default Accident;
