import WaveDrawTypes from "../types/WaveDrawTypes";
import TransitionTypes from "../types/TransitionTypes";
import WaveDrawData from "./WaveDrawData";

export class WaveDrawing {
  constructor(
    canvas,
    config = {
      zoom: 1,
      numPeriodsDefault: 30,
      waveHeight: 70,
    }
  ) {
    this.canvas = canvas;
    this.canvas.height = config.waveHeight;
    this.canvas.width = 600;
    this.ctx = canvas.getContext("2d");
    this.config = config;
    this.drawingObject = null;
  }

  draw(wave) {
    this.clearCanvas();
    this.setDrawingObject(wave);
    this.drawWave();
  }

  setDrawingObject(wave) {
    if (!wave) {
      return null;
    }

    this.drawingObject = new WaveDrawData(wave);

    const widthFactor = this.config.zoom / wave.period;
    this.drawingObject.setWidth(this.canvas.width / widthFactor);
  }

  drawWave() {
    const wave = this.drawingObject;
    switch (wave.type) {
      case WaveDrawTypes.SingleBit:
        this.drawSingleBitWave(wave);
        break;
      case WaveDrawTypes.MultiBit:
        this.drawMultiBitWave(wave);
        break;
      default:
        console.log(`Error. Unsupported wavetype: ${wave.type}`);
    }
  }

  drawSingleBitWave(wave) {
    for (let i = 0; i < wave.sequence.length; i++) {
      if (i > 0) {
        const transitionType = this.getTransitionType(
          wave.sequence[i - 1],
          wave.sequence[i],
          wave.type
        );
        this.drawTransition(wave, transitionType, i);
      }
      this.drawValue(wave.sequence[i], wave.width, i);
    }
  }

  drawMultiBitWave(wave) {
    for (let i = 0; i < wave.sequence.length; i++) {
      if (i > 0) {
        const transitionType = this.getTransitionType(
          wave.sequence[i - 1],
          wave.sequence[i],
          wave.type
        );
        this.drawTransition(wave, transitionType, i);
      }
      this.drawValue("0", wave.width, i);
      this.drawValue("1", wave.width, i);
      this.drawValueText(wave, i);
    }
  }

  drawValueText(wave, index) {
    const textX = this.getSequenceXOffset(index, wave.width) + 0.5 * wave.width;
    const textY = this.getYOffset() - 0.5 * this.canvas.height; // zy TODO FIXME Make this cleaner
    this.ctx.font = "12px arial";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.fillText(wave.sequence[index], textX, textY);
  }

  getTransitionType(beforeValue, currentValue, waveType) {
    switch (waveType) {
      case WaveDrawTypes.SingleBit:
        return this.getSingleBitTransitionType(beforeValue, currentValue);
      case WaveDrawTypes.MultiBit:
        return this.getMultiBitTransitionType(beforeValue, currentValue);
      default:
        console.log(
          `Error: Could not determine transition type from invalid wave type "${waveType}"`
        );
    }
  }

  getSingleBitTransitionType(beforeValue, currentValue) {
    if (beforeValue === "1" && currentValue === "1") {
      return TransitionTypes.SingleBitHigh;
    }

    if (beforeValue === "0" && currentValue === "0") {
      return TransitionTypes.SingleBitLow;
    }

    if (beforeValue < currentValue) {
      return TransitionTypes.Rising;
    }

    return TransitionTypes.Falling;
  }

  getMultiBitTransitionType(beforeValue, currentValue) {
    if (beforeValue === currentValue) {
      return TransitionTypes.MultiBitNone;
    }
    return TransitionTypes.Multi;
  }

  drawNewLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  getSequenceXOffset(index, width) {
    return index * width;
  }

  getYOffset() {
    return this.canvas.height;
  }

  getTransitionWidth(width) {
    return width * 0.15;
  }

  drawValue(value, width, index) {
    const xOffset = this.getSequenceXOffset(index, width);
    const yOffset = this.getYOffset();
    const transitionWidth = this.getTransitionWidth(width);

    if (!["0", "1"].includes(value)) {
      console.log(`Error: Value is neither 0 or 1`); // zy todo expand to include Z and X
      return;
    }

    const startingTransitionOffset = index === 0 ? 0 : transitionWidth / 2;
    const endingTransitionOffset = transitionWidth / 2;

    const height = value === "1" ? -this.canvas.height : 0;

    this.drawNewLine(
      xOffset + startingTransitionOffset,
      yOffset + height,
      xOffset + width - endingTransitionOffset,
      yOffset + height
    );
  }

  drawTransition(wave, transitionType, index) {
    const xOffset = this.getSequenceXOffset(index, wave.width);
    const yOffset = this.getYOffset();
    const transitionWidth = this.getTransitionWidth(wave.width);

    switch (transitionType) {
      case TransitionTypes.Rising:
        this.drawRisingTransition(xOffset, yOffset, transitionWidth);
        break;
      case TransitionTypes.Falling:
        this.drawFallingTransition(xOffset, yOffset, transitionWidth);
        break;
      case TransitionTypes.SingleBitHigh:
        this.drawSingleBitHighTransition(xOffset, yOffset, transitionWidth);
        break;
      case TransitionTypes.SingleBitLow:
        this.drawSingleBitLowTransition(xOffset, yOffset, transitionWidth);
        break;
      case TransitionTypes.MultiBitNone:
        this.drawMultiBitNoneTransition(xOffset, yOffset, transitionWidth);
        break;
      case TransitionTypes.Multi:
        this.drawMultiBitTransition(xOffset, yOffset, transitionWidth);
        break;
      default:
        console.log(`Error: Invalid transition type.`);
    }
  }

  drawSingleBitHighTransition(xOffset, yOffset, transitionWidth) {
    this.drawNewLine(
      xOffset - transitionWidth / 2,
      yOffset - this.canvas.height,
      xOffset + transitionWidth / 2,
      yOffset - this.canvas.height
    );
  }

  drawSingleBitLowTransition(xOffset, yOffset, transitionWidth) {
    this.drawNewLine(
      xOffset - transitionWidth / 2,
      yOffset,
      xOffset + transitionWidth / 2,
      yOffset
    );
  }

  drawRisingTransition(xOffset, yOffset, transitionWidth) {
    this.drawNewLine(
      xOffset - transitionWidth / 2,
      yOffset,
      xOffset + transitionWidth / 2,
      yOffset - this.canvas.height
    );
  }

  drawFallingTransition(xOffset, yOffset, transitionWidth) {
    this.drawNewLine(
      xOffset - transitionWidth / 2,
      yOffset - this.canvas.height,
      xOffset + transitionWidth / 2,
      yOffset
    );
  }

  drawMultiBitTransition(xOffset, yOffset, transitionWidth) {
    this.drawRisingTransition(xOffset, yOffset, transitionWidth);
    this.drawFallingTransition(xOffset, yOffset, transitionWidth);
  }

  drawMultiBitNoneTransition(xOffset, yOffset, transitionWidth) {
    this.drawSingleBitHighTransition(xOffset, yOffset, transitionWidth);
    this.drawSingleBitLowTransition(xOffset, yOffset, transitionWidth);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getSequenceIndex(xOffset) {
    const width = this.drawingObject.width;
    return Math.floor(xOffset / width);
  }
}
