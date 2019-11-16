const electron = require('electron');
const { app, BrowserWindow } = electron;

__dirname

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


function createWindow() {
    console.log(__dirname);
    // Create the browser window.
    let win = new BrowserWindow({
        resizable: false,
        fullscreen: true,
        //frame: false,
        webSecurity: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.

    win.loadFile('../title.html')

    win.webContents.openDevTools()

    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}