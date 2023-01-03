import React from "react";
import WaveCanvas from "./WaveCanvas";
import styles from "./SingleWaveDisplay.module.css";

const SingleWaveDisplay = (props) => {
  const { wave, config } = props;
  return (
    <div className={styles["wave-container"]}>
      <span className={styles.name}>{wave.name}</span>
      <WaveCanvas wave={wave} config={config} />
    </div>
  );
};

export default SingleWaveDisplay;
