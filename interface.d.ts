interface IUserEnvs {
ACCESS_TOKEN: string
ORG_ID: string
API_HTTP_PORT:number
CENTRAL_API_BASE_URL: string
DB_DATABASE: string
DB_USER: string
DB_PASSWORD: string  
DB_HOST: string
DB_PORT:number
DB_DIALECT: string
}

interface IElectronAPI {
  chooseDir: () => Promise<string | null>,
  cloneRepo: () => Promise<boolean>
  closeApp: () => void
  updateEnv: (envs: Partial<IUserEnvs>) => void
}

interface Window {
  electronAPI: IElectronAPI
}
