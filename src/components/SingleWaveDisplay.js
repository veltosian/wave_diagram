import React from "react";
import WaveCanvas from "./WaveCanvas";
import styles from "./SingleWaveDisplay.module.css";

const SingleWaveDisplay = (props) => {
  const { wave, config, selected } = props;
  const selectedStyle = selected ? styles.selected : "";
  return (
    <div className={`${styles["wave-container"]} ${selectedStyle}`}>
      <span className={styles.name}>{wave.name}</span>
      <WaveCanvas
        wave={wave}
        config={config}
        onClick={props.onClick}
        selected={selected}
      />
    </div>
  );
};

export default SingleWaveDisplay;
