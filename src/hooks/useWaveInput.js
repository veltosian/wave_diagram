import { useState, useReducer } from "react";
import WaveLogicTypes from "../types/WaveLogicTypes";
import { Wave } from "../utilities/Wave";

const waveTypeLabelToWaveLogicType = {
  clock: WaveLogicTypes.Clock,
  sequential: WaveLogicTypes.Sequential,
  combinational: WaveLogicTypes.Combinational,
};

function waveStateReducer(state, action) {
  switch (action.type) {
    case "updateName":
      return {
        ...state,
        name: action.value,
      };
    case "updateSequence":
      const trimmedSequence = action.value.replace(/\s/g, "");
      const sequence = trimmedSequence.split(",");
      return {
        ...state,
        sequence: sequence,
      };
    case "updateType":
      return {
        ...state,
        type: waveTypeLabelToWaveLogicType[action.value],
      };
    case "updatePeriod":
      return {
        ...state,
        period: parseFloat(action.value),
      };
    default:
      console.error(`Invalid reducer action type`);
  }
}

const useWaveInput = (wave) => {
  const [waveState, waveStateDispatch] = useReducer(
    waveStateReducer,
    new Wave()
  );

  const [isUniqueName, setIsUniqueName] = useState(true);

  const getNewWave = () => {
    return waveState;
  };

  return {
    waveState,
    waveStateDispatch,
    isUniqueName,
    setIsUniqueName,
    getNewWave,
  };
};

export default useWaveInput;
