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
    title
    subtitle
    unitFullName
    unitShortName
    type
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
