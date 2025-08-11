import { app, BrowserWindow, ipcMain } from 'electron'
import { registerRoute } from '../lib/electron-router-dom.js'
import { getPreloadPath } from './pathResolver.js'
import { createTray } from './tray.js'
import { promises as fs } from 'fs';
import path from 'path'
import { buildApp, chooseDir, cloneRepository, startService, writeJsonEnv } from './utils.js'

let directory: string | null = null
const userEnvs: IUserEnvs = {
    KEYCLOAK_URL: "https://intraguard.dataunique.com.br/kc/auth",
    KEYCLOAK_CLIENT_ID: "ORG_SUPER_ADM",
    KEYCLOAK_REALM: "intraguard-dev",
    KEYCLOAK_CLIENT_SECRET: "BKGRh4ipuiURxy5lVAB4gWh796zGwTeR",
    API_HTTP_PORT: 4001,
    CENTRAL_API_BASE_URL: "http://intraguard.dataunique.com.br/api/",
    DB_DATABASE: "",
    DB_USER: "",
    DB_PASSWORD: "",
    DB_HOST: "",
    DB_PORT: 1521,
    DB_DIALECT: ""
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

    const finalDirPath = path.join(directory, 'intraguard-service');
    await fs.mkdir(finalDirPath, { recursive: true });
    const repositoryUrl = 'https://github.com/SIQUEIRA-TIAGO/client.git';

    await cloneRepository(finalDirPath, repositoryUrl);
    await writeJsonEnv(finalDirPath, userEnvs)
    await buildApp(finalDirPath)
    await startService(finalDirPath)
    return true
});