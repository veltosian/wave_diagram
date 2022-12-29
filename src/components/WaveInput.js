import React, { useReducer, useState, useEffect } from "react";
import Icon from "./UI/Icon";
import styles from "./WaveInput.module.css";
import WaveLogicTypes from "../types/WaveLogicTypes";

function waveStateReducer(state, action) {
  switch (action.type) {
    case "updateName":
      return {
        ...state,
        name: action.value,
      };
    case "updateSequence":
      return {
        ...state,
        sequence: action.value,
      };
    default:
      console.error(`Invalid reducer action type`);
  }
}

const WaveInput = (props) => {
  const [waveState, waveStateDispatch] = useReducer(waveStateReducer, {
    name: "",
    sequence: "",
    type: "clock",
  });

  const [validSequenceFormat, setValidSequenceFormat] = useState(true);

  const handleNameChange = (e) => {
    waveStateDispatch({ type: "updateName", value: e.target.value });
  };

  const handleSequenceChange = (e) => {
    waveStateDispatch({ type: "updateSequence", value: e.target.value });
  };

  useEffect(() => {
    const checkWaveSequence = setTimeout(() => {
      if (
        !checkValidSequenceFormat(waveState.sequence) &&
        waveState.sequence.trim().length !== 0
      ) {
        setValidSequenceFormat(false);
      } else {
        setValidSequenceFormat(true);
      }
    }, 500);

    return () => {
      clearTimeout(checkWaveSequence);
    };
  }, [waveState.sequence]);

  const handleTypeChange = (e) => {
    waveStateDispatch({ type: "updateSequence", value: e.target.value });
  };

  const checkValidSequenceFormat = (sequence) => {
    const validFormat = /^\s*\d(\s*,\s*\d)*\s*$/;
    return validFormat.test(sequence);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Wave form submitted`);
    // zy TODO Handle case with invalid sequence format
    // props.onAddWave(waveState);
  };

  return (
    <div className={styles["new-wave-data-row"]}>
      <form onSubmit={handleFormSubmit}>
        <span>
          <label htmlFor="nameInput">Name </label>
          <input
            type="text"
            id="nameInput"
            onChange={handleNameChange}
            value={waveState.name}
          ></input>
        </span>
        <span>
          <label htmlFor="Values">Values </label>
          <input
            type="text"
            id="Values"
            value={waveState.sequence}
            onChange={handleSequenceChange}
            className={!validSequenceFormat ? styles["invalid-format"] : ""} // zy TODO Style not applying
          ></input>
        </span>
        <span>
          <label htmlFor="wave-type">Type </label>
          <select name="wave-type" id="wave-type">
            <option value={"clock"}>Clock</option>
            <option value={"combinational"}>Combinational</option>
            <option value={"sequential"}>Sequential</option>
          </select>
        </span>
        <button type="submit">
          <Icon variant="add"></Icon>
        </button>
      </form>
      <Icon variant="close" onClick={props.onClose}></Icon>
    </div>
  );
};

export default WaveInput;
