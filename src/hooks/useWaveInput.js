import { useState, useReducer } from "react";
import WaveLogicTypes from "../types/WaveLogicTypes";
import { Wave } from "../utilities/Wave";
import { v4 as uuidv4 } from "uuid";

const waveTypeLabelToWaveLogicType = {
  clock: WaveLogicTypes.Clock,
  sequential: WaveLogicTypes.Sequential,
  combinational: WaveLogicTypes.Combinational,
};

function waveStateReducer(state, action) {
  switch (action.type) {
    case "newId":
      return {
        ...state,
        id: uuidv4(),
      };
    case "updateName":
      return {
        ...state,
        name: action.value,
      };
    case "updateSequence":
      const trimmedSequence = action.value
        .replace(/\s/g, "")
        .replace(/,*$/, "");
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

  const getWaveTypeLabel = (logicType) => {
    let type = null;
    Object.entries(waveTypeLabelToWaveLogicType).forEach((entry) => {
      if (entry[1] === logicType) {
        type = entry[0];
      }
    });
    return type;
  };

  const generateNewId = () => {
    waveStateDispatch({ type: "newId" });
  };

  return {
    waveState,
    waveStateDispatch,
    isUniqueName,
    setIsUniqueName,
    getWaveTypeLabel,
    getNewWave,
    generateNewId,
  };
};

export default useWaveInput;
