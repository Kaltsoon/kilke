#!/bin/bash

CURRENT_PATH=$(pwd)

cd ./packages/api && yarn build &&
cd $CURRENT_PATH
