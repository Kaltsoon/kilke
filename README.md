# Kilke

## Setup

- Define value for environment variable `REACT_APP_API_URL` in `packages/client/.env` file. You can use the default environment variable values, which are:

```
REACT_APP_API_URL=http://localhost:5000
```

- Install PostgreSQL, if not already installed:

```
sudo apt-get install postgresql postgresql-client
```

Then open the `psql` shell:

```
sudo -u postgres psql
```

In the `psql` shell, run `create database kilke;` to create database and then `\password postgres` to set the password (memoize this password for the configuration).

- Add database configuration (username, password, database) to the `knexfile.js` file

- Run the setup script:

```
./setup.sh
```

- Add the configuration to the `config.json` file

- Start everything:

```
yarn pm2 start
```

## Configuration file

`config.json` file format:

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
