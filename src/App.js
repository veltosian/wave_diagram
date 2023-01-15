import "./App.css";
import WaveInput from "./components/WaveInput";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import { useState } from "react";
import WaveDisplayArea from "./components/WaveDisplayArea";
import useWaves from "./hooks/useWaves";
import { Wave } from "./utilities/Wave";

function App() {
  const [addingNewWave, setAddingNewWave] = useState(false);
  const {
    waves,
    selectedWaveId,
    handleSinglebitToggle,
    handleMultibitValueUpdate,
    handleWaveDeselect,
    waveCanvasConfig,
    handleWaveAdd,
    handleWaveEdit,
    handleWaveDelete,
    waveSelectHandler,
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
              variant={"addNew"}
              onClose={handleCloseNewWaveClick}
              onAddWave={handleWaveAdd}
              waves={waves}
              initialWave={new Wave()}
            />
          </div>
        ) : (
          <Button onClick={handleAddNewWaveClick}>Add New Wave</Button>
        )}
      </Card>
      {waves.length > 0 && (
        <WaveDisplayArea
          waves={waves}
          selectedWaveId={selectedWaveId}
          config={waveCanvasConfig}
          onSelect={waveSelectHandler}
          onToggleWaveValue={handleSinglebitToggle}
          onMultibitValueUpdate={handleMultibitValueUpdate}
          onWaveDelete={handleWaveDelete}
          onWaveEdit={handleWaveEdit}
          onWaveDeselect={handleWaveDeselect}
        />
      )}
    </div>
  );
}

export default App;
