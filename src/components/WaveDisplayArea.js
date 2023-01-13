import React, { useState } from "react";
import Card from "./UI/Card";
import SingleWaveDisplay from "./SingleWaveDisplay";
import WaveEditDrawer from "./WaveEditDrawer";

const WaveDisplayArea = (props) => {
  const { waves, config, selectedWave } = props;

  const [editDrawerWave, setEditDrawerWave] = useState(null);

  const handleWaveDeselect = () => {
    props.onWaveDeselect();
  };

  const handleEditDrawerOpen = (wave) => {
    setEditDrawerWave(wave);
  };

  return (
    <Card onClickOutside={handleWaveDeselect}>
      {selectedWave && <WaveEditDrawer />}
      {waves.map((wave, index) => {
        return (
          <SingleWaveDisplay
            selected={selectedWave === wave.id}
            key={wave.id}
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
