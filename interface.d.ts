interface IUserEnvs {
  KEYCLOAK_CLIENT_ID: string,
  DB_DATABASE: string,
  DB_USER: string,
  DB_PASSWORD: string,
  DB_HOST: string,
  DB_PORT: string,
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
