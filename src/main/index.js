/**
 * app模块控制整个应用程序的生命周期
 * BrowseWindow
 * ipcMain模块可以使主进程和渲染进程之间进行异步通信
 */
import { app, BrowserWindow, ipcMain, webContents } from 'electron'
import os from 'os'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static')
}

let mainWindow
let contents
let isMac
if (os.platform() === 'darwin') {
  isMac = true
}else {
  isMac = false
}
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {

  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 800,
    backgroundColor: '#373D41',
    frame: isMac ? true : false,
    titleBarStyle: isMac ? 'hidden' : 'show'
  })

  

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  BrowserWindow.win = mainWindow


}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})



/**
 * 主进程---渲染进程 通信
 */



/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
