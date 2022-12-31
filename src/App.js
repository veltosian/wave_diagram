import "./App.css";
import WaveInput from "./components/WaveInput";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import { useEffect, useState } from "react";
import WaveCanvas from "./components/WaveCanvas";

function App() {
  const [addingNewWave, setAddingNewWave] = useState(false);
  const [waves, setWaves] = useState([
    {
      name: "wave1",
      period: 1e-9,
      type: "clock",
      sequence: [1, 2, 2, 4],
    },
  ]); // zy DEBUG Data. REMOVE
  const [waveCanvasConfig, setWaveCanvasConfig] = useState({
    zoom: 25e-9,
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
    // Find zoom level for first wave
    const zoom = waves[0].period * 20;
    setWaveCanvasConfig((prevState) => {
      return {
        ...prevState,
        zoom: zoom,
      };
    });
  }, [waves[0]]);

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
        {waves.map((wave) => {
          return (
            <WaveCanvas key={wave.name} wave={wave} config={waveCanvasConfig} />
          );
        })}
      </Card>
    </div>
  );
}

export default App;
