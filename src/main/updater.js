const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const config = require('../config');

autoUpdater.logger = log;

module.exports.listenForUpdate = function (window) {
  autoUpdater.setFeedURL(config.updater.url);

  autoUpdater.on('error', function (error) {
    window.webContents.send('message', '检查更新出错');
  });

  autoUpdater.on('checking-for-update', function () {
    window.webContents.send('message', '正在检查更新 ...');
  });

  autoUpdater.on('update-available', function (info) {
    window.webContents.send('message', '检测到新版本，正在下载...');
  });

  autoUpdater.on('update-not-available', function (info) {
    window.webContents.send('message', '当前是最新版本，不需要更新.');
  });

  autoUpdater.on('download-progress', function (progressObj) {
    window.webContents.send('downloadProgress', progressObj)
  });

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
    window.webContents.send('isUpdateNow');
  });

  ipcMain.on("checkForUpdate", () => {
    //执行自动更新检查
    autoUpdater.checkForUpdates();
  });

  ipcMain.on('updateNow', (e, arg) => {
    log.info("开始更新");
    autoUpdater.quitAndInstall();
  });
};
