# Kilke

## Setup

1. Install [Docker](https://www.docker.com/)
2. Run `docker-compose up`
3. Once `db` and `api` services are running, run the migrations by running `docker-compose exec api yarn migrate:latest`
4. _(Optional)_ Create a system by calling the API with the following request:

```bash
curl -d '{"name": "System"}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/v1/systems
```

After the setup is done, the client should be available at <http://localhost:8080/>.

### Package configuration

You can override each package's configuration in the `.env` file within package's directory (e.g. `packages/api/.env`). Note that some of these changes (such as ports) require altering the `Dockerfile`s and `docker-compose.yml` file as well.

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

## Inspecting logs

Run `docker-compose logs <service>` where `<service>` is the target service. E.g. `docker-compose logs system-reader`

## Database connection

Once containers are running after running `docker-compose up`, you can access the database container by running `docker-compose exec db /bin/bash`. Once connected to the database container you can access the database from terminal by running the command:

```
psql -U postgres -d kilke
```
