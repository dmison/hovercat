
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({'width': 1000, 'height': 700, 'dark-theme': false, 'icon': __dirname+'/electron.png' });

  if (process.platform == 'darwin'){

    var Menu = require("menu");

    var sendMenuMsg = function(msg){
      mainWindow.webContents.send('send-menu', msg);
    }

    var template = [
      {
        label: "Application",
        submenu: [
            { label: "About Hovercat", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]
      },
      {
        label: "File",
        submenu: [
          { label: "New", accelerator: "CmdOrCtrl+N", click: function(){ sendMenuMsg('newFile'); }       },
          { label: "Open", accelerator: "CmdOrCtrl+O", click: function(){ sendMenuMsg('openFile'); }     },
          { label: "Save", accelerator: "CmdOrCtrl+S", click: function(){ sendMenuMsg('saveFile'); }     },
          { label: "Export", accelerator: "CmdOrCtrl+E", click: function(){ sendMenuMsg('exportFile'); } },
          { type: "separator" },
          { label: "Send Email", accelerator: "CmdOrCtrl+T", click: function() { sendMenuMsg('sendEmail'); }}
        ]
      },
      {
        label: "Edit",
        submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
      }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  }
  mainWindow.openDevTools();

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.webContents.on('did-finish-load', function() {
      mainWindow.webContents.send('send-homedir', app.getPath('home'));
      mainWindow.webContents.send('send-resourcesPath', process.resourcesPath);
    }
  );

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
