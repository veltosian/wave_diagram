import { useState, useEffect } from "react";

const useWaves = () => {
  const [waves, setWaves] = useState([
    {
      name: "wave2",
      period: 1,
      type: "clock",
      sequence: ["0", "0", "0", "0", "0", "0", "0", "0", "1", "0"],
    },
    {
      name: "wave1",
      period: 1,
      type: "clock",
      sequence: [1, 2, 2, 4, 5, 6, 7, 8, 9, 10],
    },
  ]); // zy DEBUG Data. REMOVE
  const [waveCanvasConfig, setWaveCanvasConfig] = useState({
    zoom: 10,
    waveHeight: 70,
  });

  const [selectedWaveName, setSelectedWaveName] = useState(null);

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

  const waveSelectHandler = (name) => {
    setSelectedWaveName(name);
  };

  const handleWaveDeselect = () => {
    setSelectedWaveName(null);
  };

  const updateWaveValue = (wave, sequenceIndex, newValue) => {
    setWaves((prevWaves) => {
      return prevWaves.map((prevWave) => {
        if (prevWave.name === wave.name) {
          const newWave = { ...prevWave, sequence: [...prevWave.sequence] };
          newWave.sequence[sequenceIndex] = newValue;
          return newWave;
        } else {
          return prevWave;
        }
      });
    });
  };

  const handleSinglebitToggle = (name, sequenceIndex) => {
    const wave = getWaveFromName(name);
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

  const handleMultibitValueUpdate = (waveName, sequenceIndex, newValue) => {
    const wave = getWaveFromName(waveName);
    updateWaveValue(wave, sequenceIndex, newValue);
  };

  const handleAddWave = (newWave) => {
    setWaves((prevWaves) => {
      return [newWave, ...prevWaves];
    });
  };

  const onWaveDeleteHandler = (name) => {
    setWaves((prevWaves) => {
      return prevWaves.filter((wave) => wave.name !== name);
    });
  };

  const getWaveFromName = (name) => {
    const wave = waves.find((wave) => wave.name === name);

    if (!wave) {
      console.error(`Error: Could not find wave with name ${name}`);
      return;
    }

    return wave;
  };

  return {
    waves,
    setWaves,
    waveCanvasConfig,
    setWaveCanvasConfig,
    selectedWaveName,
    handleWaveDeselect,
    handleAddWave,
    onWaveDeleteHandler,
    waveSelectHandler,
    handleSinglebitToggle,
    handleMultibitValueUpdate,
  };
};

export default useWaves;
