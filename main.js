// Modules to control application life and create native browser window
const { app, BrowserWindow,ipcMain,dialog } = require('electron');
const path = require('path');
const { getMusicBaseInfo } = require('./src/Common/Song');
const http = require("http");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// ipcMain.on("LOCAL_ADD_FILE",(e)=>{
//     dialog.showOpenDialog({
//         properties: ['openFile'],
//         filters: [
//         { name: 'Music', extensions: ['mp3'] },
//         { name: 'All Files', extensions: ['*'] }
//     ]
//     }, (files)=>{
//         if(files){
//             let musicBaseInfo = getMusicBaseInfo(files[0]);
//             e.sender.send("LOCAL_SET_FILE",musicBaseInfo);
//         }else{
//             console.log("未选择文件！");
//         }
//     }).catch(err=>{
//             console.log("选择文件发生错误！");
//     })
// });
ipcMain.on("SEARCH_GET_HOT_SONG",(e)=>{
    // http.request({
    //     method: "get",
    //     hostname: "localhost",
    //     port: "8080",
    //     path: "/api/getHotSong",
    //     timeout: 12000,
    // },(res)=>{
    //     console.log(res);
    // })
    // http.get('http://www.baidu.com',function(res){
    //     res.setEncoding('utf8');
    //     // var text = { textContent :""}
    //     res.on('data',function(chunk){
    //         e.sender.send("SEARCH_SET_HOT_SONG",chunk)
    //     });
    // });
    // http.get('http://localhost:8080/api/getHotSong',function(res){
    //     res.setEncoding('utf8');
    //     // var text = { textContent :""}
    //     res.on('data',function(chunk){
    //         e.sender.send("SEARCH_SET_HOT_SONG",chunk)
    //     });
    // });
});
let mainWindow;

function createWindow () {
  // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        frame: false,
        titleBarStyle: 'customButtonsOnHover',
        resizable: false,
    });

  // and load the index.html of the app.
  mainWindow.loadFile(`${path.join(__dirname,'./build/index.html')}`);
  // mainWindow.loadURL("http://localhost:3000");
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
