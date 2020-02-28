const { spawn } = require('child_process');
const path = require('path');
const watch = require('node-watch');

// 开发环境
const webpackConfFile = './webpack/dev.conf.js';
process.env.NODE_ENV = require(webpackConfFile).optimization.nodeEnv;

// 监听主进程相关文件
const watchFiles = ['./src/main', './src/windows/main/preload.js'];
const watcher = watch(watchFiles, { recursive: true, delay: 500 }, (e, name) => {
  startElectron();
});

// 子进程 child process
const cp = {
  webpack: {},
  electron: {},
};

function consoleLog(data) {
  console.log(data.toString('utf8').trim());
}

function startWebpack () {
  cp.webpack = spawn('webpack-dev-server', ['--config', path.join(__dirname, webpackConfFile)]);
  cp.webpack.stdout.on('data', (data) => {
    consoleLog(data);
    if (cp.electron.killed !== false) {
      if (data.toString('utf8').includes('Compiled successfully.')) {
        startElectron();
      }
    }
  });
  cp.webpack.stderr.on('data', data => consoleLog(data));
  cp.webpack.on('close', () => consoleLog('｢wds｣: closed.'));
}

function startElectron () {
  if (cp.electron.killed === false) {
    cp.electron.kill();
  }

  cp.electron = spawn('electron', ['.'], {  });
  cp.electron.stdout.on('data', data => consoleLog(data));
  cp.electron.stderr.on('data', data => consoleLog(data));
  cp.electron.on('close', () => consoleLog('｢electron｣: closed.'));
  cp.electron.on('error', () => {
    if (cp.webpack.killed === false) {
      cp.webpack.kill();
    }
  });

  setTimeout(() => {
    console.log('｢electron｣: started successfully.');
  }, 500);
}

startWebpack();
