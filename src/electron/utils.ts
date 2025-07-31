import { simpleGit } from 'simple-git';
import { dialog } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';

const git = simpleGit();

export function isDev() {
    return process.env.NODE_ENV === 'development'
}

export async function cloneRepository(targetDirectory: string, repositoryUrl: string): Promise<boolean> {
    try {
        await git.clone(repositoryUrl, targetDirectory);
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function chooseDir(): Promise<string | null> {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });

    const directoryPath = result.filePaths[0]
    return directoryPath || null;
}

export async function writeJsonEnv(dirPath: string, data: IUserEnvs): Promise<boolean> {
    try {
        const envData = Object.keys(data)
            .map(key => `${key}=${data[key as keyof IUserEnvs]}`)
            .join('\n');

        const filePath = path.join(dirPath, `.env`)
        await fs.writeFile(filePath, envData, 'utf8');
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}