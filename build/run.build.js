const { spawn } = require('child_process');
const path = require('path');

// 生产环境
const webpackConfFile = './webpack/build.conf.js';
process.env.NODE_ENV = require(webpackConfFile).optimization.nodeEnv;

function consoleLog(data) {
  console.log(data.toString('utf8').trim());
}

function runWebpackBuilder () {
  builder = spawn('webpack', ['--config', path.join(__dirname, webpackConfFile)]);
  builder.stdout.on('data', data => consoleLog(data));
  builder.stderr.on('data', data => consoleLog(data));
  builder.on('close', () => {
    consoleLog('webpack build successfully!\n\n');
    consoleLog('electron-builder build start.');
    runElectronBuilder();
  });
}

function runElectronBuilder () {
  builder = spawn('electron-builder', ['build']);
  builder.stdout.on('data', data => consoleLog(data));
  builder.stderr.on('data', data => consoleLog(data));
  builder.on('close', () => consoleLog('electron-builder build successfully!'));
}

runWebpackBuilder();
