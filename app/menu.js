//Electron
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const app_name = app.getName();
const app_version = app.getVersion();
const app_menu = electron.Menu;

var template_win = [{
    label: 'File',
    submenu: [{
        label: 'Hide ' + app_name,
        accelerator: 'Control+H',
        role: 'hide'
    }, {
        label: 'Hide Others',
        accelerator: 'Control+Shift+H',
        role: 'hideothers'
    }, {
        type: 'separator'
    }, {
        label: 'Quit',
        accelerator: 'Control+W',
        role: 'close'
    }]
}, {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'Control+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+Control+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'Control+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'Control+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'Control+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'Control+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [{
        label: 'Back',
        accelerator: 'Backspace',
        click: function(item, focusedWindow) {
            if (focusedWindow && focusedWindow.webContents.canGoBack())
                focusedWindow.webContents.goBack();
            focusedWindow.webContents.reload();
        }
    }, {
        type: 'separator'
    }, {
        label: 'Reload',
        accelerator: 'F5',
        click: function(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.reload();
        }
    }, {
        label: 'Toggle Theme',
        accelerator: 'Control+D',
        click() {
            // Some code goes here.
        }
    }, {
        type: 'separator'
    }, {
        label: 'Toggle Fullscreen',
        accelerator: 'F11',
        role: 'togglefullscreen'
    }, {
        label: 'Toggle Dev Tools',
        accelerator: 'F12',
        click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
    }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'Control+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'Control+W',
        role: 'close'
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'About 4LOOP JIRA',
        click: function() {
            require('electron').shell.openExternal("https://github.com/4LOOPph/jira-client-app/releases/tag/" + app_version)
        }
    }, {
        label: 'View 4LOOP JIRA',
        click: function() {
            require('electron').shell.openExternal("https://4loopph.atlassian.net/")
        }
    }, {
        type: 'separator'
    }, {
        label: 'Changelog',
        click: function() {
            require('electron').shell.openExternal("https://github.com/4LOOPph/jira-client-app/releases/tag/" + app_version)
        }
    }]
}];

var template_osx = [{
    label: 'Application',
    submenu: [{
        label: 'Hide ' + app_name,
        accelerator: 'Command+H',
        role: 'hide'
    }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
    }, {
        type: 'separator'
    }, {
        label: 'Toggle Theme',
        accelerator: 'Cmd+D',
        click() {
            // Some code goes here.
        }
    }, {
        type: 'separator'
    }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
            app.quit();
        }
    }]
}, {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'Cmd+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+Cmd+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'Cmd+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'Cmd+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'Cmd+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'Cmd+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [{
        label: 'Back',
        accelerator: 'Backspace',
        click: function(item, focusedWindow) {
            if (focusedWindow && focusedWindow.webContents.canGoBack())
                focusedWindow.webContents.goBack();
            focusedWindow.webContents.reload();
        }
    }, {
        type: 'separator'
    }, {
        label: 'Reload',
        accelerator: 'F5',
        click: function(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.reload();
        }
    }, {
        label: 'Toggle Theme',
        accelerator: 'Control+D',
        click() {
            // Some code goes here.
        }
    }, {
        type: 'separator'
    }, {
        label: 'Toggle Fullscreen',
        accelerator: 'F11',
        role: 'togglefullscreen'
    }, {
        label: 'Toggle Dev Tools',
        accelerator: 'F12',
        click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
    }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'Cmd+M',
        role: 'minimize'
    }, {
        label: 'Zoom',
        role: 'zoom',
        click() {
             app.zoomToPageWidth = true;
        }
    }, {
        label: 'Close',
        accelerator: 'Cmd+W',
        role: 'close'
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'About 4LOOP JIRA',
        click: function() {
            require('electron').shell.openExternal("https://github.com/4LOOPph/jira-client-app/releases/tag/" + app_version)
        }
    }, {
        label: 'View 4LOOP JIRA',
        click: function() {
            require('electron').shell.openExternal("https://4loopph.atlassian.net/")
        }
    }, {
        type: 'separator'
    }, {
        label: 'Changelog',
        click: function() {
            require('electron').shell.openExternal("https://github.com/4LOOPph/jira-client-app/releases/tag/" + app_version)
        }
    }]
}];

if (process.platform == 'darwin') {
    module.exports = app_menu.buildFromTemplate(template_osx)
} else {
    module.exports = app_menu.buildFromTemplate(template_win)
}