// Modules
const {app, Menu, BrowserWindow} = require('electron')
const path = require('node:path')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {
      preload: path.join(__dirname,'preload.js')

    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');

  const mainMenu = Menu.buildFromTemplate(menuList);
  Menu.setApplicationMenu(mainMenu);


  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})



menuList = [
  {
      label: '編集',
      submenu: [
          { label: "元に戻す",
            role: 'undo',},
          { lael: "やり直す",
          role: 'reload',},
      ]
  },
  {
      label: '表示',
      submenu: [
          {
              label: '再読み込み',
              accelerator: 'CmdOrCtrl+R',
              click(item, focusedWindow){
                  if(focusedWindow) focusedWindow.reload()
              },
          },
          {type: 'separator',},
          {
            label: "ズームリセット",
            role: 'resetzoom',},
          {label: "拡大",
          role: 'zoomin',},
          {label: "縮小",
          role: 'zoomout',},
          {type: 'separator',},
          {role: 'togglefullscreen',}
      ]
  }
];

