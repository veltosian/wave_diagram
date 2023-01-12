import React, { useReducer, useState, useEffect } from "react";
import Icon from "./UI/Icon";
import styles from "./WaveInput.module.css";
import FieldAlert from "./UI/FieldAlert";
import useWaveInput from "../hooks/useWaveInput";

const checkValidName = (name) => {
  return /^\w+$/.test(name);
};

const WaveInput = (props) => {
  const {
    waveState,
    waveStateDispatch,
    validSequenceFormat,
    isUniqueName,
    setIsUniqueName,
    checkValidSequenceFormat,
  } = useWaveInput();

  const validWaveTypes = ["clock", "sequential", "combinational"];

  const handleNameChange = (e) => {
    const isUnique = checkNameUnique(e.target.value);
    setIsUniqueName(isUnique);
    waveStateDispatch({ type: "updateName", value: e.target.value });
  };

  const handleSequenceChange = (e) => {
    waveStateDispatch({ type: "updateSequence", value: e.target.value });
  };

  const handleTypeChange = (e) => {
    waveStateDispatch({ type: "updateType", value: e.target.value });
  };

  const handlePeriodChange = (e) => {
    waveStateDispatch({ type: "updatePeriod", value: e.target.value });
  };

  const checkNameUnique = (name) => {
    const existingNames = props.waves.map((wave) => wave.name);
    return !existingNames.includes(name);
  };

  const checkValidType = (type) => {
    return validWaveTypes.includes(type);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { result: isValid, msg } = isValidateWaveState();
    if (isValid) {
      props.onAddWave(waveState);
      waveStateDispatch({ type: "clear" });
    } else {
      alert(`Invalid wave parameters: ${msg}`);
    }
  };

  const isValidateWaveState = () => {
    let isValid = true;
    let msg = "";

    if (!checkValidSequenceFormat(waveState.sequence)) {
      isValid = false;
      msg += "Invalid values. ";
    }

    if (!checkValidName(waveState.name)) {
      isValid = false;
      msg += "Invalid name. ";
    }

    if (!checkValidType(waveState.type)) {
      isValid = false;
      msg += "Invalid type. ";
    }

    return { result: isValid, msg: msg };
  };

  return (
    <div className={styles["new-wave-data-row"]}>
      <form onSubmit={handleFormSubmit}>
        <span>
          <label htmlFor="nameInput">Name </label>
          <input
            className={isUniqueName ? "" : styles["invalid-input"]}
            type="text"
            id="nameInput"
            onChange={handleNameChange}
            value={waveState.name}
          ></input>
          {!isUniqueName && (
            <FieldAlert variant="error"> Name is not unique</FieldAlert>
          )}
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
          <label htmlFor="wave-period">Period (sec) </label>
          <input
            type="number"
            id="wave-period"
            value={waveState.period}
            onChange={handlePeriodChange}
          />
        </span>
        <span>
          <label htmlFor="Values">Values </label>
          <input
            type="text"
            id="Values"
            value={waveState.sequence}
            onChange={handleSequenceChange}
            className={!validSequenceFormat ? styles["invalid-input"] : ""}
          />
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
