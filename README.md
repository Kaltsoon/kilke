# Kilke

## Setup

Run the setup script:

```
sudo ./setup.sh
```

Start everything:

```
yarn pm2 start
```

Done!

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
