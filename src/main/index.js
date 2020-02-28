const { app, BrowserWindow } = require('electron');
const path = require('path');
const packageJson = require('../../package.json');
const config = require('../config');
const { listenForUpdate } = require('./updater');

let  mainWindow;

function createMainWindow () {
  // 主窗口 - 创建
  const window = new BrowserWindow({
    width: config.env === 'dev' ? 1300 : 980,
    height: 650,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../windows/main/preload.js'),
    },
  });

  // 主窗口 - 渲染
  if (config.env === 'dev') {
    let port = packageJson.build.webpack.devServer.port;
    window.loadURL(`http://localhost:${port}/main.html`);
    window.webContents.openDevTools(); // 调试工具
  } else {
    window.loadFile('dist/webpack/main.html');
  }

  mainWindow = window;
}

app.allowRendererProcessReuse = false;

// 事件 - 应用准备工作完成（完成初始化）
app.on('ready', () => {
  createMainWindow();
  listenForUpdate(mainWindow);
});

// 事件 - 应用的窗口全部被关闭
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

// 事件 - 应用激活
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
});
