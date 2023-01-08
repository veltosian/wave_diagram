import React, { useState } from "react";
import WaveCanvas from "./WaveCanvas";
import styles from "./SingleWaveDisplay.module.css";
import Icon from "./UI/Icon";
import Drawer from "./UI/Drawer";

const SingleWaveDisplay = (props) => {
  const { wave, config, selected } = props;
  const selectedStyle = selected ? styles.selected : "";

  const handleWaveDelete = () => {
    props.onWaveDelete(wave.name);
  };

  return (
    <React.Fragment>
      <div className={`${styles["wave-container"]} ${selectedStyle}`}>
        <span className={styles.name}>{wave.name}</span>
        <WaveCanvas
          wave={wave}
          config={config}
          onClick={props.onWaveClick}
          selected={selected}
        />
      </div>
      {selected && (
        <Drawer className={styles["action-drawer"]}>
          <Icon
            className={styles.icon}
            variant="delete"
            onClick={handleWaveDelete}
          />
        </Drawer>
      )}
    </React.Fragment>
  );
};

export default SingleWaveDisplay;
