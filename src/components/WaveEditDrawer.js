import React from "react";
import Drawer from "./UI/Drawer";
import WaveInput from "./WaveInput";

const WaveEditDrawer = (props) => {
  const { wave } = props;

  return (
    <Drawer>
      <WaveInput
        variant="edit"
        initialWave={wave}
        onEditWave={props.onWaveEdit}
      />
    </Drawer>
  );
};

export default WaveEditDrawer;
