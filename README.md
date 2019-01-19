# Kilke

## Setup

1. Define value for environment variable `REACT_APP_API_URL` in `packages/client/.env` file. You can use the default environment variable values, which are:

```
REACT_APP_API_URL=http://localhost:5000
```

2. Run the setup script:

```
./setup.sh
```

3. Add the configuration to the `config.json` file

4. Start everything:

```
yarn pm2 start
```

5. All set!

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
