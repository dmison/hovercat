const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const app = electron.app;
const ipc = electron.ipcMain;

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
  mainWindow = new BrowserWindow( {
    'width': 1000,
    'height': 700,
    'dark-theme': false,
    'icon': __dirname+'/hovercat.png'
  });

  //setup menus
  var template = getMenuTemplate(process.platform);
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  mainWindow.setAutoHideMenuBar(true);
  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when first page finished loading
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.send('send-homedir', app.getPath('home'));
    mainWindow.webContents.send('send-resourcesPath', process.resourcesPath);
    mainWindow.setTitle('Hovercat: untitled');
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

ipc.on('setTitle',function(event, message){
  mainWindow.setTitle(`Hovercat: ${message}`);
});



var sendMenuMsg = function(msg){
  mainWindow.webContents.send('send-menu', msg);
};


var getMenuTemplate = function(platform){

  var OSX_app_menu = {
    label: 'Application',
    submenu: [
      { label: 'About Hovercat', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      { label: 'Configure', accelerator: 'CmdOrCtrl+,', click: function(){ sendMenuMsg('openConfig'); }       },
      { type: 'separator' },
      { label: 'DevTools', accelerator: 'CmdOrCtrl+\\', click: function(){ mainWindow.openDevTools(); }       },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function() { app.quit(); }}
    ]
  };

  var FileMenu = {
    label: 'File',
    submenu: [
    { label: 'New', accelerator: 'CmdOrCtrl+N', click: function(){ sendMenuMsg('newFile'); }       },
    { label: 'Open', accelerator: 'CmdOrCtrl+O', click: function(){ sendMenuMsg('openFile'); }     },
    { label: 'Save', accelerator: 'CmdOrCtrl+S', click: function(){ sendMenuMsg('saveFile'); }     },
    { label: 'Save As', accelerator: 'Shift+CmdOrCtrl+S', click: function(){ sendMenuMsg('saveAsFile'); }     },
    { label: 'Export', accelerator: 'CmdOrCtrl+E', click: function(){ sendMenuMsg('exportFile'); } },
    { type: 'separator' },
    { label: 'Manage Templates', click: function() { sendMenuMsg('openTemplateManager'); }},
    { type: 'separator' },
    { label: 'Send Email', accelerator: 'CmdOrCtrl+T', click: function() { sendMenuMsg('sendEmail'); }}
    ]
  };

  var EditMenu = {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
    ]
  };

  var template = [];

  if(platform === 'darwin'){
    template.push(OSX_app_menu, FileMenu, EditMenu);
  }

  if(platform === 'linux'){
    FileMenu.submenu.push(
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit(); }}
    );
    EditMenu.submenu.push(
      { type: 'separator' },
      { label: 'Configure', accelerator: 'CmdOrCtrl+,', click: function(){ sendMenuMsg('openConfig'); }       },
      { type: 'separator' },
      { label: 'DevTools', accelerator: 'CmdOrCtrl+\\', click: function(){ mainWindow.openDevTools(); }       }
    );
    template.push(FileMenu, EditMenu);
  }

  return template;

};
