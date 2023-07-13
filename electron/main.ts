import { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage, ipcRenderer } from 'electron'
import path from 'node:path'
import url from 'node:url'


process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
const VITE_DEV_SERVER_URL: any = process.env['VITE_DEV_SERVER_URL']
const indexHtml = process.env.DIST;
console.log(indexHtml);


function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })


  console.log(app.isPackaged);
  

    win.loadURL(url.format({
      pathname: path.join(__dirname, '..', 'dist', 'index.html'),
      protocol: 'file',
      slashes: true,
   }));
   
}



let tray = null
app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname,'..' ,'src' , 'assets', 'diamond.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit Quartz', click: quitApp  },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  createWindow();
});


/** functions */


function quitApp(){
  app.quit();
}

ipcMain.on('close-me', (evt, arg) => {
  quitApp();
})

ipcMain.on('hide-me', (evt, arg) => {
  win?.hide();
})

ipcMain.on('minimize-me', (evt, arg) => {
  win?.minimize();
})

ipcMain.on('maximize-me', (evt, arg) => {
  if(win?.isMaximized()){
    win.unmaximize();
  }else{
    win?.maximize();
  }
});
  



app.on('window-all-closed', () => {
  win = null
})