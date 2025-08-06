import { app, BrowserWindow, ipcMain } from 'electron'
import { registerRoute } from '../lib/electron-router-dom.js'
import { getPreloadPath } from './pathResolver.js'
import { createTray } from './tray.js'
import { promises as fs } from 'fs';
import path from 'path'
import { chooseDir, cloneRepository, writeJsonEnv } from './utils.js'

let directory: string | null = null
const userEnvs: IUserEnvs = {
    APPLICATION_GMAIL: '',
    APPLICATION_GMAIL_APP_PASSWORD: '',
    API_HTTP_PORT: '',
    CENTRAL_API_URL: '',
    CENTRAL_API_PORT: '',
    KEYCLOAK_URL: '',
    KEYCLOAK_REALM: '',
    KEYCLOAK_CLIENT_ID: '',
    DB_USER: '',
    DB_HOST: '',
    DB_PORT: '',
    DB_DIALECT: '',
    DB_PASSWORD: '',
    DB_DATABASE: '',
}

function createWindow() {
    const window = new BrowserWindow({
        height: 525,
        width: 600,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            preload: getPreloadPath()
        }
    })

    registerRoute({
        id: 'main',
        browserWindow: window,
        devServerUrl: 'http://localhost:5123',
        htmlFile: path.join(app.getAppPath(), 'dist-react/index.html'),
    })

    createTray(window)
}

app.on('ready', createWindow)

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here

ipcMain.on('close-app', () => app.quit());

ipcMain.on('update-env', (_, envs: Partial<IUserEnvs>) => {
    Object.assign(userEnvs, envs);
});

ipcMain.handle('choose-directory', async (): Promise<string | null> => {
    const targetDirectory = await chooseDir()
    directory = targetDirectory
    return directory
});

ipcMain.handle('install', async (): Promise<boolean> => {
    if (!directory)
        throw new Error('Missing target directory')

    const finalDirPath = path.join(directory, 'intraguard');
    await fs.mkdir(finalDirPath, { recursive: true });
    const repositoryUrl = 'https://github.com/SIQUEIRA-TIAGO/dog-finder.git';

    await cloneRepository(finalDirPath, repositoryUrl);
    await writeJsonEnv(finalDirPath, userEnvs)
    return true
});