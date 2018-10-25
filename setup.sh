#!/bin/bash

CURRENT_PATH=$(pwd)

yarn install

touch db.sqlite

yarn knex migrate:latest

cd ./packages/sensor-reader && yarn install &&
cd $CURRENT_PATH
cd ./packages/api && yarn install &&
cd $CURRENT_PATH
cd ./packages/client && yarn install &&
cd $CURRENT_PATH

bash ./build.sh
