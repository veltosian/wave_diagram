import React, { useEffect, useRef } from "react";
import SingleWaveDisplay from "./SingleWaveDisplay";
import Card from "./UI/Card";

const WaveDisplayArea = (props) => {
  const { waves, config, selectedWave } = props;

  const handleWaveDeselect = () => {
    props.onWaveDeselect();
  };

  return (
    <Card onClickOutside={handleWaveDeselect}>
      {waves.map((wave, index) => {
        return (
          <SingleWaveDisplay
            selected={selectedWave === wave.name}
            key={wave.name}
            wave={wave}
            config={config}
            onWaveClick={props.onWaveClick}
            onWaveDelete={props.onWaveDelete}
          />
        );
      })}
    </Card>
  );
};

export default WaveDisplayArea;
