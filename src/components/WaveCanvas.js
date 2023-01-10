import React, { useState, useEffect, useRef } from "react";
import { WaveDrawing } from "../utilities/WaveDrawing";
import WaveDrawTypes from "../types/WaveDrawTypes";

const WaveCanvas = (props) => {
  const canvasRef = useRef(null);
  const [waveDrawing, setWaveDrawing] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    setWaveDrawing(new WaveDrawing(canvas, props.config));
  }, [props.config]);

  useEffect(() => {
    if (waveDrawing) {
      waveDrawing.draw(props.wave);
    }
  }, [waveDrawing, props.wave]);

  const canvasOnClickHandler = (e) => {
    const boundingRect = canvasRef.current.getBoundingClientRect();
    const canvasX = e.clientX - boundingRect.left;

    const sequenceIndex = waveDrawing.getSequenceIndex(canvasX);

    if (props.selected) {
      waveDrawing.drawingObject.type === WaveDrawTypes.SingleBit &&
        props.onToggleWaveValue(props.wave.name, sequenceIndex);

      waveDrawing.drawingObject.type === WaveDrawTypes.MultiBit &&
        props.onMultibitWaveClick({
          sequenceIndex: sequenceIndex,
          mouseCoordinates: {
            x: e.clientX,
            y: e.clientY,
          },
        });
    } else {
      props.onSelect(props.wave.name);
    }
  };

  return (
    <canvas
      className={props.className}
      ref={canvasRef}
      onClick={canvasOnClickHandler}
    >
      WaveCanvas
    </canvas>
  );
};

export default WaveCanvas;
