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
    selectedWaveName,
    onWaveClickHandler,
    handleWaveDeselect,
    waveCanvasConfig,
    setWaveCanvasConfig,
    handleAddWave,
    onWaveDeleteHandler,
  } = useWaves();

  const handleAddNewWaveClick = () => {
    setAddingNewWave(true);
  };

  const handleCloseNewWaveClick = () => {
    setAddingNewWave(false);
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
