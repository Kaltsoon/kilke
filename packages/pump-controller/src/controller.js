import { clamp, get, reverse, zipObject } from 'lodash';

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
    this.maxMeasurements = maxMeasurements;
    this.measurements = [];
    this.name = name;
    this.errorMultiplier = errorMultiplier;
    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
    this.differentialMultiplier = differentialMultiplier;
    this.previousRpm = null;
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

  reset() {
    this.previousRpm = null;
    this.measurements = [];
  }

  getPreviousRpm() {
    return this.previousRpm;
  }

  setPreviousRpm(rpm) {
    this.previousRpm = rpm;
  }

  getRpmValue() {
    if (this.getPreviousRpm() === null) {
      this.logInfo('Current RPM is unknown');

      return this.minRpm;
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
      this.targetValue - firstValue - this.differentialMultiplier * difference;

    const nextRpm = Math.max(
      0,
      this.getPreviousRpm() + this.errorMultiplier * error,
    );

    this.logInfo(`Setting RPM to ${nextRpm}`, {
      measurements: [firstValue, secondValue, thirdValue],
      difference,
      previousRpm: this.previousRpm,
    });

    return nextRpm;
  }

  getRpm() {
    const nextRpm = this.getRpmValue();

    this.setPreviousRpm(nextRpm);

    const safeRpm = this.getSafeRpm(nextRpm);

    return safeRpm;
  }
}

const makeController = context => {
  const { logger, system } = context;

  const config = get(system, 'config') || {};
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

  const controllers = zipObject(
    controlledPupms,
    controlledPupms.map(
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
    ),
  );

  return ({ measurements: { sensors, pumps }, automaticPumps }) => {
    let rpms = [];

    for (let pumpType in controllers) {
      const controller = controllers[pumpType];

      if (!automaticPumps.includes(pumpType)) {
        logger.info(
          `Reseting controller for pump ${pumpType}, because its status is no longer automatic`,
        );

        controller.reset();
      } else {
        controller.addState({
          rpm: get(pumps, [pumpType, 'value']),
          value: get(sensors, [controller.targetSensor, 'value']),
        });

        rpms = [
          ...rpms,
          {
            id: pumpType,
            manualRpm: controller.getRpm(),
          },
        ];
      }
    }

    return rpms;
  };
};

export default makeController;
