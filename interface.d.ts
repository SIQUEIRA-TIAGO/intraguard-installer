interface IUserEnvs {
  KEYCLOAK_URL: string,
  KEYCLOAK_REALM: string,
  API_HTTP_PORT: string,
  CENTRAL_API_URL: string,
  CENTRAL_API_PORT: string,
  APPLICATION_GMAIL: string,
  APPLICATION_GMAIL_APP_PASSWORD: string,
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
