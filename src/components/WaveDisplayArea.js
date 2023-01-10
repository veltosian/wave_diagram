import React from "react";
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
            onSelect={props.onSelect}
            onToggleWaveValue={props.onToggleWaveValue}
            onMultibitValueUpdate={props.onMultibitValueUpdate}
            onWaveDelete={props.onWaveDelete}
          />
        );
      })}
    </Card>
  );
};

export default WaveDisplayArea;
