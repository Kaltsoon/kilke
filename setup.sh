#!/bin/bash

CURRENT_PATH=$(pwd)

if ! [ -x "$(command -v nvm)" ]; then
  echo 'node not installed, installing...'
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

  . ~/.nvm/nvm.sh

  nvm install 11.0.0
  nvm alias default 11.0.0
fi

if ! [ -x "$(command -v yarn)" ]; then
  echo 'yarn not installed, installing...'
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt-get update && sudo apt-get install --no-install-recommends yarn
fi

touch db.sqlite

bash ./build.sh
