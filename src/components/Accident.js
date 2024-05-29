// Accident.js
import React from 'react';
import TMap from './TMap';
import StaticOld from './StaticOld';
import StaticChild from './StaticChild';
import MapProvider from './MapContext';
import Chart from './Chart';

const Accident = () => {
  return (
    <div>
      <MapProvider>
        <TMap/> 
        <StaticOld/>
        <StaticChild/>
        <Chart/>
      </MapProvider>
    </div>
  );
};

export default Accident;