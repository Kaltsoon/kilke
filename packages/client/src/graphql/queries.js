import gql from 'graphql-tag';

const SystemBaseFields = gql`
  fragment SystemBaseFields on System {
    id
    hasReactor
    rawConfig
    name
  }
`;

const SensorBaseFields = gql`
  fragment SensorBaseFields on Sensor {
    id
    systemId
    title
    subtitle
    unitFullName
    unitShortName
    reactorTitle
    type
  }
`;

const PumpBaseFields = gql`
  fragment PumpBaseFields on Pump {
    id
    systemId
    title
    subtitle
    unitFullName
    unitShortName
    type
  }
`;

const SensorMeasurementBaseFields = gql`
  fragment SensorMeasurementBaseFields on SensorMeasurement {
    id
    value
  }
`;

const PumpMeasurementBaseFields = gql`
  fragment PumpMeasurementBaseFields on PumpMeasurement {
    id
    rpm
    flowRate
    status
  }
`;

export const GET_SYSTEM = gql`
  query getSystem($id: ID!, $includeReactor: Boolean = false) {
    system(id: $id) {
      ...SystemBaseFields
      sensors {
        ...SensorBaseFields
      }
      systemViews {
        id
        title
        sensors {
          ...SensorBaseFields
        }
      }
      reactor @include(if: $includeReactor) {
        sensors {
          ...SensorBaseFields
        }
        pumps {
          ...PumpBaseFields
        }
      }
    }
  }

  ${SensorBaseFields}
  ${PumpBaseFields}
  ${SystemBaseFields}
`;

export const GET_SYSTEMS = gql`
  query getSystems {
    systems {
      ...SystemBaseFields
    }
  }

  ${SystemBaseFields}
`;

export const GET_SENSOR_WITH_LATEST_MEASUREMENT = gql`
  query getSensorWithLatestMeasurement($systemId: ID!, $type: String!) {
    sensor(systemId: $systemId, type: $type) {
      ...SensorBaseFields
      measurements(limit: 1) {
        ...SensorMeasurementBaseFields
      }
    }
  }

  ${SensorBaseFields}
  ${SensorMeasurementBaseFields}
`;

export const GET_PUMP_WITH_LATEST_MEASUREMENT = gql`
  query getPumpWithLatestMeasurement($systemId: ID!, $type: String!) {
    pump(systemId: $systemId, type: $type) {
      ...PumpBaseFields
      measurements(limit: 1) {
        ...PumpMeasurementBaseFields
      }
    }
  }

  ${PumpBaseFields}
  ${PumpMeasurementBaseFields}
`;
