const electron = require('electron')
const {app, BrowserWindow} = electron
__dirname
app.on('ready', () => {
    let win = new BrowserWindow({width:800, height: 600})
    win.loadFile('index.html')
})