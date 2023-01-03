import React from "react";
import WaveCanvas from "./WaveCanvas";

const SingleWaveDisplay = (props) => {
  const { wave, config } = props;
  return (
    <div>
      <span>{wave.name}</span>
      <WaveCanvas wave={wave} config={config} />
    </div>
  );
};

export default SingleWaveDisplay;
