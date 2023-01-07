import React from "react";
import WaveCanvas from "./WaveCanvas";
import styles from "./SingleWaveDisplay.module.css";
import Icon from "./UI/Icon";

const SingleWaveDisplay = (props) => {
  const { wave, config, selected } = props;
  const selectedStyle = selected ? styles.selected : "";
  return (
    <div className={`${styles["wave-container"]} ${selectedStyle}`}>
      <Icon
        className={styles.icon}
        variant="delete"
        onClick={props.onWaveDelete}
      />
      <span className={styles.name}>{wave.name}</span>
      <WaveCanvas
        wave={wave}
        config={config}
        onClick={props.onWaveClick}
        selected={selected}
      />
    </div>
  );
};

export default SingleWaveDisplay;
