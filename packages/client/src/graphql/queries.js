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
    status
    mode
  }
`;

const SensorMeasurementBaseFields = gql`
  fragment SensorMeasurementBaseFields on SensorMeasurement {
    id
    value
    rawValue
    type
    createdAt
  }
`;

const PumpMeasurementBaseFields = gql`
  fragment PumpMeasurementBaseFields on PumpMeasurement {
    id
    rpm
    flowRate
    type
  }
`;

const BinarySensorBaseFields = gql`
  fragment BinarySensorBaseFields on BinarySensor {
    id
    systemId
    title
    subtitle
    reactorTitle
    type
  }
`;

const BinarySensorMeasurementBaseFields = gql`
  fragment BinarySensorMeasurementBaseFields on BinarySensorMeasurement {
    id
    value
    type
    createdAt
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
        binarySensors {
          ...BinarySensorBaseFields
        }
      }
    }
  }

  ${SensorBaseFields}
  ${PumpBaseFields}
  ${SystemBaseFields}
  ${BinarySensorBaseFields}
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

export const GET_SENSOR_MEASUREMENTS = gql`
  query getSensorMeasurements(
    $systemId: ID!
    $types: [String]
    $from: DateTime
    $to: DateTime
    $limit: Int
    $offset: Int
  ) {
    sensorMeasurements(
      systemId: $systemId
      types: $types
      from: $from
      to: $to
      limit: $limit
      offset: $offset
    ) {
      ...SensorMeasurementBaseFields
    }
  }

  ${SensorMeasurementBaseFields}
`;

export const GET_PUMP_MEASUREMENTS = gql`
  query getPumpMeasurements(
    $systemId: ID!
    $types: [String]
    $from: DateTime
    $to: DateTime
    $limit: Int
    $offset: Int
  ) {
    pumpMeasurements(
      systemId: $systemId
      types: $types
      from: $from
      to: $to
      limit: $limit
      offset: $offset
    ) {
      ...PumpMeasurementBaseFields
    }
  }

  ${PumpMeasurementBaseFields}
`;

export const GET_BINARY_SENSOR_WITH_LATEST_MEASUREMENT = gql`
  query getBinarySensorWithLatestMeasurement($systemId: ID!, $type: String!) {
    binarySensor(systemId: $systemId, type: $type) {
      ...BinarySensorBaseFields
      measurements(limit: 1) {
        ...BinarySensorMeasurementBaseFields
      }
    }
  }

  ${BinarySensorBaseFields}
  ${BinarySensorMeasurementBaseFields}
`;

export const GET_BINARY_SENSOR_MEASUREMENTS = gql`
  query getBinarySensorMeasurements(
    $systemId: ID!
    $types: [String]
    $from: DateTime
    $to: DateTime
    $limit: Int
    $offset: Int
  ) {
    binarySensorMeasurements(
      systemId: $systemId
      types: $types
      from: $from
      to: $to
      limit: $limit
      offset: $offset
    ) {
      ...BinarySensorMeasurementBaseFields
    }
  }

  ${BinarySensorMeasurementBaseFields}
`;
