#!/bin/bash

CURRENT_PATH=$(pwd)

cd ./packages/api && yarn build &&
cd $CURRENT_PATH
cd ./packages/sensor-io && rm -rf build && mkdir build && gcc sensor.c -o ./build/sensor &&
cd $CURRENT_PATH
