import WaveLogicTypes from "../types/WaveLogicTypes";

export class Wave {
  constructor(
    name = "",
    period = 1,
    type = WaveLogicTypes.Clock,
    sequence = []
  ) {
    this.name = name;
    this.sequence = sequence;
    this.dependency = null;
    this.type = type;
    this.period = period;
  }
}
