let serverUrl: string | undefined
let adminApiToken: string | undefined

type RuntimeEnv = Partial<{ SERVER_URL: string; ADMIN_API_TOKEN: string }>

export function configureRuntime(env: RuntimeEnv): void {
  if (env.SERVER_URL) serverUrl = env.SERVER_URL
  if (env.ADMIN_API_TOKEN) adminApiToken = env.ADMIN_API_TOKEN
}

export function getServerUrl(): string {
  if (!serverUrl) throw new Error('SERVER_URL is not configured')
  return serverUrl
}

export function getAdminApiToken(): string | undefined {
  return adminApiToken
}


