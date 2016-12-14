//Electron
const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const browserWindow = electron.BrowserWindow;
const menu = electron.Menu;

//App Info
const app = electron.app;
const app_name = app.getName();
const app_title = app.getName();
const app_version = app.getVersion();
const app_description = 'Electron web app for the JIRA Atlassian.';
const app_config = require('./config');
const app_is_dev = require('electron-is-dev');

// System paths
const path = require('path');
const fs = require('fs');

//Electron DL
require('electron-dl')();

// Main Application Window
let mainWindow

// If the application is quitting
let isQuitting = false;

// Main Window
function createMainWindow() {
    const lastWindowState = app_config.get('lastWindowState');
    const app_view = new electron.BrowserWindow({
        title: app_title,
        x: lastWindowState.x,
        y: lastWindowState.y,
        width: lastWindowState.width,
        height: lastWindowState.height,
        minWidth: 850,
        minHeight: 530,
        resizable: true,
        movable: true,
        fullscreenable: true,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden-inset',
        webPreferences: {
            nodeIntegration: false,
            plugins: true
        }
    });
    app_view.loadURL('https://4loopph.atlassian.net/');

    // When window is closed, hide window
    app_view.on('close', e => {
        if (!isQuitting) {
            e.preventDefault();
            if (process.platform === 'darwin') {
                app.hide();
            } else {
                app.quit();
            }
        }

    });
    return app_view;
}

app.on('ready', () => {
    mainWindow = createMainWindow();
    menu.setApplicationMenu(require('./menu'))

    // if (app_is_dev) { mainWindow.openDevTools() }

    const app_page = mainWindow.webContents;

    app_page.on('dom-ready', () => {

        // Stock style additions
        app_page.insertCSS(fs.readFileSync(path.join(__dirname, 'style/app.css'), 'utf8'));

        // MacOS Logo offset
        if (process.platform == 'darwin') { app_page.insertCSS('.aui-header-inner{ margin-left: 64px;!important; } .aui-header-before {display:none;}'); }

        mainWindow.show();
    });

    //Open external links in browser
    app_page.on('new-window', (e, url) => {
        e.preventDefault();
        electron.shell.openExternal(url);
    });

    //Shortcut to reload the page.
    globalShortcut.register('CmdOrCtrl+R', () => {
        mainWindow.webContents.reload();
    })
    globalShortcut.register('CmdOrCtrl+Left', () => {
        mainWindow.webContents.goBack();
        mainWindow.webContents.reload();
    })

    mainWindow.on('app-command', (e, cmd) => {
        // Navigate the window back when the user hits their mouse back button
        if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
            mainWindow.webContents.goBack()
        }
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    mainWindow.show()
})
app.on('before-quit', () => {
	isQuitting = true;
});