import "./App.css";
import Canvas from "./components/Canvas";
import WaveInput from "./components/WaveInput";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import { useState } from "react";

function App() {
  const [addingNewWave, setAddingNewWave] = useState(false);

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
            <WaveInput onClose={handleCloseNewWaveClick} />
          </div>
        ) : (
          <Button onClick={handleAddNewWaveClick}>Add New Wave</Button>
        )}
      </Card>
      <Card>
        <Canvas />
      </Card>
    </div>
  );
}

export default App;
