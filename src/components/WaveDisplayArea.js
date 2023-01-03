import React from "react";
import SingleWaveDisplay from "./SingleWaveDisplay";
import Card from "./UI/Card";

const WaveDisplayArea = (props) => {
  const { waves, config } = props;
  return (
    <Card>
      {waves.map((wave) => {
        return <SingleWaveDisplay wave={wave} config={config} />;
      })}
    </Card>
  );
};

export default WaveDisplayArea;
