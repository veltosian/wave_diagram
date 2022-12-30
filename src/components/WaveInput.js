import React, { useReducer, useState, useEffect } from "react";
import Icon from "./UI/Icon";
import styles from "./WaveInput.module.css";
import WaveLogicTypes from "../types/WaveLogicTypes";
import FieldAlert from "./UI/FieldAlert";

function waveStateReducer(state, action) {
  switch (action.type) {
    case "updateName":
      return {
        ...state,
        name: action.value.trim(),
      };
    case "updateSequence":
      return {
        ...state,
        sequence: action.value,
      };
    case "updateType":
      return {
        ...state,
        type: action.value,
      };
    case "clear":
      return {
        name: "",
        sequence: "",
        type: "clock",
      };
    default:
      console.error(`Invalid reducer action type`);
  }
}

const WaveInput = (props) => {
  const debounceTime = 400;

  const validWaveTypes = ["clock", "sequential", "combinational"];

  const [validSequenceFormat, setValidSequenceFormat] = useState(true);

  const [isUniqueName, setIsUniqueName] = useState(true);

  const [waveState, waveStateDispatch] = useReducer(waveStateReducer, {
    name: "",
    sequence: "",
    type: "clock",
  });

  const handleNameChange = (e) => {
    const isUnique = checkNameUnique(e.target.value);
    setIsUniqueName(isUnique);
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
    }, debounceTime);

    return () => {
      clearTimeout(checkWaveSequence);
    };
  }, [waveState.sequence]);

  const handleTypeChange = (e) => {
    waveStateDispatch({ type: "updateType", value: e.target.value });
  };

  const checkNameUnique = (name) => {
    const existingNames = props.waves.map((wave) => wave.name);
    return !existingNames.includes(name);
  };

  const checkValidName = (name) => {
    return /^\w+$/.test(name);
  };

  const checkValidSequenceFormat = (sequence) => {
    const validFormat = /^\s*\d(\s*,\s*\d)*\s*$/;
    return validFormat.test(sequence);
  };

  const checkValidType = (type) => {
    return validWaveTypes.includes(type);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Wave form submitted`);
    if (isValidateWaveState()) {
      props.onAddWave(waveState);
      waveStateDispatch({ type: "clear" });
    } else {
      alert(`Invalid wave parameters`); // zy TODO Make this a CSS animation card shake with a red X somewhere and a message appear indicating the incorrect wave parameters
    }
  };

  const isValidateWaveState = () => {
    let isValid = true;
    isValid &= checkValidSequenceFormat(waveState.sequence);
    isValid &= checkValidName(waveState.name);
    isValid &= checkValidType(waveState.type);
    return isValid;
  };

  return (
    <React.Fragment>
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
            <label htmlFor="wave-type">Type </label>
            <select
              name="wave-type"
              id="wave-type"
              onChange={handleTypeChange}
              value={waveState.type}
            >
              {validWaveTypes.map((type) => {
                return (
                  <option value={type} key={type}>
                    {" "}
                    {type[0].toUpperCase()}
                    {type.slice(1)}
                  </option>
                );
              })}
            </select>
          </span>
          <span>
            <label htmlFor="Values">Values </label>
            <input
              type="text"
              id="Values"
              value={waveState.sequence}
              onChange={handleSequenceChange}
              className={!validSequenceFormat ? styles["invalid-format"] : ""}
            ></input>
          </span>
          <button type="submit">
            <Icon variant="add"></Icon>
          </button>
        </form>
        <Icon variant="close" onClick={props.onClose}></Icon>
      </div>
      {!isUniqueName && (
        <FieldAlert variant="warning">Name is not unique</FieldAlert>
      )}
    </React.Fragment>
  );
};

export default WaveInput;
