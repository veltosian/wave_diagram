import React, { useState } from "react";
import Card from "./UI/Card";
import SingleWaveDisplay from "./SingleWaveDisplay";
import WaveEditDrawer from "./WaveEditDrawer";

const WaveDisplayArea = (props) => {
  const { waves, config, selectedWaveId } = props;

  const handleWaveDeselect = () => {
    props.onWaveDeselect();
  };

  return (
    <Card onClickOutside={handleWaveDeselect}>
      {selectedWaveId && (
        <WaveEditDrawer
          wave={waves.find((wave) => wave.id === selectedWaveId)}
          onWaveEdit={props.onWaveEdit}
        />
      )}
      {waves.map((wave, index) => {
        return (
          <SingleWaveDisplay
            selected={selectedWaveId === wave.id}
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
