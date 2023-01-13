import WaveLogicTypes from "../types/WaveLogicTypes";
import { v4 as uuidv4 } from "uuid";

export class Wave {
  constructor(
    id = uuidv4(),
    name = "",
    period = 1,
    type = WaveLogicTypes.Clock,
    sequence = []
  ) {
    this.id = id;
    this.name = name;
    this.sequence = sequence;
    this.dependency = null;
    this.type = type;
    this.period = period;
  }
}
