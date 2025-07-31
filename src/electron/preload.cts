const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronAPI', {
    chooseDir: () => electron.ipcRenderer.invoke('choose-directory'),
    cloneRepo: () => electron.ipcRenderer.invoke('install'),
    closeApp: () => electron.ipcRenderer.send('close-app'),
    updateEnv: (envs) => electron.ipcRenderer.send('update-env', envs),
} satisfies Window['electronAPI']);