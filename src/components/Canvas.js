import React, { useEffect, useRef } from "react";
import { WaveDrawing } from "../utilities/WaveDrawing";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const waveDrawing = new WaveDrawing(ctx);
    waveDrawing.draw();
  }, []);
  return <canvas style={{ margin: "20px" }} ref={canvasRef} {...props} />;
};

export default Canvas;
