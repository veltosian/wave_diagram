import React, { useEffect, useRef } from "react";
import { WaveDrawing } from "../utilities/WaveDrawing";
import WaveDrawTypes from "../types/WaveDrawTypes";
import Wave from "../utilities/Wave";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const waveDrawing = new WaveDrawing(canvas);

    const waves = [
      {
        name: "Single-bit Wave",
        sequence: [0, 1, 0, 0, 1, 1],
        period: 2.5e-9,
      },
      {
        name: "Asynchronous signal",
        sequence: [21, 39, 39, 52],
        period: 3e-9,
      },
      {
        name: "Multi-bit Wave",
        sequence: [23, 42, 23, 23],
        period: 2.5e-9,
      },
    ];
    waveDrawing.draw(waves);
  }, []);
  return <canvas style={{ margin: "20px" }} ref={canvasRef} {...props} />;
};

export default Canvas;
