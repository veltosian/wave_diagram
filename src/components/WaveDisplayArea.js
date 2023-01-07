import React, { useEffect, useRef } from "react";
import SingleWaveDisplay from "./SingleWaveDisplay";
import Card from "./UI/Card";

const WaveDisplayArea = (props) => {
  const { waves, config, selectedWave } = props;

  const handleWaveDeselect = () => {
    props.onWaveDeselect();
  };

  const waveOnClickHandlers = waves.map((wave) => {
    return (action) => {
      props.onWaveClick(wave.name, action);
    };
  });

  const waveOnDeleteHandlers = waves.map((wave) => {
    return () => {
      console.log(`Deleting wave ${wave.name}`);
      props.onWaveDelete(wave.name);
    };
  });

  return (
    <Card onClickOutside={handleWaveDeselect}>
      {waves.map((wave, index) => {
        return (
          <SingleWaveDisplay
            selected={selectedWave === wave.name}
            key={wave.name}
            wave={wave}
            config={config}
            onWaveClick={waveOnClickHandlers[index]}
            onWaveDelete={waveOnDeleteHandlers[index]}
          />
        );
      })}
    </Card>
  );
};

export default WaveDisplayArea;
