#!/bin/bash

CURRENT_PATH=$(pwd)

cd ./packages/api && yarn build &&
cd $CURRENT_PATH
cd ./packages/client && yarn build &&
cd $CURRENT_PATH
