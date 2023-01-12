import React from "react";
import Drawer from "./UI/Drawer";

const WaveEditDrawer = (props) => {
  const { wave } = props;

  const handleWaveUpdate = () => {
    props.onWaveUpdate(); // zy TODO
  };

  return <Drawer>WaveEdit</Drawer>;
};

export default WaveEditDrawer;
