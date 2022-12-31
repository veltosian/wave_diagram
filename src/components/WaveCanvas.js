import React, { useEffect, useRef } from "react";
import { WaveDrawing } from "../utilities/WaveDrawing";

const WaveCanvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const waveDrawing = new WaveDrawing(canvas, props.config);
    waveDrawing.draw(props.wave);
  }, [props.wave, props.config]);

  return <canvas ref={canvasRef}>WaveCanvas</canvas>;
  // return <div>HELLO</div>;
};

export default WaveCanvas;
