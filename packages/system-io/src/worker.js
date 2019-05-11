const SCWorker = require('socketcluster/scworker');
const express = require('express');
const healthChecker = require('sc-framework-health-check');

class Worker extends SCWorker {
  run() {
    const app = express();
    const httpServer = this.httpServer;
    const scServer = this.scServer;

    healthChecker.attach(this, app);
    httpServer.on('request', app);

    scServer.on('connection', () => {});
  }
}

new Worker();
