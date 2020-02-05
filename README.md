# Kilke

## Setup

- Install PostgreSQL, if not already installed:

```
sudo apt-get install postgresql postgresql-client
```

Then open the `psql` shell:

```
psql -U postgres
```

In the `psql` shell, run `create database kilke;` to create a database.

- If required, add database configuration (username, password, database) to the `packages/api/.env` file (`POSTGRES_*` variables).

- Install `node` (version `12.2.0` has been tested) and `yarn` package manager.

- Build the packages by running:

```
bash ./build.sh
```

- Start everything:

```
yarn pm2 start
```

- Create a system by calling the API with the following request:

```bash
curl -d '{"name": "System"}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/v1/systems
```

### Package configuration

You can override each packages configuration in the `.env` file within packages folder (e.g. `packages/api/.env`).

## System configuration

System configuration format:

```javascript
{
  sensors: {
    [string]: { // key for the sensor
      title: string,
      subtitle: string,
      decimals: number, // how many decimals are used to display measurements
      reactorTitle: string, // title showed in the reactor view
      unit: {
        unit: string, // unit short name, such as "RPM"
        title: string, // unit long name, such as "Temperature"
      },
      calibration: {
        x1: number,
        x2: number,
        y1: number,
        y2: number,
      },
    },
  },
  pumps: {
    [string]: { // key for the pump
      title: string,
      subtitle: string,
    },
  },
  binarySensors: {
    [string]: {
      title: string,
      subtitle: string,
      reactorTitle: string,
    },
  },
  visualization: {
    tabs: Array<{
      title: string,
      sensors: Array<string>, // array of sensor keys
    }>,
  },
  reactor: {
    pumps: Array<string>, // pump keys
    sensors: Array<string>, // sensor keys
    binarySensors: Array<string>, // binary sensor keys
  }
}
```

## Stop

You can stop all the apps by running:

```
yarn pm2 stop all
```

## Restart

If you have changed the source code, first build all the apps by running:

```
./build.sh
```

Then, you can restart all the apps by running:

```
yarn pm2 restart all
```

## Logs

You can read the logs by running:

```
yarn pm2 logs
```

You can display logs from only certain services by definining their names, for example `yarn pm2 logs sensor-io`.

## Database connection

You can access the database from terminal by running the command:

```
sudo -u postgres psql -d kilke
```
