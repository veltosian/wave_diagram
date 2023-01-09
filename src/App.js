import "./App.css";
import WaveInput from "./components/WaveInput";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import { useEffect, useState } from "react";
import WaveDisplayArea from "./components/WaveDisplayArea";

function App() {
  const [addingNewWave, setAddingNewWave] = useState(false);
  const [selectedWaveName, setSelectedWaveName] = useState(null);
  const [waves, setWaves] = useState([
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

  const handleAddNewWaveClick = () => {
    setAddingNewWave(true);
  };

  const handleCloseNewWaveClick = () => {
    setAddingNewWave(false);
  };

  const handleAddWave = (waveData) => {
    const name = waveData.name;
    const type = waveData.type;
    const trimmedSequence = waveData.sequence.replace(/\s/g, "");
    const sequence = trimmedSequence.split(",");
    const period = waveData.period;

    const newWave = { name, type, sequence, period };
    setWaves((prevWaves) => {
      return [newWave, ...prevWaves];
    });
  };

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

  const onWaveClickHandler = (name, action) => {
    const wave = waves.find((wave) => wave.name === name);

    if (!wave) {
      console.error(`Error: Could not find wave with name ${name}`);
      return;
    }

    switch (action.type) {
      case "selectWave":
        setSelectedWaveName(wave.name);
        break;
      case "toggleWaveValue":
        handleToggleWaveValue(wave, action.sequenceIndex);
        break;
      case "changeMultibitValue":
        break;
      default:
        console.error(`Error: Unsupported action type "${action.type}"`);
    }
  };

  const onWaveDeleteHandler = (name) => {
    setWaves((prevWaves) => {
      return prevWaves.filter((wave) => wave.name != name);
    });
  };

  const handleToggleWaveValue = (wave, sequenceIndex) => {
    setWaves((prevWaves) => {
      return prevWaves.map((prevWave) => {
        if (prevWave.name === wave.name) {
          const newWave = { ...prevWave, sequence: [...prevWave.sequence] };
          newWave.sequence[sequenceIndex] = toggleSingleBit(
            newWave.sequence[sequenceIndex]
          );
          return newWave;
        } else {
          return prevWave;
        }
      });
    });
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

  const handleWaveDeselect = () => {
    setSelectedWaveName(null);
  };

  return (
    <div>
      <Card>
        {addingNewWave ? (
          <div>
            <WaveInput
              onClose={handleCloseNewWaveClick}
              onAddWave={handleAddWave}
              waves={waves}
            />
          </div>
        ) : (
          <Button onClick={handleAddNewWaveClick}>Add New Wave</Button>
        )}
      </Card>
      {waves.length > 0 && (
        <WaveDisplayArea
          waves={waves}
          selectedWave={selectedWaveName}
          config={waveCanvasConfig}
          onWaveClick={onWaveClickHandler}
          onWaveDelete={onWaveDeleteHandler}
          onWaveDeselect={handleWaveDeselect}
        />
      )}
    </div>
  );
}

export default App;
