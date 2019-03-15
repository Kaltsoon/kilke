import regression from 'regression';
import { clamp, get } from 'lodash';

const isNumber = value => typeof value === 'number';

const MAX_RPM_DIFF = 50;

const getSafeRpmDiff = (rpm, diff) => {
  if (rpm + diff < 0) {
    return 10 - rpm;
  }

  return clamp(diff, -MAX_RPM_DIFF, MAX_RPM_DIFF);
};

class PumpController {
  constructor({
    name,
    targetValue,
    logger,
    maxMeasurements = 300,
    errorMultiplier = 1,
  }) {
    if (!name) {
      throw new Error('Name is required');
    }

    if (!targetValue) {
      throw new Error('Target value is required');
    }

    this.logger = logger;
    this.targetValue = targetValue;
    this.errorSum = 0;
    this.maxMeasurements = maxMeasurements;
    this.measurements = [];
    this.name = name;
    this.errorMultiplier = errorMultiplier;
  }

  isSameState(stateA, stateB) {
    const [rpmA, valueA] = stateA;
    const [rpmB, valueB] = stateB;

    return Math.abs(rpmA - rpmB) < 0.1 && Math.abs(valueA - valueB) < 0.1;
  }

  addState({ rpm, value }) {
    if (!isNumber(rpm) || !isNumber(value)) {
      return;
    }

    const latestState = this.getLatestState();

    if (
      latestState &&
      this.isSameState([rpm, value], [latestState.rpm, latestState.value])
    ) {
      return;
    }

    this.measurements.push({ rpm, value });

    if (this.measurements.length > this.maxMeasurements) {
      this.measurements.shift();
    }
  }

  getPoints() {
    if (this.measurements.length < 2) {
      return [];
    }

    let points = [];

    for (let i = 0; i < this.measurements.length - 1; i++) {
      const a = this.measurements[i];
      const b = this.measurements[i + 1];

      points.push([b.value - a.value, b.rpm - a.rpm]);
    }

    return points;
  }

  logInfo(message) {
    if (this.logger && this.logger.info) {
      this.logger.info(`[${this.name}]: ${message}`);
    }
  }

  canCalculateModel() {
    return this.measurements.length >= 4;
  }

  getModel() {
    return regression.linear(this.getPoints());
  }

  getLatestState() {
    return this.measurements[this.measurements.length - 1];
  }

  getError(value) {
    if (!value) {
      return 0;
    }

    return value - this.targetValue;
  }

  getRpm() {
    const latestState = this.getLatestState();

    if (!latestState) {
      this.logInfo(`Current RPM is unknown`);

      return 10;
    }

    const error = this.getError(latestState.value);

    const safeRpmDiff = getSafeRpmDiff(
      latestState.rpm,
      error * this.errorMultiplier * -1,
    );

    this.logInfo(
      `Adjusting the current RPM, ${
        latestState.rpm
      }, by ${safeRpmDiff} to achieve ${error} difference in current value, ${
        latestState.value
      }`,
    );

    return latestState.rpm + safeRpmDiff;
  }
}

const makeController = context => {
  const { logger } = context;

  // TODO: set correct error multiplier and target value
  const c0Controller = new PumpController({
    name: 'c0',
    targetValue: 7,
    logger,
    errorMultiplier: 1,
  });

  return ({ measurements: { sensors, pumps }, automaticPumps }) => {
    let rpms = [];

    // TODO: set correct sensor name
    c0Controller.addState({
      rpm: get(pumps, 'c0.value'),
      value: get(sensors, 'ph.value'),
    });

    if (automaticPumps.includes('c0')) {
      rpms = [...rpms, { id: 'c0', manualRpm: c0Controller.getRpm() }];
    }

    return rpms;
  };
};

export default makeController;
