#!/bin/bash

CURRENT_PATH=$(pwd)

yarn install

cd ./packages/system-io && yarn install &&
cd $CURRENT_PATH
cd ./packages/system-reader && yarn install &&
cd $CURRENT_PATH
cd ./packages/api && yarn install &&
cd $CURRENT_PATH
cd ./packages/client && yarn install &&
cd $CURRENT_PATH
cd ./packages/pump-controller && yarn install &&
cd $CURRENT_PATH

cd ./packages/api && yarn build && yarn knex migrate:latest &&
cd $CURRENT_PATH
cd ./packages/client && yarn build &&
cd $CURRENT_PATH
