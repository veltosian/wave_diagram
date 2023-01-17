import React, { useState, useEffect } from "react";
import Icon from "./UI/Icon";
import styles from "./WaveInput.module.css";
import FieldAlert from "./UI/FieldAlert";
import useWaveInput from "../hooks/useWaveInput";

const debounceTime = 400;

const checkValidName = (name) => {
  return /^\w+$/.test(name);
};

const checkValidSequenceFormat = (sequence) => {
  const validFormat = /^\s*\w+(\s*,\s*\w+)*\s*,*$/;
  return validFormat.test(sequence);
};

const WaveInput = (props) => {
  const {
    name: initialName,
    type: initialType,
    period: initialPeriod,
    sequence: initialSequence,
  } = props.initialWave;

  const [waveName, setWaveName] = useState("");
  const [waveType, setWaveType] = useState("clock");
  const [waveSequence, setWaveSequence] = useState("");
  const [wavePeriod, setWavePeriod] = useState("1");
  const [validSequenceFormat, setValidSequenceFormat] = useState(true);

  const {
    waveState,
    waveStateDispatch,
    isUniqueName,
    setIsUniqueName,
    getWaveTypeLabel,
    getNewWave,
    generateNewId,
  } = useWaveInput();

  useEffect(() => {
    waveStateDispatch({ type: "updateName", value: waveName });
    waveStateDispatch({ type: "updateType", value: waveType });
    waveStateDispatch({ type: "updatePeriod", value: wavePeriod });
  }, [waveName, waveType, wavePeriod, waveStateDispatch]);

  useEffect(() => {
    let checkWaveSequence = null;
    if (
      checkValidSequenceFormat(waveSequence) ||
      waveSequence.trim().length === 0
    ) {
      setValidSequenceFormat(true);
      waveStateDispatch({ type: "updateSequence", value: waveSequence });
    } else {
      checkWaveSequence = setTimeout(() => {
        setValidSequenceFormat(false);
      }, debounceTime);
    }

    return () => {
      if (checkWaveSequence) {
        clearTimeout(checkWaveSequence);
      }
    };
  }, [waveSequence, waveStateDispatch]);

  useEffect(() => {
    waveStateDispatch({ type: "updateId", value: props.initialWave.id });
    setWaveName(initialName);
    setWaveType(getWaveTypeLabel(initialType));
    setWavePeriod(initialPeriod);
    setWaveSequence(initialSequence.join(", "));
  }, [
    props.initialWave.id,
    initialName,
    initialType,
    initialPeriod,
    initialSequence,
  ]);

  const validWaveTypes = ["clock", "sequential", "combinational"];

  const handleNameChange = (e) => {
    setWaveName(e.target.value.trim());
  };

  const handleSequenceChange = (e) => {
    setWaveSequence(e.target.value);
  };

  const handleTypeChange = (e) => {
    setWaveType(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setWavePeriod(e.target.value);
  };

  const checkValidType = (type) => {
    return validWaveTypes.includes(type);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { result: isValid, msg } = isValidWaveState();
    if (isValid) {
      const newWave = getNewWave(waveName, waveType, wavePeriod, waveSequence);
      if (props.variant === "addNew") {
        props.onAddWave(newWave);
        generateNewId();
        setWaveName("");
        setWaveSequence("");
      }

      if (props.variant === "edit") {
        props.onEditWave(newWave);
      }
    } else {
      alert(`Invalid wave parameters: ${msg}`);
    }
  };

  const isValidWaveState = () => {
    let isValid = true;
    let msg = "";

    if (!checkValidSequenceFormat(waveSequence)) {
      isValid = false;
      msg += "Invalid values. ";
    }

    if (!checkValidName(waveState.name)) {
      isValid = false;
      msg += "Invalid name. ";
    }

    if (!checkValidType(waveType)) {
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
            type="text"
            id="nameInput"
            onChange={handleNameChange}
            value={waveName}
          ></input>
        </span>
        <span>
          <label htmlFor="wave-type">Type </label>
          <select
            name="wave-type"
            id="wave-type"
            onChange={handleTypeChange}
            value={waveType}
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
            value={wavePeriod}
            step="any"
            onChange={handlePeriodChange}
          />
        </span>
        <span>
          <label htmlFor="Values">Values </label>
          <input
            type="text"
            id="Values"
            value={waveSequence}
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
