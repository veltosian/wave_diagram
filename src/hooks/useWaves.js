import { useState, useEffect } from "react";
import WaveLogicTypes from "../types/WaveLogicTypes";
import { v4 as uuidv4 } from "uuid";

const useWaves = () => {
  const [waves, setWaves] = useState([
    {
      id: uuidv4(),
      name: "wave2",
      period: 1,
      type: WaveLogicTypes.Clock,
      sequence: ["0", "0", "0", "0", "0", "0", "0", "0", "1", "0"],
    },
    {
      id: uuidv4(),
      name: "wave1",
      period: 1,
      type: WaveLogicTypes.Clock,
      sequence: [1, 2, 2, 4, 5, 6, 7, 8, 9, 10],
    },
  ]); // zy DEBUG Data. REMOVE
  const [waveCanvasConfig, setWaveCanvasConfig] = useState({
    zoom: 10,
    waveHeight: 70,
  });

  const [selectedWaveId, setSelectedWaveId] = useState(null);

  useEffect(() => {
    if (waves.length === 0) {
      return undefined;
    }
    // Find zoom level for first wave
    const zoom = waves[0].period * 20;
    setWaveCanvasConfig((prevState) => {
      return {
        ...prevState,
        zoom: zoom,
      };
    });
  }, [waves]);

  const waveSelectHandler = (id) => {
    setSelectedWaveId(id);
  };

  const handleWaveDeselect = () => {
    setSelectedWaveId(null);
  };

  const updateWaveValue = (wave, sequenceIndex, newValue) => {
    setWaves((prevWaves) => {
      return prevWaves.map((prevWave) => {
        if (prevWave.id === wave.id) {
          const newWave = { ...prevWave, sequence: [...prevWave.sequence] };
          newWave.sequence[sequenceIndex] = newValue;
          return newWave;
        } else {
          return prevWave;
        }
      });
    });
  };

  const handleSinglebitToggle = (id, sequenceIndex) => {
    const wave = getWaveFromName(id);
    const newValue = toggleSingleBit(wave.sequence[sequenceIndex]);
    updateWaveValue(wave, sequenceIndex, newValue);
  };

  const toggleSingleBit = (val) => {
    switch (val) {
      case "0":
        return "1";
      case "1":
        return "0";
      default:
        console.error(
          `Tried to toggle single bit value but value was neither "0" or "1". Instead it was ${val}`
        );
        return "N/A";
    }
  };

  const handleMultibitValueUpdate = (id, sequenceIndex, newValue) => {
    const wave = getWaveFromName(id);
    updateWaveValue(wave, sequenceIndex, newValue);
  };

  const handleWaveAdd = (newWave) => {
    setWaves((prevWaves) => {
      return [newWave, ...prevWaves];
    });
  };

  const handleWaveEdit = (updatedWave) => {
    setWaves((prevWaves) => {
      const oldWaveIndex = prevWaves.findIndex(
        (wave) => wave.id === updatedWave.id
      );
      if (oldWaveIndex > -1) {
        // Edit old wave
        const tempWaves = [...prevWaves];
        tempWaves.splice(oldWaveIndex, 1, updatedWave);
        return [...tempWaves];
      }
      console.error(`Could not find wave with id: ${updatedWave.id}`);
      return [...prevWaves];
    });
  };

  const handleWaveDelete = (id) => {
    setWaves((prevWaves) => {
      return prevWaves.filter((wave) => wave.id !== id);
    });
  };

  const getWaveFromName = (id) => {
    const wave = waves.find((wave) => wave.id === id);

    if (!wave) {
      console.error(`Error: Could not find wave with name ${id}`);
      return;
    }

    return wave;
  };

  return {
    waves,
    setWaves,
    waveCanvasConfig,
    setWaveCanvasConfig,
    selectedWaveId,
    handleWaveDeselect,
    handleWaveAdd,
    handleWaveEdit,
    handleWaveDelete,
    waveSelectHandler,
    handleSinglebitToggle,
    handleMultibitValueUpdate,
  };
};

export default useWaves;
