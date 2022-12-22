import WaveLogicTypes from "../types/WaveLogicTypes";

class Wave {
  constructor(name, sequence = [], type = WaveLogicTypes.Clock) {
    this.name = name;
    this.sequence = sequence;
    this.dependency = null;
  }

  setSequence(newSequence) {
    if (!newSequence) {
      throw new Error(`Invalid sequence to set to wave: ${newSequence}`);
    }
    this.sequence = newSequence;
  }

  clearSequence() {
    this.sequence = [];
  }

  setDependencyFunction(dependency) {
    if (typeof dependency !== "function") {
      throw new Error(
        `Invalid dependency set to wave. Type of dependency is "${typeof dependency}"`
      );
    }
    this.dependency = dependency;

    this.updateSequence();
  }

  updateSequence() {
    this.sequence = this.sequence.map(this.dependency);
  }
}
