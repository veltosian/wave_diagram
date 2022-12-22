import WaveDrawTypes from "../types/WaveDrawTypes";
import TransitionTypes from "../types/TransitionTypes";

export class WaveDrawing {
  constructor(ctx) {
    this.ctx = ctx;
    this.waveHeight = 100;
    this.transitionWidth = 20;
    this.rowPadding = 10;
    this.nameWidth = 100;
    this.nameOffset = this.nameWidth + 20;
  }

  draw(waves) {
    waves.forEach((wave, index) => {
      this.drawWave(index, wave);
    });
  }

  drawWave(row, wave) {
    switch (wave.type) {
      case WaveDrawTypes.SingleBit:
        this.drawSingleBitWave(row, wave);
        break;
      case WaveDrawTypes.MultiBit:
        this.drawMultiBitWave(row, wave);
        break;
      default:
        console.log(`Error. Unsupported wavetype: ${wave.type}`);
    }
  }

  drawSingleBitWave(row, wave) {
    this.drawWaveName(row, wave.name);
    for (let i = 0; i < wave.sequence.length; i++) {
      if (i > 0) {
        const transitionType = this.getTransitionType(
          wave.sequence[i - 1],
          wave.sequence[i],
          wave.type
        );
        this.drawTransition(wave, transitionType, i, row);
      }
      this.drawValue(wave.sequence[i], wave.width, i, row);
    }
  }

  drawMultiBitWave(row, wave) {
    this.drawWaveName(row, wave.name);
    for (let i = 0; i < wave.sequence.length; i++) {
      if (i > 0) {
        const transitionType = this.getTransitionType(
          wave.sequence[i - 1],
          wave.sequence[i],
          wave.type
        );
        this.drawTransition(wave, transitionType, i, row);
      }
      this.drawValue(0, wave.width, i, row);
      this.drawValue(1, wave.width, i, row);
      this.drawValueText(wave, i, row);
    }
  }

  drawWaveName(row, name) {
    const xOffset = 0;
    const yOffset = this.getRowYOffset(row) - 0.5 * this.waveHeight;
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "bold 16px arial";
    this.ctx.fillText(name, xOffset, yOffset);
  }

  drawValueText(wave, index, row) {
    const textX = this.getSequenceXOffset(index, wave.width) + 0.5 * wave.width;
    const textY = this.getRowYOffset(row) - 0.5 * this.waveHeight; // (row + 0.5) * this.waveHeight + this.rowPadding * row;
    this.ctx.font = "12px arial";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`${wave.sequence[index]}`, textX, textY);
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
    if (beforeValue === 1 && currentValue === 1) {
      return TransitionTypes.SingleBitHigh;
    }

    if (beforeValue === 0 && currentValue === 0) {
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
    return index * width + this.nameOffset;
  }

  getRowYOffset(row) {
    return row * (this.waveHeight + this.rowPadding) + this.waveHeight;
  }

  getTransitionWidth(width) {
    return width * 0.15;
  }

  drawValue(value, width, index, row) {
    const xOffset = this.getSequenceXOffset(index, width);
    const yOffset = this.getRowYOffset(row);
    const transitionWidth = this.getTransitionWidth(width);

    if (![0, 1].includes(value)) {
      console.log(`Error: Value is neither 0 or 1`); // zy todo expand to include Z and X
      return;
    }

    const startingTransitionOffset = index === 0 ? 0 : transitionWidth / 2;
    const endingTransitionOffset = transitionWidth / 2;

    const height = value ? -this.waveHeight : 0;

    this.drawNewLine(
      xOffset + startingTransitionOffset,
      yOffset + height,
      xOffset + width - endingTransitionOffset,
      yOffset + height
    );
  }

  drawTransition(wave, transitionType, index, row) {
    const xOffset = this.getSequenceXOffset(index, wave.width);
    const yOffset = this.getRowYOffset(row);
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
      yOffset - this.waveHeight,
      xOffset + transitionWidth / 2,
      yOffset - this.waveHeight
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
      yOffset - this.waveHeight
    );
  }

  drawFallingTransition(xOffset, yOffset, transitionWidth) {
    this.drawNewLine(
      xOffset - transitionWidth / 2,
      yOffset - this.waveHeight,
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
}
