import "./App.css";
import WaveInput from "./components/WaveInput";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import { useEffect, useState } from "react";
import WaveDisplayArea from "./components/WaveDisplayArea";
import useWaves from "./hooks/useWaves";

function App() {
  const [addingNewWave, setAddingNewWave] = useState(false);
  const {
    waves,
    setWaves,
    selectedWaveName,
    onWaveClickHandler,
    handleWaveDeselect,
    waveCanvasConfig,
    setWaveCanvasConfig,
  } = useWaves();

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

  const onWaveDeleteHandler = (name) => {
    setWaves((prevWaves) => {
      return prevWaves.filter((wave) => wave.name != name);
    });
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
