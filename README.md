# Kilke

## Setup

1. Define value for environment variable `REACT_APP_API_URL` in `packages/client/.env` file. You can use the default environment variable values, which are:

```
REACT_APP_API_URL=http://localhost:5000
```

2. Add database configuration to the `knexfile.js` file

3. Run the setup script:

```
./setup.sh
```

4. Add the configuration to the `config.json` file

5. Start everything:

```
yarn pm2 start
```

6. All set!

## Configuration file

`config.json` file format:

```javascript
{
  sensors: {
    [string]: { // key for the sensor
      title: string,
      subtitle: string,
      decimals: number,
      reactorTitle: string,
      unit: {
        title: string,
      },
      calibration: {
        x1: number,
        x2: number,
        y1: number,
        y2: number,
      },
    },
  },
  visualization: {
    tabs: {
      [string]: { // key for the tab
        title: string,
        sensors: string[], // array of sensor keys
      },
    },
    tabOrder: string[] // array of tab keys
  },
  pumps: {
    [string]: { // key for the pump
      title: string,
      maxRpm: number,
      minRpm: number,
      unit: {
        unit: string,
      },
      address: string
    },
  },
  reactor: {}
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
