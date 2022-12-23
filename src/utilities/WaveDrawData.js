import WaveDrawTypes from "../types/WaveDrawTypes";

class WaveDrawData {
  constructor(logicalWave, width) {
    this.name = logicalWave.name;
    this.sequence = logicalWave.sequence;
    this.width = width;

    this.type = this.getType(logicalWave.sequence);
  }

  setWidth(width) {
    this.width = width;
  }

  getType(sequence) {
    if (sequence.every((val) => val === 0 || val === 1)) {
      return WaveDrawTypes.SingleBit;
    }
    return WaveDrawTypes.MultiBit;
  }
}
export default WaveDrawData;
