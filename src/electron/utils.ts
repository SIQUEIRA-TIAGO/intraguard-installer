import { simpleGit } from 'simple-git';
import { dialog } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const git = simpleGit();

export function isDev() {
    return process.env.NODE_ENV === 'development'
}

export async function cloneRepository(targetDirectory: string, repositoryUrl: string): Promise<boolean> {
    try {
        console.log(`Cloning repository to target folder [${targetDirectory}]`)
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
            .map(key => {
                const value = data[key as keyof IUserEnvs]
                if (typeof value === 'string')
                    return `${key}="${data[key as keyof IUserEnvs]}"`
                if (typeof value === 'number')
                    return `${key}=${data[key as keyof IUserEnvs]}`
            })
            .join('\n');
            
        console.log('Writing enviroments variables: ', envData)
        const filePath = path.join(dirPath, `.env`)
        await fs.writeFile(filePath, envData, 'utf8');
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function buildApp(targetDirectory: string) {
    console.log(`Installing packages`)
    const { stdout: installStdout, stderr: installStderr } = await execPromise(
        'npm install',
        { cwd: targetDirectory }
    );
    if (installStderr) throw new Error(`[Install error] ${installStderr}`)
    console.log('Install logs', installStdout)

    console.log(`Building client`)
    const { stdout: buildStdOut, stderr: buildStderr } = await execPromise(
        'npm run build',
        { cwd: targetDirectory }
    );
    if (buildStderr) throw new Error(`[Build error] ${buildStderr}`)
    console.log('Build logs', buildStdOut)
}

export async function startService(targetDirectory: string) {
    console.log(`Starting as service`)
    const { stdout, stderr } = await execPromise(
        'npm start-service',
        { cwd: targetDirectory }
    );

    if (stderr) throw new Error(`[Start service error] ${stderr}`)
    console.log('Build logs', stdout)
}