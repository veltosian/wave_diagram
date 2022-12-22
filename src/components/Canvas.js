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
    const ctx = canvas.getContext("2d");
    const waveDrawing = new WaveDrawing(ctx);

    const waves = [
      {
        name: "Single-bit Wave",
        sequence: [0, 1, 0, 0, 1, 1],
        type: WaveDrawTypes.SingleBit,
      },
      {
        name: "Multi-bit Wave",
        sequence: [23, 42, 23, 23],
        type: WaveDrawTypes.MultiBit,
      },
    ];
    waveDrawing.draw(waves);
  }, []);
  return <canvas style={{ margin: "20px" }} ref={canvasRef} {...props} />;
};

export default Canvas;
