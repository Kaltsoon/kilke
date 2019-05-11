const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env")
});

const createServer = require("./server");

const { APP_NAME: appName, PORT: port } = process.env;

createServer({
  port,
  appName
});
