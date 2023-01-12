import React, { useState, useEffect, useReducer } from "react";

// zy TODO Try to remove checkValidSequenceFormat from WaveInput and make it rely on isValidName state value (and make it if I don't have it already)

const debounceTime = 400;

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
    case "updatePeriod":
      return {
        ...state,
        period: action.value,
      };
    case "clear":
      return {
        name: "",
        sequence: "",
        type: state.type,
        period: state.period,
      };
    default:
      console.error(`Invalid reducer action type`);
  }
}

const checkValidSequenceFormat = (sequence) => {
  const validFormat = /^\s*\d+(\s*,\s*\d+)*\s*$/;
  return validFormat.test(sequence);
};

const useWaveInput = (wave) => {
  const [waveState, waveStateDispatch] = useReducer(waveStateReducer, {
    name: "",
    sequence: "",
    type: "clock",
    period: 1,
  });

  const [validSequenceFormat, setValidSequenceFormat] = useState(true);

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

  const [isUniqueName, setIsUniqueName] = useState(true);

  return {
    waveState,
    waveStateDispatch,
    validSequenceFormat,
    isUniqueName,
    setIsUniqueName,
    checkValidSequenceFormat,
  };
};

export default useWaveInput;
