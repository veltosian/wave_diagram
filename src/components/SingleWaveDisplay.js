import React from "react";
import WaveCanvas from "./WaveCanvas";
import styles from "./SingleWaveDisplay.module.css";
import Icon from "./UI/Icon";
import Drawer from "./UI/Drawer";
import MultibitEdit from "./MultibitEdit";
import useMultibitEdit from "../hooks/useMultibitEdit";

const SingleWaveDisplay = (props) => {
  const { wave, config, selected } = props;
  const {
    multibitEditVisible,
    multibitEditCoordinates,
    multibitValueDefault,
    multibitSequenceIndex,
    closeMultibitEdit,
    initiateMultibitEdit,
  } = useMultibitEdit();

  const selectedStyle = selected ? styles.selected : "";

  const handleWaveDelete = () => {
    props.onWaveDelete(wave.name);
  };

  const handleMultibitWaveClick = (action) => {
    initiateMultibitEdit(wave, action);
  };

  return (
    <React.Fragment>
      <div className={`${styles["wave-container"]} ${selectedStyle}`}>
        <span className={styles.name}>{wave.name}</span>
        <WaveCanvas
          wave={wave}
          config={config}
          onSelect={props.onSelect}
          onToggleWaveValue={props.onToggleWaveValue}
          onMultibitWaveClick={handleMultibitWaveClick}
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
      {multibitEditVisible && (
        <MultibitEdit
          onClose={closeMultibitEdit}
          coordinates={multibitEditCoordinates}
          defaultValue={multibitValueDefault}
          waveName={wave.name}
          sequenceIndex={multibitSequenceIndex}
          onUpdate={props.onMultibitValueUpdate}
        />
      )}
    </React.Fragment>
  );
};

export default SingleWaveDisplay;
