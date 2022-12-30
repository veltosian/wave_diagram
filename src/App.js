import "./App.css";
import Canvas from "./components/Canvas";
import WaveInput from "./components/WaveInput";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import { useState } from "react";

function App() {
  const [addingNewWave, setAddingNewWave] = useState(false);
  const [waves, setWaves] = useState([]);

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
    const period = 1e-6;

    const newWave = { name, type, sequence, period };
    setWaves((prevWaves) => {
      return [newWave, ...prevWaves];
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
      <Card>
        <Canvas waves={waves} />
      </Card>
    </div>
  );
}

export default App;
