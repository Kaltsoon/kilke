const SocketCluster = require("socketcluster");

const createServer = ({ port, appName = "system-io" }) => {
  if (!port) {
    throw new Error("Port is required");
  }

  return new SocketCluster({
    workers: 1,
    brokers: 1,
    port,
    appName,
    wsEngine: "ws",
    workerController: __dirname + "/worker.js",
    brokerController: __dirname + "/broker.js",
    rebootWorkerOnCrash: true
  });
};

module.exports = createServer;
