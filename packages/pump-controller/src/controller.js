import { clamp, get, reverse } from 'lodash';

const isNumber = value => typeof value === 'number';

class PumpController {
  constructor({
    name,
    targetValue,
    logger,
    maxMeasurements = 5,
    errorMultiplier = 1,
    differentialMultiplier = 1,
    maxRpm = 100,
    minRpm = 5,
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
    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
    this.differentialMultiplier = differentialMultiplier;
  }

  addState({ rpm, value }) {
    if (!isNumber(rpm) || !isNumber(value)) {
      return;
    }

    this.measurements.push({ rpm, value });

    if (this.measurements.length > this.maxMeasurements) {
      this.measurements.shift();
    }
  }

  getSafeRpm(rpm) {
    return rpm < this.minRpm ? 0 : clamp(rpm, this.minRpm, this.maxRpm);
  }

  logInfo(message, data = {}) {
    if (this.logger && this.logger.info) {
      this.logger.info(`[${this.name}]: ${message}`, data);
    }
  }

  getLatestState() {
    return this.measurements[this.measurements.length - 1];
  }

  getLatestStateDifference() {
    if (this.measurements.length < 2) {
      return 0;
    }

    const latestState = this.measurements[this.measurements.length - 1];
    const stateBeforeLatestState = this.measurements[
      this.measurements.length - 2
    ];

    return latestState.value - stateBeforeLatestState.value;
  }

  getError(value) {
    if (!value) {
      return 0;
    }

    return this.targetValue - value;
  }

  getRpmValue() {
    const latestState = this.getLatestState();

    if (!latestState) {
      this.logInfo('Current RPM is unknown');

      return 20;
    }

    const [firstValue, secondValue, thirdValue] = reverse(
      this.measurements.map(({ value }) => value),
    );

    const difference = [firstValue, secondValue, thirdValue].find(
      v => !isNumber(v),
    )
      ? 0
      : 0.66 * firstValue - 0.33 * secondValue - 0.33 * thirdValue;

    const error =
      this.targetValue -
      latestState.value -
      this.differentialMultiplier * difference;

    const nextRpm = Math.max(
      0,
      (this.previousRpm || 0) + this.errorMultiplier * error,
    );

    this.logInfo(
      `Adjusting the current RPM, ${latestState.rpm}, by ${nextRpm -
        latestState.rpm} to achieve ${error} difference in current value, ${
        latestState.value
      }`,
      {
        measurements: this.measurements.map(({ value }) => value),
        difference,
        previousRpm: this.previousRpm,
      },
    );

    return nextRpm;
  }

  getRpm() {
    const nextRpm = this.getRpmValue();

    this.previousRpm = nextRpm;

    const safeRpm = this.getSafeRpm(nextRpm);

    return safeRpm;
  }
}

const makeController = context => {
  const { logger, config } = context;

  const pumpConfig = get(config, 'pumps') || {};
  const pumpControllerConfig = get(config, 'pumpController.pumps') || {};
  const controlledPupms = Object.keys(pumpControllerConfig);

  controlledPupms.forEach(pump => {
    if (!isNumber(get(pumpControllerConfig, [pump, 'targetValue']))) {
      throw new Error(`targetValue is missing for pump "${pump}"`);
    }

    if (!isNumber(get(pumpControllerConfig, [pump, 'errorMultiplier']))) {
      throw new Error(`errorMultiplier is missing for pump "${pump}"`);
    }

    if (
      !isNumber(get(pumpControllerConfig, [pump, 'differentialMultiplier']))
    ) {
      throw new Error(`differentialMultiplier is missing for pump "${pump}"`);
    }

    if (!get(pumpControllerConfig, [pump, 'targetSensor'])) {
      throw new Error(`targetSensor is missing for pump "${pump}"`);
    }

    if (!isNumber(get(pumpConfig, [pump, 'minRpm']))) {
      throw new Error(`minRpm is missing for pump "${pump}"`);
    }

    if (!isNumber(get(pumpConfig, [pump, 'maxRpm']))) {
      throw new Error(`maxRpm is missing for pump "${pump}"`);
    }
  });

  const controllers = controlledPupms.map(
    pump =>
      new PumpController({
        name: pump,
        targetValue: get(pumpControllerConfig, [pump, 'targetValue']),
        logger,
        errorMultiplier: get(pumpControllerConfig, [pump, 'errorMultiplier']),
        differentialMultiplier: get(pumpControllerConfig, [
          pump,
          'differentialMultiplier',
        ]),
        minRpm: pumpConfig[pump].minRpm,
        maxRpm: pumpConfig[pump].maxRpm,
      }),
  );

  return ({ measurements: { sensors, pumps }, automaticPumps }) => {
    let rpms = [];

    controllers.forEach(c => {
      c.addState({
        rpm: get(pumps, [c.name, 'value']),
        value: get(sensors, [
          pumpControllerConfig[c.name].targetSensor,
          'value',
        ]),
      });

      if (automaticPumps.includes(c.name)) {
        rpms = [...rpms, { id: c.name, manualRpm: c.getRpm() }];
      }
    });

    return rpms;
  };
};

export default makeController;
